import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-polar',
    imports: [BreadcrumbComponent, NgApexchartsModule],
    templateUrl: './polar.component.html',
    styles: ``
})
export class PolarComponent {
  basicPolarChart: Partial<ChartOptions> = {
    series: [14, 23, 21, 17, 15, 10, 12, 17, 21],
    chart: {
      height: 350,
      type: 'polarArea',
      parentHeightOffset: 0,
    },
    stroke: {
      colors: ['#fff'],
    },
    fill: {
      opacity: 0.8,
    },
    colors: ['#108dff', '#522c8f', '#c26316', '#27ebb0', '#108dff'],
  }
  monochromePolarChart: Partial<ChartOptions> = {
    series: [42, 47, 52, 58, 65],
    chart: {
      height: 380,
      type: 'polarArea',
      parentHeightOffset: 0,
    },
    labels: ['Rose A', 'Rose B', 'Rose C', 'Rose D', 'Rose E'],
    fill: {
      opacity: 1,
    },
    stroke: {
      width: 1,
      colors: undefined,
    },
    yaxis: {
      show: false,
    },
    legend: {
      position: 'bottom',
    },
    plotOptions: {
      polarArea: {
        rings: {
          strokeWidth: 0,
        },
        spokes: {
          strokeWidth: 0,
        },
      },
    },
    theme: {
      monochrome: {
        enabled: true,
        shadeTo: 'light',
        shadeIntensity: 0.6,
        color: '#108dff',
      },
    },
  }
}
