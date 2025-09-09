import { Router, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthenticationService } from './services/auth.service';
import { inject } from '@angular/core';
import { AuthLayoutComponent } from './auth-layout/auth-layout.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/overview',
    pathMatch: 'full',
  },
  {
    path: '',
    component: LayoutComponent,
    loadChildren: () =>
      import('./views/views.route').then((mod) => mod.VIEWS_ROUTES),
    canActivate: [
      (url: any) => {
        const router = inject(Router);
        const authService = inject(AuthenticationService);
        if (!authService.session) {
          return router.createUrlTree(['/auth/login'], {
            queryParams: { returnUrl: url._routerState.url },
          });
        }
        return true;
      },
    ],
  },
  {
    path: '',
    component: AuthLayoutComponent,
    loadChildren: () =>
      import('./views/auth/auth.route').then((mod) => mod.AUTH_ROUTES),
  },
];
