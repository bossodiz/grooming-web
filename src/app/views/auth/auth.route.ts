import type { Route } from '@angular/router';
import { SignInComponent } from './sign-in/sign-in.component';
import { LogoutComponent } from './logout/logout.component';

export const AUTH_ROUTES: Route[] = [
  {
    path: 'auth/login',
    component: SignInComponent,
    data: { title: 'Login' },
  },
  {
    path: 'auth/logout',
    component: LogoutComponent,
    data: { title: 'Logout' },
  },
];
