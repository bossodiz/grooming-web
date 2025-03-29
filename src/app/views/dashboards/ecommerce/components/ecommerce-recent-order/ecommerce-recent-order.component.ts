import { Component } from '@angular/core'
import { recentOrder } from '../../data'
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap'

@Component({
    selector: 'app-ecommerce-recent-order',
    imports: [NgbTooltipModule],
    templateUrl: './ecommerce-recent-order.component.html',
    styles: ``
})
export class EcommerceRecentOrderComponent {
  recentOrder = recentOrder
}
