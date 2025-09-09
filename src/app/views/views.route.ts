import { PROMOTIONS_ROUTES } from './promotion/promotion.route';
import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';

export const VIEWS_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboards/dashboards.route').then(
        (mod) => mod.DASHBOARD_ROUTES,
      ),
  },
  {
    path: 'member',
    loadChildren: () =>
      import('./members/members.route').then((mod) => mod.MEMBERS_ROUTES),
  },
  {
    path: 'grooming',
    loadChildren: () =>
      import('./grooming/grooming.route').then((mod) => mod.GROOMIMG_ROUTES),
  },
  {
    path: 'product',
    loadChildren: () =>
      import('./products/products.route').then((mod) => mod.PRODUCT_ROUTES),
  },
  {
    path: 'promotion',
    loadChildren: () =>
      import('./promotion/promotion.route').then(
        (mod) => mod.PROMOTIONS_ROUTES,
      ),
  },
  {
    path: 'payment',
    loadChildren: () =>
      import('./payment/payment.route').then((mod) => mod.PAYMENT_ROUTES),
  },
];
