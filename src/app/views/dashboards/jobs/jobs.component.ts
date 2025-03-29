import { Component } from '@angular/core';
import { BreadcrumbComponent } from "../../../components/breadcrumb/breadcrumb.component";
import { JobStatsComponent } from "./components/job-stats/job-stats.component";
import { JobApplicationStatissticsComponent } from "./components/job-application-statisstics/job-application-statisstics.component";
import { JobUpcomingInterviewComponent } from "./components/job-upcoming-interview/job-upcoming-interview.component";
import { JobAppliedComponent } from "./components/job-applied/job-applied.component";
import { JobAplicantsComponent } from "./components/job-aplicants/job-aplicants.component";

@Component({
  selector: 'app-jobs',
  imports: [BreadcrumbComponent, JobStatsComponent, JobApplicationStatissticsComponent, JobUpcomingInterviewComponent, JobAppliedComponent, JobAplicantsComponent],
  templateUrl: './jobs.component.html',
  styles: ``
})
export class JobsComponent {

}
