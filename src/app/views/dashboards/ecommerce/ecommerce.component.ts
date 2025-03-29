import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { EcommerceRecentOrderComponent } from './components/ecommerce-recent-order/ecommerce-recent-order.component'
import { EcommerceStockComponent } from './components/ecommerce-stock/ecommerce-stock.component'
import { EcommerceStatComponent } from './components/ecommerce-stat/ecommerce-stat.component'
import { EcommerceSalesReportComponent } from './components/ecommerce-sales-report/ecommerce-sales-report.component'
import { EcommerceSalesByCountryComponent } from './components/ecommerce-sales-by-country/ecommerce-sales-by-country.component'
import { EcommerceSellingComponent } from './components/ecommerce-selling/ecommerce-selling.component'
import { EcommerceCustomerRateComponent } from './components/ecommerce-customer-rate/ecommerce-customer-rate.component'
import { EcommerceCustomerReviewComponent } from './components/ecommerce-customer-review/ecommerce-customer-review.component'
import { EcommerceOrderReviewComponent } from './components/ecommerce-order-review/ecommerce-order-review.component'

@Component({
    selector: 'app-ecommerce',
    imports: [
        BreadcrumbComponent,
        EcommerceRecentOrderComponent,
        EcommerceStockComponent,
        EcommerceStatComponent,
        EcommerceSalesReportComponent,
        EcommerceSalesByCountryComponent,
        EcommerceSellingComponent,
        EcommerceCustomerRateComponent,
        EcommerceCustomerReviewComponent,
        EcommerceOrderReviewComponent,
    ],
    templateUrl: './ecommerce.component.html',
    styles: ``
})
export class EcommerceComponent {}
