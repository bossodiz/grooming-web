import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import {
  NgbCarouselConfig,
  NgbCarouselModule,
} from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-carousel',
    imports: [BreadcrumbComponent, NgbCarouselModule],
    templateUrl: './carousel.component.html',
    styles: ``
})
export class CarouselComponent {
  constructor(config: NgbCarouselConfig) {
    config.showNavigationArrows = true
    config.showNavigationIndicators = true
  }
}
