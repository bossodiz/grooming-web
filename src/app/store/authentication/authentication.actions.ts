import { createAction, props } from '@ngrx/store';
import { UserProfile } from './auth.model';

// login action
export const login = createAction(
  '[Authentication] Login',
  props<{ username: string; password: string }>(),
);
export const loginSuccess = createAction(
  '[Authentication] Login Success',
  props<{ user: UserProfile }>(),
);
export const loginFailure = createAction(
  '[Authentication] Login Failure',
  props<{ error: string }>(),
);

// logout action
export const logout = createAction('[Authentication] Logout');

export const logoutSuccess = createAction('[Auth] Logout Success');
