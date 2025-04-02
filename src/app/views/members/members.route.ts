import type { Route } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { CustomersComponent } from './customers/customers.component';
import { PetsComponent } from './pets/pets.component';
import { CustomerDetailComponent } from './customers/customer-detail/customer-detail.component';

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
    path: 'customers/:id',
    component: CustomerDetailComponent,
    data: { title: 'Customer Detail' },
  },
  {
    path: 'pets',
    component: PetsComponent,
    data: { title: 'Pets' },
  },
];
