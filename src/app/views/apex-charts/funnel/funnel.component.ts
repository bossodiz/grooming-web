import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-funnel',
    imports: [BreadcrumbComponent, NgApexchartsModule],
    templateUrl: './funnel.component.html',
    styles: ``
})
export class FunnelComponent {
  areaChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Funnel Series',
        data: [1380, 1100, 990, 880, 740, 548, 330, 200],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      parentHeightOffset: 0,
    },
    colors: ['#108dff'],
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex] + ':  ' + val
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Recruitment Funnel',
    },
    xaxis: {
      categories: [
        'Sourced',
        'Screened',
        'Assessed',
        'HR Interview',
        'Technical',
        'Verify',
        'Offered',
        'Hired',
      ],
    },
    legend: {
      show: false,
    },
  }
  Pyramid: Partial<ChartOptions> = {
    series: [
      {
        name: '',
        data: [200, 330, 548, 740, 880, 990, 1100, 1380],
      },
    ],
    chart: {
      type: 'bar',
      height: 350,
      parentHeightOffset: 0,
    },
    plotOptions: {
      bar: {
        borderRadius: 0,
        horizontal: true,
        distributed: true,
        barHeight: '80%',
        isFunnel: true,
      },
    },
    colors: [
      '#108dff',
      '#522c8f',
      '#963b68',
      '#db398a',
      '#ec344c',
      '#c26316',
      '#f59440',
      '#108dff',
    ],
    dataLabels: {
      enabled: true,
      formatter: function (val, opt) {
        return opt.w.globals.labels[opt.dataPointIndex]
      },
      dropShadow: {
        enabled: true,
      },
    },
    title: {
      text: 'Pyramid Chart',
    },
    xaxis: {
      categories: [
        'Sweets',
        'Processed Foods',
        'Healthy Fats',
        'Meat',
        'Beans & Legumes',
        'Dairy',
        'Fruits & Vegetables',
        'Grains',
      ],
    },
    legend: {
      show: false,
    },
  }
}
