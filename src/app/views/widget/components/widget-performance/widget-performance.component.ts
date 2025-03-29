import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-widget-performance',
    imports: [NgApexchartsModule],
    templateUrl: './widget-performance.component.html',
    styles: ``
})
export class WidgetPerformanceComponent {
  performanceChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Task completed',
        data: [44, 55, 41, 37, 44],
      },
      {
        name: 'Presence',
        data: [53, 32, 33, 52, 22],
      },
      {
        name: 'Completed Meeting',
        data: [12, 24, 22, 23, 35],
      },
    ],
    chart: {
      type: 'bar',
      height: 355,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        dataLabels: {
          total: {
            enabled: false,
          },
        },
      },
    },
    stroke: {
      width: 1,
      colors: ['#fff'],
    },
    xaxis: {
      categories: [
        'Hazel Nutt',
        'Simon Cyrence',
        'Aida bugga',
        'Peg Legge',
        'Barb Akew',
      ],
      labels: {
        formatter: function (val) {
          return val
        },
      },
    },
    yaxis: {
      title: {
        text: undefined,
      },
      labels: {
        style: {
          fontSize: '13px',
          fontFamily: 'Public Sans", sans-serif',
          fontWeight: 500,
          cssClass: 'apexcharts-yaxis-label',
        },
      },
    },
    tooltip: {
      // y: {
      //   formatter: function (val) {
      //     return val
      //   }
      // }
    },
    colors: ['#135046', '#287f71', '#cbe0dd'],
    fill: {
      opacity: 1,
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'center',
      show: true,
    },
    grid: {
      padding: {
        top: -20,
        right: 0,
        bottom: 0,
      },
      strokeDashArray: 4,
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}
