import type { Route } from '@angular/router'
import { RegisterComponent } from './register/register.component'
import { LogoutComponent } from './logout/logout.component'
import { SignInComponent } from './sign-in/sign-in.component'

export const AUTH_ROUTES: Route[] = [
  {
    path: 'auth/login',
    component: SignInComponent,
    data: { title: 'Login' },
  },
  {
    path: 'auth/register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'auth/logout',
    component: LogoutComponent,
    data: { title: 'Logout' },
  },
]
