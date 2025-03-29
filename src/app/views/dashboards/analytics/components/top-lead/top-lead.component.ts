import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-top-lead',
    imports: [NgbDropdownModule, NgApexchartsModule],
    templateUrl: './top-lead.component.html',
    styles: ``
})
export class TopLeadComponent {
  topleads: Partial<ChartOptions> = {
    series: [
      {
        name: 'Created',
        data: [48, 32, 42, 28, 15, 32, 20],
      },
      {
        name: 'Converted',
        data: [32, 33, 39, 42, 72, 55, 60],
      },
    ],
    chart: {
      type: 'bar',
      height: 367,
      stacked: true,
      foreColor: '#adb0bb',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '20%',
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    },
    grid: {
      borderColor: 'rgba(0,0,0,0.1)',
      strokeDashArray: 3,
      xaxis: {
        lines: {
          show: false,
        },
      },
      yaxis: {
        lines: {
          show: true,
        },
      },
    },
    colors: ['#c26316', '#D49664'],
    legend: {
      position: 'bottom',
    },
    fill: {
      opacity: 1,
    },
  }
}
