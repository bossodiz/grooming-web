import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { StatsComponent } from "../analytics/components/stats/stats.component";
import { CrmStatComponent } from "./components/crm-stat/crm-stat.component";
import { SalesOverviewComponent } from "./components/sales-overview/sales-overview.component";
import { SalesPipelineComponent } from "./components/sales-pipeline/sales-pipeline.component";
import { TaskListComponent } from "./components/task-list/task-list.component";
import { LeadOverviewComponent } from "./components/lead-overview/lead-overview.component";
import { LatestTransactionComponent } from "./components/latest-transaction/latest-transaction.component";
import { RecentPerformanceComponent } from "./components/recent-performance/recent-performance.component";
import { LeadReportComponent } from "./components/lead-report/lead-report.component";

@Component({
    selector: 'app-index',
    imports: [
    BreadcrumbComponent,
    CrmStatComponent,
    SalesOverviewComponent,
    SalesPipelineComponent,
    TaskListComponent,
    LeadOverviewComponent,
    LatestTransactionComponent,
    RecentPerformanceComponent,
    LeadReportComponent
],
    templateUrl: './index.component.html',
    styles: ``
})
export class IndexComponent {}
