import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-pie',
    imports: [BreadcrumbComponent, NgApexchartsModule],
    templateUrl: './pie.component.html',
    styles: ``
})
export class PieComponent {
  simplePie: Partial<ChartOptions> = {
    series: [44, 55, 13, 43, 22],
    chart: {
      height: 300,
      type: 'pie',
      parentHeightOffset: 0,
    },
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    legend: {
      position: 'bottom',
    },
    colors: ['#108dff', '#522c8f', '#27ebb0', '#963b68', '#343a40'],
  }
  simpleDonut: Partial<ChartOptions> = {
    series: [44, 55, 41, 17, 15],
    chart: {
      height: 300,
      type: 'donut',
      parentHeightOffset: 0,
    },
    legend: {
      position: 'bottom',
    },
    colors: ['#108dff', '#963b68', '#c26316', '#108dff', '#73bbe2'],
  }
  Monochrome: Partial<ChartOptions> = {
    series: [25, 15, 44, 55, 41, 17],
    chart: {
      height: 300,
      type: 'pie',
      parentHeightOffset: 0,
    },
    labels: [
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ],
    colors: ['#108dff', '#73bbe2'],
    theme: {
      monochrome: {
        enabled: true,
      },
    },
    plotOptions: {
      pie: {
        dataLabels: {
          offset: -5,
        },
      },
    },
    title: {
      text: 'Monochrome Pie',
    },
    dataLabels: {
      formatter(val, opts) {
        const name = opts.w.globals.labels[opts.seriesIndex]
        return [name, typeof val === 'number' ? val.toFixed(1) + '%' : val]
      },
    },
    legend: {
      show: false,
    },
  }
  donutWithPattern: Partial<ChartOptions> = {
    series: [44, 55, 41, 17, 15],
    chart: {
      height: 300,
      type: 'donut',
      parentHeightOffset: 0,
      dropShadow: {
        enabled: true,
        color: '#111',
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2,
      },
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            total: {
              showAlways: true,
              show: true,
            },
          },
        },
      },
    },
    labels: ['Comedy', 'Action', 'SciFi', 'Drama', 'Horror'],
    dataLabels: {
      dropShadow: {
        blur: 3,
        opacity: 0.8,
      },
    },
    fill: {
      type: 'pattern',
      opacity: 1,
      pattern: {
        // enabled: true,
        style: [
          'verticalLines',
          'squares',
          'horizontalLines',
          'circles',
          'slantedLines',
        ],
      },
    },

    theme: {
      palette: 'palette2',
    },
    title: {
      text: 'Favourite Movie Type',
    },
    colors: ['#f0f4f7', '#f59440', '#ec344c', '#4a5a6b', '#108dff'],
  }
  gradientDonutPie: Partial<ChartOptions> = {
    series: [44, 55, 41, 17, 15],
    chart: {
      height: 330,
      type: 'donut',
      parentHeightOffset: 0,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 270,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    colors: ['#108dff', '#343a40', '#108dff', '#ec344c', '#f59440'],
    legend: {
      formatter: function (val, opts) {
        return val + ' - ' + opts.w.globals.series[opts.seriesIndex]
      },
      position: 'bottom',
    },
    title: {
      text: 'Gradient Donut With Custom Start-angle',
    },
  }
  semiDonut: Partial<ChartOptions> = {
    series: [44, 55, 41, 17, 15],
    chart: {
      height: 300,
      type: 'donut',
      parentHeightOffset: 0,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
      },
    },
    grid: {
      padding: {
        bottom: -80,
      },
    },
    colors: ['#108dff', '#963b68', '#f59440', '#73bbe2', '#343a40'],
  }
}
