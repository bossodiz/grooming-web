import type { Route } from '@angular/router'
import { Error429Component } from './error429/error429.component'
import { Error503Component } from './error503/error503.component'
import { Error404Component } from './error404/error404.component'
import { Error500Component } from './error500/error500.component'
import { OfflineComponent } from './offline/offline.component'
import { MaintainanceComponent } from '@views/other-pages/maintainance/maintainance.component'
import { ComingSoonComponent } from '@views/other-pages/coming-soon/coming-soon.component'

export const ERROR_PAGES_ROUTES: Route[] = [
  {
    path: 'error-404',
    component: Error404Component,
    data: { title: 'Error 401' },
  },
  {
    path: 'error-429',
    component: Error429Component,
    data: { title: 'Error 400' },
  },
  {
    path: 'error-500',
    component: Error500Component,
    data: { title: 'Error 403' },
  },
  {
    path: 'error-503',
    component: Error503Component,
    data: { title: 'Error 404' },
  },
  {
    path: 'offline-page',
    component: OfflineComponent,
    data: { title: 'Offline' },
  },

  {
    path: 'maintenance',
    component: MaintainanceComponent,
    data: { title: 'Maintenance' },
  },
  {
    path: 'coming-soon',
    component: ComingSoonComponent,
    data: { title: 'Coming Soon' },
  },
]
