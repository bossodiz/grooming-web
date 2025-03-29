import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-hrm-stat',
  imports: [NgApexchartsModule],
  templateUrl: './hrm-stat.component.html',
  styles: ``
})
export class HrmStatComponent {
  jobReport: Partial<ChartOptions> = {
    series: [
      {
        name: "Financial team",
        data: [30, 28, 56, 44, 35, 30, 40],
      },
      {
        name: "Project Manager",
        data: [45, 39, 40, 34, 47, 40, 42],
      },
      {
        name: "Marketing  team",
        data: [49, 56, 50, 24, 45, 28, 38],
      },
      {
        name: "Product Design team",
        data: [39, 30, 38, 42, 25, 42, 55],
      },
    ],
    chart: {
      type: "bar",
      height: 255,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
      show: false,
    },

    plotOptions: {
      bar: {
        columnWidth: "60%",
        borderRadius: 2,
        isFunnel3d: true,
      },
    },
    colors: ["#0055fb", "#108dff", "#87DAE9", "#D0F2FB"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
    },
    yaxis: {
      show: false,
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: true,
      position: "top",

      fontWeight: 500,
      horizontalAlign: "left",
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
  }
}
