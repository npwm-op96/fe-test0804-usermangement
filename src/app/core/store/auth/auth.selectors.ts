import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from '../../models/auth';

// Select the auth state from the store
export const selectAuthState = createFeatureSelector<AuthState>('auth');

// Selector for user data
export const selectUser = createSelector(
  selectAuthState,
  (state: AuthState) => state
);

// Selector for login error message
export const selectError = createSelector(
  selectAuthState,
  (state: AuthState) => state.error
);
