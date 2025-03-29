import { Component } from '@angular/core';
import { jobStats } from '../../data';

@Component({
  selector: 'app-job-stats',
  imports: [],
  templateUrl: './job-stats.component.html',
  styles: ``
})
export class JobStatsComponent {
  jobStats = jobStats
}
