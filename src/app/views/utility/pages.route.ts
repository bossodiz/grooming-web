import type { Route } from '@angular/router'
import { StarterComponent } from './starter/starter.component'
import { FaqsComponent } from './faqs/faqs.component'
import { TimelineComponent } from './timeline/timeline.component'
import { ProfileComponent } from './profile/profile.component'
import { PricingComponent } from './pricing/pricing.component'
import { GalleryComponent } from './gallery/gallery.component'
import { InvoiceComponent } from './invoice/invoice.component'

export const PAGES_ROUTES: Route[] = [
  {
    path: 'starter',
    component: StarterComponent,
    data: { title: 'Starter Page' },
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: { title: 'Profile' },
  },
  {
    path: 'pricing',
    component: PricingComponent,
    data: { title: 'Pricing' },
  },
  {
    path: 'gallery',
    component: GalleryComponent,
    data: { title: 'Gallery' },
  },
  {
    path: 'invoice',
    component: InvoiceComponent,
    data: { title: 'Invoice' },
  },
  {
    path: 'faqs',
    component: FaqsComponent,
    data: { title: 'FAQ' },
  },
  {
    path: 'timeline',
    component: TimelineComponent,
    data: { title: 'Timeline' },
  },
]
