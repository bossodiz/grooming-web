import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { FormComponent } from './form/form.component';

export const PAYMENT_ROUTES: Route[] = [
  {
    path: 'Form',
    component: FormComponent,
    data: { title: 'Payment-Form' },
  },
];
