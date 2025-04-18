import { createReducer, on } from '@ngrx/store';
import * as UserActions from './user.actions';
import { UserInfo } from '../../models/UserInfo';

// Define the initial state
export interface UserState {
  users: UserInfo[];
  totalElements: number,  // Initial value is 0
  error: string | null;
  loading: boolean;
}

export const initialState: UserState = {
  users: [],
  totalElements: 0,  // Initial value is 0

  error: null,
  loading: false
};

// Reducer function to handle actions
export const userReducer = createReducer(
  initialState,
  on(UserActions.loadUsers, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.loadUsersSuccess, (state, { users ,totalElements}) => ({
    ...state,
    users: users,
    totalElements: totalElements,  // Set total elements for pagination

    loading: false
  })),
  on(UserActions.loadUsersFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false
  })),
  on(UserActions.createUser, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.createUserSuccess, (state, { user }) => ({
    ...state,
    users: [...state.users, user],
    loading: false
  })),
  on(UserActions.createUserFailure, (state, { error }) => ({
    ...state,
    // error: error,
    loading: false
  })),
  on(UserActions.editUser, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.editUserSuccess, (state, { user }) => ({
    ...state,
    users: state.users.map((u) => (u.id === user.id ? user : u)),
    loading: false
  })),
  on(UserActions.editUserFailure, (state, { error }) => ({
    ...state,
    // error: error,
    loading: false
  })),
  on(UserActions.deleteUser, (state) => ({
    ...state,
    loading: true
  })),
  on(UserActions.deleteUserSuccess, (state, { id }) => ({
    ...state,
    users: state.users.filter((user) => user.id !== id),
    loading: false
  })),
  on(UserActions.deleteUserFailure, (state, { error }) => ({
    ...state,
    error: error,
    loading: false
  }))
);
