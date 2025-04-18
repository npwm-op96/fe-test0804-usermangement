import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { mergeMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { UserService } from '../../services/user.service';
import * as UserActions from './user.actions';
import { UserInfo } from '../../models/UserInfo';
import { ApiResponse } from '../../models/apiResponse';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class UserEffects {
  constructor(
    private userService: UserService,
    private store: Store,
    private snackBar: MatSnackBar  // Inject MatSnackBar

  ) { }
  private actions$ = inject(Actions);

  // Load users effect
  loadUsers$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.loadUsers),
      mergeMap((action) =>
        this.userService.getUsers(action.page, action.size).pipe(
          map(((response) => {
            console.log('response getUsers', response)
            const users: UserInfo[] = response?.users
            const totalElements: number = Number(response.totalElements)
            console.log('response getUsers', users)
            console.log('response totalElements', totalElements)

            return UserActions.loadUsersSuccess({
              users: users,
              totalElements: totalElements
            });
          }),
            catchError((error) => of(UserActions.loadUsersFailure({ error: error.message })))
          )
        )
      )
    )
  );

  // Create User Effect
  createUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.createUser),
      mergeMap((action) =>
        this.userService.createUser(action.user).pipe(
          map((user) => {
            this.snackBar.open('User created successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['success-snackbar'],  // Custom class for success
            });
            return UserActions.createUserSuccess({ user });
          }),
          catchError((error) => {
            this.snackBar.open(`Error: ${error.message}`, 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar'],  // Custom class for error
            });
            return of(UserActions.createUserFailure({ error: error.message }));
          })
        )
      )
    )
  );

  // Edit User Effect
  editUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.editUser),
      mergeMap((action) =>
        this.userService.updateUser(action.user).pipe(
          map((user) => {
            this.snackBar.open('User updated successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['success-snackbar'],  // Custom class for success
            });
            return UserActions.editUserSuccess({ user });
          }),
          catchError((error) => {
            this.snackBar.open(`Error: ${error.message}`, 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar'],  // Custom class for error
            });
            return of(UserActions.editUserFailure({ error: error.message }));
          })
        )
      )
    )
  );

  // Delete User Effect
  deleteUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(UserActions.deleteUser),
      mergeMap((action) =>
        this.userService.deleteUser(action.id).pipe(
          map(() => {
            this.snackBar.open('User deleted successfully!', 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['success-snackbar'],  // Custom class for success
            });
            return UserActions.deleteUserSuccess({ id: action.id });
          }),
          catchError((error) => {
            this.snackBar.open(`Error: ${error.message}`, 'Close', {
              duration: 3000,
              verticalPosition: 'top',
              horizontalPosition: 'center',
              panelClass: ['error-snackbar'],  // Custom class for error
            });
            
            return of(UserActions.deleteUserFailure({ error: error.message }));
          })
        )
      )
    )
  );
}
