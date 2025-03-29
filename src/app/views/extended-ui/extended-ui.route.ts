import type { Route } from '@angular/router'
import { CarouselComponent } from './carousel/carousel.component'
import { NotificationComponent } from './notification/notification.component'
import { OffcanvasComponent } from './offcanvas/offcanvas.component'
import { RangeSliderComponent } from './range-slider/range-slider.component'

export const EXTENDED_UI_ROUTES: Route[] = [
  {
    path: 'carousel',
    component: CarouselComponent,
    data: { title: 'Carousel' },
  },
  {
    path: 'notifications',
    component: NotificationComponent,
    data: { title: 'Notifications' },
  },
  {
    path: 'offcanvas',
    component: OffcanvasComponent,
    data: { title: 'Offcanvas' },
  },
  {
    path: 'range-slider',
    component: RangeSliderComponent,
    data: { title: 'Range Slider' },
  },
]
