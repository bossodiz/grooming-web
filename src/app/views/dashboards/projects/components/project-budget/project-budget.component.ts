import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-project-budget',
  imports: [NgApexchartsModule],
  templateUrl: './project-budget.component.html',
  styles: ``
})
export class ProjectBudgetComponent {
  projectBudget: Partial<ChartOptions> = {
    series: [
      {
        name: "Inprogress",
        data: [
          20000, 20000, 15000, 15000, 30000, 30000, 45000, 45000, 30000, 10000,
          32000, 32000,
        ],
      },
      {
        name: "Progress",
        data: [
          30000, 30000, 22000, 22000, 15000, 15000, 15000, 28000, 28000, 38000,
          28000, 28000,
        ],
      },
    ],
    chart: {
      type: "line",
      height: 292,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    colors: ["#108dff", "#E77636"],
    fill: {
      type: "gradient",
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
    },
    yaxis: {
      min: 0,
      max: 50000,
      tickAmount: 5,
      labels: {
        formatter: (value) => `$${(value / 1000).toFixed(0)}k`,
      },
    },
    tooltip: {
      shared: true,
      intersect: false,
      theme: "light",
      marker: {
        show: true,
      },
      y: {
        formatter: (value) => `$${value.toLocaleString()}`,
      },
    },
    grid: {
      borderColor: "#f0f4f7",
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}
