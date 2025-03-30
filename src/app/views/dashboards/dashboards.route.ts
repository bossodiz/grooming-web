import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { OverviewComponent } from './overview/overview.component';

export const DASHBOARD_ROUTES: Route[] = [
  {
    path: '',
    redirectTo: 'overview',
    pathMatch: 'full',
  },
  {
    path: 'overview',
    component: OverviewComponent,
    data: { title: 'Overview' },
  },
];
