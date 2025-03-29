import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-ecommerce-stat',
    imports: [NgApexchartsModule],
    templateUrl: './ecommerce-stat.component.html',
    styles: ``
})
export class EcommerceStatComponent {
  orders: Partial<ChartOptions> = {
    series: [
      {
        data: [40, 55, 40, 60, 48, 28, 56, 60],
      },
    ],
    chart: {
      height: 45,
      width: 100,
      type: 'bar',
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
    },
    colors: ['#287F71'],
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      strokeDashArray: 4,
    },
    labels: ['1, 2, 3, 4, 5, 6, 7, 8'],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      labels: {
        padding: 0,
      },
    },
    tooltip: {
      theme: 'light',
    },
    legend: {
      show: false,
    },
  }
  monthlyOrder: Partial<ChartOptions> = {
    series: [68],
    chart: {
      height: 70,
      width: 70,
      parentHeightOffset: 0,
      type: 'radialBar',
      offsetX: 0,
      offsetY: 8,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#963b68'],
    plotOptions: {
      radialBar: {
        offsetX: 7,
        offsetY: 0,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
        },
        track: {
          margin: 0,
        },
        dataLabels: {
          show: false,
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  }
  monthleRevenue: Partial<ChartOptions> = {
    series: [
      {
        data: [40, 67, 55, 75, 65, 44, 30, 85],
      },
    ],
    chart: {
      height: 45,
      width: 100,
      type: 'bar',
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
    },
    colors: ['#73bbe2'],
    plotOptions: {
      bar: {
        columnWidth: '40%',
        borderRadius: 2,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    grid: {
      strokeDashArray: 4,
    },
    labels: ['1, 2, 3, 4, 5, 6, 7, 8'],
    xaxis: {
      crosshairs: {
        width: 1,
      },
    },
    yaxis: {
      labels: {
        padding: 0,
      },
    },
    tooltip: {
      theme: 'light',
    },
    legend: {
      show: false,
    },
  }
  outOfStock: Partial<ChartOptions> = {
    series: [68],
    chart: {
      height: 70,
      width: 70,
      parentHeightOffset: 0,
      type: 'radialBar',
      offsetX: 0,
      offsetY: 8,
      sparkline: {
        enabled: true,
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#f59440'],
    plotOptions: {
      radialBar: {
        offsetX: 7,
        offsetY: 0,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
        },
        track: {
          margin: 0,
        },
        dataLabels: {
          show: false,
        },
      },
    },
    stroke: {
      lineCap: 'round',
    },
  }
}
