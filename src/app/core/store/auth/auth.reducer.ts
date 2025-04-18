// auth.reducer.ts
import { createReducer, on } from '@ngrx/store';
import { login, loginSuccess, loginFailure } from './auth.actions';
import { User } from '../../models/user';
import { AuthState } from '../../models/auth';


export const initialAuthState: AuthState = {
  token: null,
  user: null,
  error: null
};

export const authReducer = createReducer(
  initialAuthState,

  // Login เริ่มต้น - reset error
  on(login, (state) => ({
    ...state,
    error: null
  })),

  // Login สำเร็จ - ตั้งค่า token และ user ใหม่ พร้อมเคลียร์ error
  on(loginSuccess, (state, { authState }) => ({
    ...state,
    token: authState.token,
    user: authState.user,
    error: null
  })),

  // Login ล้มเหลว - ตั้งค่า error
  on(loginFailure, (state, { error }) => ({
    ...state,
    error
  }))
);
