import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

// Feature selector to access user state
export const selectUserState = createFeatureSelector<UserState>('users');

// Selector to get all users
export const selectAllUsers = createSelector(
  selectUserState,
  (state: UserState) => state.users
);

// Selector to get error message
export const selectError = createSelector(
  selectUserState,
  (state: UserState) => state.error
);

// Selector to get loading status
export const selectLoading = createSelector(
  selectUserState,
  (state: UserState) => state.loading
);

export const selectTotalElements = createSelector(
  selectUserState,
  (state: UserState) => state.totalElements
);
