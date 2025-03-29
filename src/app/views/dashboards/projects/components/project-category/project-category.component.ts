import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-project-category',
  imports: [NgApexchartsModule],
  templateUrl: './project-category.component.html',
  styles: ``
})
export class ProjectCategoryComponent {
projectCategory:Partial<ChartOptions>={
  series: [65.48, 112.02, 80.48, 58.65],
  labels: ["Chrome", "Firefox", "Safari", "Opera"],
  chart: {
    type: "donut",
    height: 220,
  },
  plotOptions: {
    pie: {
      donut: {
        size: "60%",
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  legend: {
    show: false,
  },
  stroke: {
    show: true,
    width: 0,
    colors: ["transparent"],
  },
  tooltip: {
    y: {
      formatter: function (o) {
        return o + " %";
      },
    },
  },
  colors: ["#287F71", "#522c8f", "#E77636", "#01D4FF"],
}
}
