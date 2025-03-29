import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-widget-sales-region',
    imports: [NgApexchartsModule],
    templateUrl: './widget-sales-region.component.html',
    styles: ``
})
export class WidgetSalesRegionComponent {
  salesRegionChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'India',
        data: [80, 50, 30, 40, 100, 20],
      },
      {
        name: 'Australia',
        data: [20, 30, 40, 80, 20, 80],
      },
      {
        name: 'Canada',
        data: [44, 76, 78, 13, 43, 10],
      },
    ],
    chart: {
      type: 'radar',
      height: 305,
      parentHeightOffset: 0,
      dropShadow: {
        enabled: true,
        blur: 1,
        left: 1,
        top: 1,
      },
      toolbar: {
        show: false,
      },
    },
    stroke: {
      width: 1,
    },
    fill: {
      opacity: 0.1,
    },
    markers: {
      size: 0,
      hover: {
        size: 10,
      },
    },
    yaxis: {
      stepSize: 20,
    },
    xaxis: {
      categories: ['2019', '2020', '2021', '2022', '2023', '2024'],
      labels: {
        show: true,
        style: {
          colors: [
            '#001b2f',
            '#001b2f',
            '#001b2f',
            '#001b2f',
            '#001b2f',
            '#001b2f',
          ],
          fontSize: '13px',
        },
      },
    },
    colors: ['#963b68', '#f59440', '#2786f1'],
    dataLabels: {
      enabled: false,
      background: {
        enabled: true,
      },
    },
  }
}
