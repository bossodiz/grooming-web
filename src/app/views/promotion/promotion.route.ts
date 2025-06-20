import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ListComponent } from './list/list.component';

export const PROMOTIONS_ROUTES: Route[] = [
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'List' },
  },
];
