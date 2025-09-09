import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ListComponent } from './list/list.component';
import { DetailComponent } from './detail/detail.component';

export const PROMOTIONS_ROUTES: Route[] = [
  {
    path: 'list',
    component: ListComponent,
    data: { title: 'Promotion' },
  },
  {
    path: 'detail/:id',
    component: DetailComponent,
    data: { title: 'Promotion' },
  },
];
