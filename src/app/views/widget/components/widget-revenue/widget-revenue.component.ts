import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-widget-revenue',
    imports: [NgApexchartsModule],
    templateUrl: './widget-revenue.component.html',
    styles: ``
})
export class WidgetRevenueComponent {
  revenueChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Revenue chart',
        data: [
          12500, 8000, 7800, 9000, 6200, 6000, 4700, 4700, 5200, 5000, 5700,
          5500, 5800, 5500, 6200, 5500, 5500, 2400, 2600, 2000,
        ],
      },
    ],
    chart: {
      type: 'area',
      height: 250,
      parentHeightOffset: 0,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
      dashArray: 0,
    },
    xaxis: {
      categories: [
        '22 May',
        '23 May',
        '24 May',
        '25 May',
        '26 May',
        '27 May',
        '28 May',
        '29 May',
        '30 May',
        '01 June',
        '02 June',
        '03 June',
        '04 June',
        '05 June',
        '06 June',
        '07 June',
        '08 June',
        '09 June',
        '10 June',
      ],
    },
    legend: {
      position: 'top',
      show: true,
      horizontalAlign: 'right',
    },
    fill: {
      opacity: 1,
    },
    colors: ['#287F71'],
    grid: {
      padding: {
        top: -20,
        right: 0,
      },
      strokeDashArray: 1,
      yaxis: {
        lines: {
          show: true,
        },
      },
      xaxis: {
        lines: {
          show: true,
        },
      },
    },
  }
}
