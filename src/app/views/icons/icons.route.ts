import type { Route } from '@angular/router'
import { MaterialComponent } from './material/material.component'
import { FeatherComponent } from './feather/feather.component'

export const ICONS_ROUTES: Route[] = [
  {
    path: 'feather',
    component: FeatherComponent,
    data: { title: 'Feather Icons' },
  },
  {
    path: 'mdi',
    component: MaterialComponent,
    data: { title: 'Material Icons' },
  },
]
