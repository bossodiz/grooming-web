import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { ReserveComponent } from './reserve/reserve.component';
import { ServiceComponent } from './service/service.component';

export const GROOMIMG_ROUTES: Route[] = [
  {
    path: 'reserve',
    component: ReserveComponent,
    data: { title: 'Reserve' },
  },
  {
    path: 'service',
    component: ServiceComponent,
    data: { title: 'Customers' },
  },
];
