import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { HrmStatComponent } from "./components/hrm-stat/hrm-stat.component";
import { HrmJobSummaryComponent } from "./components/hrm-job-summary/hrm-job-summary.component";
import { HrmIncomeStatComponent } from "./components/hrm-income-stat/hrm-income-stat.component";
import { HrmInterviewComponent } from "./components/hrm-interview/hrm-interview.component";
import { HrmEmployeeListComponent } from "./components/hrm-employee-list/hrm-employee-list.component";

@Component({
  selector: 'app-hrm',
  imports: [BreadcrumbComponent, HrmStatComponent, HrmJobSummaryComponent, HrmIncomeStatComponent, HrmInterviewComponent, HrmEmployeeListComponent],
  templateUrl: './hrm.component.html',
  styles: ``
})
export class HrmComponent {

}
