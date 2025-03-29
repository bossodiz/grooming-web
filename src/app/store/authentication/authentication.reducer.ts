import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginFailure,
  loginSuccess,
  logout,
} from './authentication.actions';
import type { UserProfile } from './auth.model';

export type AuthenticationState = {
  isLoggedIn: boolean;
  user: UserProfile | null;
  token: string | null;
  refreshToken: string | null;
  error: any | null;
};

const initialState: AuthenticationState = {
  isLoggedIn: false,
  user: null,
  error: null,
  token: null,
  refreshToken: null,
};

export const authenticationReducer = createReducer(
  initialState,
  on(login, (state) => ({ ...state, error: null })),
  on(loginSuccess, (state, { user }) => ({
    ...state,
    isLoggedIn: true,
    user,
    error: null,
  })),
  on(loginFailure, (state, { error }) => ({ ...state, error })),

  on(logout, (state) => ({ ...state, user: null })),
);
