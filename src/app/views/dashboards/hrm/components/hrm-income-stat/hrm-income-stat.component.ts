import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { ChartComponent, NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-hrm-income-stat',
  imports: [NgApexchartsModule],
  templateUrl: './hrm-income-stat.component.html',
  styles: ``
})
export class HrmIncomeStatComponent {
incomeStat:Partial<ChartOptions>={
  series: [
    {
      name: "Income",
      data: [
        6800, 6800, 8800, 8800, 10200, 10200, 8600, 8600, 7200, 8000, 11000,
        11000,
      ],
    },
    {
      name: "Expense",
      data: [
        2500, 2500, 4500, 3200, 3200, 2000, 4500, 4500, 2500, 2500, 5000, 5000,
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
