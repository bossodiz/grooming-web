import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-widget-traffic',
    imports: [NgApexchartsModule],
    templateUrl: './widget-traffic.component.html',
    styles: ``
})
export class WidgetTrafficComponent {
  trafficChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Marketing',
        data: [
          8, 12, 8, 9, 12, 14, 15, 18, 15, 19, 20, 25, 15, 17, 18, 7, 13, 15,
          20, 2, 22, 21, 25, 30, 24, 27, 32, 28, 35, 31, 26, 40, 29, 33, 37, 34,
          39,
        ],
      },
      {
        name: 'Developing',
        data: [
          8, 9, 10, 8, 12, 10, 12, 11, 15, 18, 19, 15, 18, 21, 17, 9, 20, 22,
          19, 11, 23, 21, 24, 27, 25, 28, 30, 26, 29, 31, 33, 35, 32, 34, 36,
          37, 38,
        ],
      },
      {
        name: 'Other',
        data: [
          13, 19, 13, 11, 10, 11, 13, 14, 15, 18, 16, 20, 17, 20, 19, 11, 22,
          24, 21, 13, 26, 25, 28, 29, 27, 30, 32, 31, 34, 33, 35, 36, 38, 37,
          40, 39, 41,
        ],
      },
    ],
    chart: {
      type: 'bar',
      height: 200,
      parentHeightOffset: 0,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
      stacked: true,
    },
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      padding: {
        top: -20,
        right: 0,
        bottom: 10,
      },
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      labels: {},
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      type: 'datetime',
    },
    yaxis: {
      labels: {
        padding: 4,
      },
    },
    labels: [
      '2021-01-01',
      '2021-01-02',
      '2021-01-03',
      '2021-01-04',
      '2021-01-05',
      '2021-01-06',
      '2021-01-07',
      '2021-01-08',
      '2021-01-09',
      '2021-01-10',
      '2021-01-11',
      '2021-01-12',
      '2021-01-13',
      '2021-01-14',
      '2021-01-15',
      '2021-01-16',
      '2021-01-17',
      '2021-01-18',
      '2021-01-19',
      '2021-01-20',
      '2021-01-21',
      '2021-01-22',
      '2021-01-23',
      '2021-01-24',
      '2021-01-25',
      '2021-01-26',
      '2021-01-27',
      '2021-01-28',
      '2021-01-29',
      '2021-01-30',
      '2021-01-31',
      '2021-02-01',
      '2021-02-02',
      '2021-02-03',
      '2021-02-04',
      '2021-02-05',
      '2021-02-06',
    ],
    colors: ['#135046', '#73bbe2', '#2786f1'],
    legend: {
      show: false,
    },
  }
  subscribeChart: Partial<ChartOptions> = {
    chart: {
      type: 'area',
      height: 135,
      parentHeightOffset: 0,
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      stacked: true,
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.16,
      type: 'solid',
    },
    stroke: {
      width: 2,
      lineCap: 'round',
      curve: 'smooth',
    },
    series: [
      {
        name: 'Purchases',
        data: [
          15, 20, 25, 27, 21, 25, 27, 29, 24, 35, 30, 40, 34, 25, 29, 30, 32,
          34, 39, 28, 26, 35, 39, 32, 40, 55, 60, 48, 52, 70,
        ],
      },
    ],
    plotOptions: {
      bar: {
        columnWidth: '50%',
      },
    },
    grid: {
      padding: {
        top: -20,
        right: 0,
        bottom: 10,
      },
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
    xaxis: {
      labels: {},
      tooltip: {
        enabled: false,
      },
      axisBorder: {
        show: false,
      },
      type: 'datetime',
      tickAmount: 6,
    },
    yaxis: {
      labels: {
        padding: 4,
      },
    },
    labels: [
      '2020-06-21',
      '2020-06-22',
      '2020-06-23',
      '2020-06-24',
      '2020-06-25',
      '2020-06-26',
      '2020-06-27',
      '2020-06-28',
      '2020-06-29',
      '2020-06-30',
      '2020-07-01',
      '2020-07-02',
      '2020-07-03',
      '2020-07-04',
      '2020-07-05',
      '2020-07-06',
      '2020-07-07',
      '2020-07-08',
      '2020-07-09',
      '2020-07-10',
      '2020-07-11',
      '2020-07-12',
      '2020-07-13',
      '2020-07-14',
      '2020-07-15',
      '2020-07-16',
      '2020-07-17',
      '2020-07-18',
      '2020-07-19',
      '2020-07-20',
    ],
    colors: ['#2786f1'],
    legend: {
      show: false,
    },
  }
}
