import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-hrm-job-summary',
  imports: [NgApexchartsModule],
  templateUrl: './hrm-job-summary.component.html',
  styles: ``
})
export class HrmJobSummaryComponent {
  jobSummary: Partial<ChartOptions> = {
    series: [20, 25, 55, 35], // Values for the segments
    chart: {
      type: "donut",
      height: 225,
    },
    labels: ["Active Job", "Unactive", "Closed", "On Hold"], // Customize as needed
    colors: [
      "#108dff",
      "rgba(16, 141, 255, 0.7)",
      "rgba(16, 141, 255, 0.5)",
      "rgba(16, 141, 255, 0.2)",
    ], // Custom segment colors
    plotOptions: {
      pie: {
        donut: {
          size: "70%",
          labels: {
            show: true,
            total: {
              show: true,
              label: "Total Jobs",
              formatter: () => "134",
            },
          },
        },
      },
    },
    stroke: {
      width: 0,
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
  }
}
