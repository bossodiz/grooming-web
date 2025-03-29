import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-job-applied',
  imports: [NgApexchartsModule],
  templateUrl: './job-applied.component.html',
  styles: ``
})
export class JobAppliedComponent {
  jobApplied: Partial<ChartOptions> = {
    series: [75, 55, 65, 85],
    labels: ["36%", "10%", "36%", "12%"],
    chart: {
      type: "radialBar",
      height: 230,
      fontFamily: "inherit",
      foreColor: "#c6d1e9",
    },
    plotOptions: {
      radialBar: {
        inverseOrder: false,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 1,
          size: "40%",
        },
        dataLabels: {
          show: false,
        },
      },
    },
    legend: {
      show: false,
    },
    stroke: { width: 1, lineCap: "round" },
    tooltip: {
      enabled: false,
      fillSeriesColor: false,
    },
    colors: ["#108dff", "#963b68", "#287F71", "#01D4FF"],
  };
}
