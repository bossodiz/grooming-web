import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-widget-analytics',
    imports: [NgApexchartsModule],
    templateUrl: './widget-analytics.component.html',
    styles: ``
})
export class WidgetAnalyticsComponent {
  analticsChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Last 9 days',
        data: [85, 80, 150, 127, 220, 200, 300, 290, 314],
      },
      {
        name: 'Preceding period',
        data: [215, 165, 100, 200, 145, 185, 104, 124, 82],
      },
    ],
    chart: {
      type: 'line',
      height: 240,
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
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    stroke: {
      width: [2, 2],
      curve: 'straight',
      dashArray: [0, 7],
    },
    legend: {
      position: 'bottom',
      horizontalAlign: 'left',
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          ' <strong>' +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          '</strong>'
        )
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
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
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      categories: ['09', '10', '11', '12', '13', '14', '15', '16'],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val
            },
          },
        },
      ],
    },
    colors: ['#287F71', '#f59440'],
  }
}
