
import { ActionReducerMap } from '@ngrx/store';
import { authReducer } from './auth/auth.reducer';  // Import authReducer
import { UserState, userReducer } from './user/user.reducer';  // Import userReducer
import {AuthState} from '../models/auth';

// Define the global application state
export interface AppState {
  auth: AuthState;  // Include auth feature state
  users: UserState;  // Include users feature state
}

// Combine feature reducers into one global appReducer
export const appReducer: ActionReducerMap<AppState> = {
  auth: authReducer,  // Assign authReducer to the 'auth' state
  users: userReducer  // Assign userReducer to the 'users' state
};
