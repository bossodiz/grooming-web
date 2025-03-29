import type { Route } from '@angular/router'
import { IndexComponent } from './dashboards/index/index.component'
import { AnalyticsComponent } from './dashboards/analytics/analytics.component'
import { EcommerceComponent } from './dashboards/ecommerce/ecommerce.component'
import { WidgetComponent } from './widget/widget.component'
import { Title } from '@angular/platform-browser'
import { ProjectsComponent } from './dashboards/projects/projects.component'
import { HrmComponent } from './dashboards/hrm/hrm.component'
import { JobsComponent } from './dashboards/jobs/jobs.component'
// import { DashboardComponent } from './dashboard/dashboard.component'

export const VIEWS_ROUTES: Route[] = [
  {
    path: 'ui',
    loadChildren: () =>
      import('./ui/ui-pages.route').then((mod) => mod.UI_PAGES_ROUTES),
  },
  {
    path: 'extended',
    loadChildren: () =>
      import('./extended-ui/extended-ui.route').then(
        (mod) => mod.EXTENDED_UI_ROUTES
      ),
  },
  {
    path: 'icons',
    loadChildren: () =>
      import('./icons/icons.route').then((mod) => mod.ICONS_ROUTES),
  },
  {
    path: 'charts',
    loadChildren: () =>
      import('./apex-charts/charts.route').then((mod) => mod.CHARTS_ROUTES),
  },
  {
    path: 'forms',
    loadChildren: () =>
      import('./forms/form.route').then((mod) => mod.FORMS_ROUTES),
  },
  {
    path: 'tables',
    loadChildren: () =>
      import('./tables/tables.route').then((mod) => mod.TABLES_ROUTES),
  },
  {
    path: 'maps',
    loadChildren: () =>
      import('./maps/maps.route').then((mod) => mod.MAP_ROUTES),
  },
  {
    path: 'ui',
    loadChildren: () =>
      import('./ui/ui-pages.route').then((mod) => mod.UI_PAGES_ROUTES),
  },
  {
    path: 'pages',
    loadChildren: () =>
      import('./utility/pages.route').then((mod) => mod.PAGES_ROUTES),
  },
  {
    path: 'apps',
    loadChildren: () =>
      import('./apps/apps.route').then((mod) => mod.APPS_ROUTES),
  },
  {
    path: 'index',
    component: IndexComponent,
    data: { title: 'Index' },
  },
  {
    path: 'analytics',
    component: AnalyticsComponent,
    data: { title: 'Analytics' },
  },
  {
    path: 'ecommerce',
    component: EcommerceComponent,
    data: { title: 'Ecommerce' },
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    data: { title: 'Project' },
  },
  {
    path: 'hrm',
    component: HrmComponent,
    data: { title: 'HRM' },
  },
  {
    path: 'jobs',
    component: JobsComponent,
    data: { title: 'Jobs' },
  },

  {
    path: 'widgets',
    component: WidgetComponent,
    data: { title: 'Widget' },
  },
]
