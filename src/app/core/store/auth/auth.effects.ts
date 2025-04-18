import { inject, Injectable } from '@angular/core';
import { Actions, ofType, createEffect } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { UserService } from '../../services/user.service';

@Injectable()
export class AuthEffects {
  constructor(private userService: UserService) {}
  private actions$ = inject(Actions);

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((action) =>
        this.userService.login(action.user).pipe(
          map((data) => {
            const authState = data;
            console.log('loginSuccess', authState);
            return loginSuccess(authState);
          }),
          catchError((errors) => {
            const error =  errors.message
            return of(loginFailure({ error}));
          })
        )
      )
    )
  );
  
}
