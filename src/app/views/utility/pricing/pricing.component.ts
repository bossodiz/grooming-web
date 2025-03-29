import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { pricingPlan } from './data'
import { CommonModule } from '@angular/common'

@Component({
    selector: 'app-pricing',
    imports: [BreadcrumbComponent, CommonModule],
    templateUrl: './pricing.component.html',
    styles: ``
})
export class PricingComponent {
  pricingPlan = pricingPlan
}
