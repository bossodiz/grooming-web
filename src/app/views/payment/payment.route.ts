import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { PaymentComponent } from './payment.component';

export const PAYMENT_ROUTES: Route[] = [
  {
    path: '',
    component: PaymentComponent,
    data: { title: 'Payment' },
  },
];
