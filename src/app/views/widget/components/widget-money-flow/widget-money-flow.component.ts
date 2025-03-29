import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-widget-money-flow',
    imports: [NgbDropdownModule, NgApexchartsModule],
    templateUrl: './widget-money-flow.component.html',
    styles: ``
})
export class WidgetMoneyFlowComponent {
  moneyFlow: Partial<ChartOptions> = {
    chart: {
      type: 'bar',
      height: 378,
      stacked: true,
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: true,
      },
    },
    series: [
      {
        name: 'Profit',
        data: [300, 333, 258, 295, 258, 326, 275, 283, 271, 316, 334, 271],
      },
      {
        name: 'Income',
        data: [300, 333, 258, 295, 258, 326, 275, 283, 271, 316, 333, 271],
      },
      {
        name: 'Expense',
        data: [300, 333, 258, 295, 259, 326, 275, 283, 271, 316, 333, 271],
      },
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
        borderRadiusApplication: 'end', // 'around', 'end'
        borderRadiusWhenStacked: 'last', // 'all', 'last'
        columnWidth: '60%',
        dataLabels: {
          total: {
            style: {
              fontSize: '13px',
              fontWeight: 900,
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: [
        'Jan',
        'Fab',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      labels: {
        padding: 4,
      },
    },
    colors: ['#1a4de7', '#108dff', '#dee2e6'],
    legend: {
      position: 'top',
      show: true,
      horizontalAlign: 'right',
    },
    fill: {
      opacity: 1,
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
