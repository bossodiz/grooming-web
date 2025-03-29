import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-widget-visitor',
    imports: [NgApexchartsModule],
    templateUrl: './widget-visitor.component.html',
    styles: ``
})
export class WidgetVisitorComponent {
  visitorChart: Partial<ChartOptions> = {
    series: [
      {
        name: 'Website Visitor',
        data: [44, 55, 57, 56, 61, 58, 63, 60, 66],
      },
    ],
    chart: {
      height: 225,
      type: 'bar',
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '35%',
        borderRadius: 5,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'last', // 'all', 'last'
      },
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#f59440'],
    stroke: {
      curve: 'smooth',
      lineCap: 'round',
      dashArray: 0,
    },
    xaxis: {
      categories: [
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
      ],
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val:any) {
          return val + ' K'
        },
      },
    },
    grid: {
      strokeDashArray: 4,
    },
  }
}
