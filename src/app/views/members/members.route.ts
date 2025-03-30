import type { Route } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { RegisterComponent } from './register/register.component';
import { CustomersComponent } from './customers/customers.component';
import { PetsComponent } from './pets/pets.component';

export const MEMBERS_ROUTES: Route[] = [
  {
    path: 'register',
    component: RegisterComponent,
    data: { title: 'Register' },
  },
  {
    path: 'customers',
    component: CustomersComponent,
    data: { title: 'Customers' },
  },
  {
    path: 'pets',
    component: PetsComponent,
    data: { title: 'Pets' },
  },
];
