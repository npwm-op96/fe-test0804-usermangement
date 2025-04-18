import { createAction, props } from '@ngrx/store';
import { UserInfo } from '../../models/UserInfo';

// Load Users
export const loadUsers = createAction(
  '[User] Load Users',
  props<{ page?: number; size?: number }>()  
);

// Load Users Success
export const loadUsersSuccess = createAction(
  '[User] Load Users Success',
  props<{ users: UserInfo[] ,totalElements: number }>()
);

// Load Users Failure
export const loadUsersFailure = createAction(
  '[User] Load Users Failure',
  props<{ error: string }>()
);

// Create User
export const createUser = createAction(
  '[User] Create User',
  props<{ user: UserInfo }>()
);

// Create User Success
export const createUserSuccess = createAction(
  '[User] Create User Success',
  props<{ user: UserInfo }>()
);

// Create User Failure
export const createUserFailure = createAction(
  '[User] Create User Failure',
  props<{ error: UserInfo }>()
);

// Edit User
export const editUser = createAction(
  '[User] Edit User',
  props<{ user: UserInfo }>()
);

// Edit User Success
export const editUserSuccess = createAction(
  '[User] Edit User Success',
  props<{ user: UserInfo }>()
);

// Edit User Failure
export const editUserFailure = createAction(
  '[User] Edit User Failure',
  props<{ error: UserInfo }>()
);

// Delete User
export const deleteUser = createAction(
  '[User] Delete User',
  props<{ id: string }>()
);

// Delete User Success
export const deleteUserSuccess = createAction(
  '[User] Delete User Success',
  props<{ id: string }>()
);

// Delete User Failure
export const deleteUserFailure = createAction(
  '[User] Delete User Failure',
  props<{ error: string }>()
);
