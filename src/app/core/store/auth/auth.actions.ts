// auth.actions.ts
import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user';
// import { AuthState } from './auth.reducer';
import {AuthState} from '../../models/auth';
import { ApiResponse } from '../../models/apiResponse';

export const login = createAction(
  '[Auth] Login',
  props<{ user: User }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ authState: AuthState }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: any }>()
);
