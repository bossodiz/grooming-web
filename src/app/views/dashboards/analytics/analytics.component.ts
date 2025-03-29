import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { TopPerformComponent } from './components/top-perform/top-perform.component'
import { TopLeadComponent } from './components/top-lead/top-lead.component'
import { CompaignSourceComponent } from './components/compaign-source/compaign-source.component'
import { TopSessionComponent } from './components/top-session/top-session.component'
import { VisitDeviceComponent } from './components/visit-device/visit-device.component'
import { SalesCountriesComponent } from './components/sales-countries/sales-countries.component'
import { TrafficComponent } from './components/traffic/traffic.component'
import { EarningReportComponent } from './components/earning-report/earning-report.component'
import { StatsComponent } from './components/stats/stats.component'

@Component({
    selector: 'app-analytics',
    imports: [
        BreadcrumbComponent,
        TopPerformComponent,
        TopLeadComponent,
        CompaignSourceComponent,
        TopSessionComponent,
        VisitDeviceComponent,
        SalesCountriesComponent,
        TrafficComponent,
        EarningReportComponent,
        StatsComponent,
    ],
    templateUrl: './analytics.component.html',
    styles: ``
})
export class AnalyticsComponent {}
