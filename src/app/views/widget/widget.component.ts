import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../components/breadcrumb/breadcrumb.component'
import { WidgetBoardingComponent } from './components/widget-boarding/widget-boarding.component'
import { WidgetMoneyFlowComponent } from './components/widget-money-flow/widget-money-flow.component'
import { WidgetLatestTransactionComponent } from './components/widget-latest-transaction/widget-latest-transaction.component'
import { WidgetPerformanceComponent } from './components/widget-performance/widget-performance.component'
import { WidgetEarningComponent } from './components/widget-earning/widget-earning.component'
import { WidgetSalesRegionComponent } from './components/widget-sales-region/widget-sales-region.component'
import { WidgetUpcomingEventComponent } from './components/widget-upcoming-event/widget-upcoming-event.component'
import { WidgetRevenueComponent } from './components/widget-revenue/widget-revenue.component'
import { WidgetVisitorComponent } from './components/widget-visitor/widget-visitor.component'
import { WidgetAnalyticsComponent } from './components/widget-analytics/widget-analytics.component'
import { WidgetTrafficComponent } from './components/widget-traffic/widget-traffic.component'
import { WidgetTaskComponent } from './components/widget-task/widget-task.component'
import { RecentMessageComponent } from "./components/recent-message/recent-message.component";
import { WidgetStatComponent } from "./components/widget-stat/widget-stat.component";
import { NextUpcomingEventComponent } from "./components/next-upcoming-event/next-upcoming-event.component";
import { NextPaymentComponent } from "./components/next-payment/next-payment.component";
import { BrowserStatusComponent } from "./components/browser-status/browser-status.component";
import { TrafficSourceComponent } from "./components/traffic-source/traffic-source.component";

@Component({
    selector: 'app-widget',
    imports: [
    BreadcrumbComponent,
    WidgetBoardingComponent,
    WidgetMoneyFlowComponent,
    WidgetLatestTransactionComponent,
    WidgetPerformanceComponent,
    WidgetEarningComponent,
    WidgetSalesRegionComponent,
    WidgetUpcomingEventComponent,
    WidgetRevenueComponent,
    WidgetVisitorComponent,
    WidgetAnalyticsComponent,
    WidgetTrafficComponent,
    WidgetTaskComponent,
    RecentMessageComponent,
    WidgetStatComponent,
    NextUpcomingEventComponent,
    NextPaymentComponent,
    BrowserStatusComponent,
    TrafficSourceComponent
],
    templateUrl: './widget.component.html',
    styles: ``
})
export class WidgetComponent {}
