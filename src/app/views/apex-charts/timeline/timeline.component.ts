import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartOptions } from '@common/apexchart.model'
import moment from 'moment'

@Component({
    selector: 'app-timeline',
    imports: [BreadcrumbComponent, NgApexchartsModule],
    templateUrl: './timeline.component.html',
    styles: ``
})
export class TimelineComponent {
  basicTimeline: Partial<ChartOptions> = {
    series: [
      {
        data: [
          {
            x: 'Code',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-04').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-04').getTime(),
              new Date('2019-03-08').getTime(),
            ],
          },
          {
            x: 'Validation',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-12').getTime(),
            ],
          },
          {
            x: 'Deployment',
            y: [
              new Date('2019-03-12').getTime(),
              new Date('2019-03-18').getTime(),
            ],
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: 'rangeBar',
      parentHeightOffset: 0,
      zoom: {
        enabled: true,
        allowMouseWheelZoom:false
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
      },
    },
    colors: ['#963b68'],
    xaxis: {
      type: 'datetime',
    },
  }
  distributedChart: Partial<ChartOptions> = {
    series: [
      {
        data: [
          {
            x: 'Analysis',
            y: [
              new Date('2019-02-27').getTime(),
              new Date('2019-03-04').getTime(),
            ],
            fillColor: '#108dff',
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-04').getTime(),
              new Date('2019-03-08').getTime(),
            ],
            fillColor: '#4a5a6b',
          },
          {
            x: 'Coding',
            y: [
              new Date('2019-03-07').getTime(),
              new Date('2019-03-10').getTime(),
            ],
            fillColor: '#27ebb0',
          },
          {
            x: 'Testing',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-12').getTime(),
            ],
            fillColor: '#c26316',
          },
          {
            x: 'Deployment',
            y: [
              new Date('2019-03-12').getTime(),
              new Date('2019-03-17').getTime(),
            ],
            fillColor: '#522c8f',
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: 'rangeBar',
      parentHeightOffset: 0,
      zoom: {
        enabled: true,
        allowMouseWheelZoom:false
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        dataLabels: {
          hideOverflowingLabels: false,
        },
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: string, opts) {
        var label = opts.w.globals.labels[opts.dataPointIndex]
        var a = moment(val[0])
        var b = moment(val[1])
        var diff = b.diff(a, 'days')
        return label + ': ' + diff + (diff > 1 ? ' days' : ' day')
      },
      style: {
        colors: ['#f3f4f5', '#fff'],
      },
    },
    xaxis: {
      type: 'datetime',
    },
    yaxis: {
      show: false,
    },
    grid: {
      row: {
        colors: ['#f3f4f5', '#fff'],
        opacity: 1,
      },
    },
  }
  multiTimeline: Partial<ChartOptions> = {
    series: [
      {
        name: 'Bob',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-08').getTime(),
            ],
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-11').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-11').getTime(),
              new Date('2019-03-16').getTime(),
            ],
          },
        ],
      },
      {
        name: 'Joe',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime(),
            ],
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-06').getTime(),
              new Date('2019-03-09').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-19').getTime(),
            ],
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: 'rangeBar',
      parentHeightOffset: 0,

      zoom: {
        enabled: true,
        allowMouseWheelZoom:false
      },
    },
    plotOptions: {
      bar: {
        borderRadius: 4,
        horizontal: true,
      },
    },
    dataLabels: {
      enabled: true,
      formatter: function (val: string) {
        var a = moment(val[0])
        var b = moment(val[1])
        var diff = b.diff(a, 'days')
        return diff + (diff > 1 ? ' days' : ' day')
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        type: 'vertical',
        shadeIntensity: 0.25,
        gradientToColors: undefined,
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [50, 0, 100, 100],
      },
    },
    colors: ['#108dff', '#4a5a6b'],
    xaxis: {
      type: 'datetime',
    },
    legend: {
      position: 'top',
    },
  }

  advanceTimeline: Partial<ChartOptions> = {
    series: [
      {
        name: 'Bob',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-08').getTime(),
            ],
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime(),
            ],
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-07').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-09').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-08').getTime(),
              new Date('2019-03-11').getTime(),
            ],
          },
          {
            x: 'Validation',
            y: [
              new Date('2019-03-11').getTime(),
              new Date('2019-03-16').getTime(),
            ],
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-01').getTime(),
              new Date('2019-03-03').getTime(),
            ],
          },
        ],
      },
      {
        name: 'Joe',
        data: [
          {
            x: 'Design',
            y: [
              new Date('2019-03-02').getTime(),
              new Date('2019-03-05').getTime(),
            ],
          },
          {
            x: 'Test',
            y: [
              new Date('2019-03-06').getTime(),
              new Date('2019-03-16').getTime(),
            ],
            goals: [
              {
                name: 'Break',
                value: new Date('2019-03-10').getTime(),
                strokeColor: '#CD2F2A',
              },
            ],
          },
          {
            x: 'Code',
            y: [
              new Date('2019-03-03').getTime(),
              new Date('2019-03-07').getTime(),
            ],
          },
          {
            x: 'Deployment',
            y: [
              new Date('2019-03-20').getTime(),
              new Date('2019-03-22').getTime(),
            ],
          },
          {
            x: 'Design',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-16').getTime(),
            ],
          },
        ],
      },
      {
        name: 'Dan',
        data: [
          {
            x: 'Code',
            y: [
              new Date('2019-03-10').getTime(),
              new Date('2019-03-17').getTime(),
            ],
          },
          {
            x: 'Validation',
            y: [
              new Date('2019-03-05').getTime(),
              new Date('2019-03-09').getTime(),
            ],
            goals: [
              {
                name: 'Break',
                value: new Date('2019-03-07').getTime(),
                strokeColor: '#CD2F2A',
              },
            ],
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: 'rangeBar',
      parentHeightOffset: 0,
      zoom: {
        enabled: true,
        allowMouseWheelZoom:false
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '80%',
      },
    },
    xaxis: {
      type: 'datetime',
    },
    stroke: {
      width: 1,
    },
    colors: ['#108dff', '#001b2f', '#ec344c'],
    fill: {
      type: 'solid',
      opacity: 0.6,
    },
    legend: {
      position: 'top',
      horizontalAlign: 'left',
    },
  }
  multiSeriesRow: Partial<ChartOptions> = {
    series: [
      // George Washington
      {
        name: 'George Washington',
        data: [
          {
            x: 'President',
            y: [
              new Date(1789, 3, 30).getTime(),
              new Date(1797, 2, 4).getTime(),
            ],
          },
        ],
      },
      // John Adams
      {
        name: 'John Adams',
        data: [
          {
            x: 'President',
            y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
          },
          {
            x: 'Vice President',
            y: [
              new Date(1789, 3, 21).getTime(),
              new Date(1797, 2, 4).getTime(),
            ],
          },
        ],
      },
      // Thomas Jefferson
      {
        name: 'Thomas Jefferson',
        data: [
          {
            x: 'President',
            y: [new Date(1801, 2, 4).getTime(), new Date(1809, 2, 4).getTime()],
          },
          {
            x: 'Vice President',
            y: [new Date(1797, 2, 4).getTime(), new Date(1801, 2, 4).getTime()],
          },
          {
            x: 'Secretary of State',
            y: [
              new Date(1790, 2, 22).getTime(),
              new Date(1793, 11, 31).getTime(),
            ],
          },
        ],
      },
      // Aaron Burr
      {
        name: 'Aaron Burr',
        data: [
          {
            x: 'Vice President',
            y: [new Date(1801, 2, 4).getTime(), new Date(1805, 2, 4).getTime()],
          },
        ],
      },
      // George Clinton
      {
        name: 'George Clinton',
        data: [
          {
            x: 'Vice President',
            y: [
              new Date(1805, 2, 4).getTime(),
              new Date(1812, 3, 20).getTime(),
            ],
          },
        ],
      },
      // John Jay
      {
        name: 'John Jay',
        data: [
          {
            x: 'Secretary of State',
            y: [
              new Date(1789, 8, 25).getTime(),
              new Date(1790, 2, 22).getTime(),
            ],
          },
        ],
      },
      // Edmund Randolph
      {
        name: 'Edmund Randolph',
        data: [
          {
            x: 'Secretary of State',
            y: [
              new Date(1794, 0, 2).getTime(),
              new Date(1795, 7, 20).getTime(),
            ],
          },
        ],
      },
      // Timothy Pickering
      {
        name: 'Timothy Pickering',
        data: [
          {
            x: 'Secretary of State',
            y: [
              new Date(1795, 7, 20).getTime(),
              new Date(1800, 4, 12).getTime(),
            ],
          },
        ],
      },
      // Charles Lee
      {
        name: 'Charles Lee',
        data: [
          {
            x: 'Secretary of State',
            y: [
              new Date(1800, 4, 13).getTime(),
              new Date(1800, 5, 5).getTime(),
            ],
          },
        ],
      },
      // John Marshall
      {
        name: 'John Marshall',
        data: [
          {
            x: 'Secretary of State',
            y: [
              new Date(1800, 5, 13).getTime(),
              new Date(1801, 2, 4).getTime(),
            ],
          },
        ],
      },
      // Levi Lincoln
      {
        name: 'Levi Lincoln',
        data: [
          {
            x: 'Secretary of State',
            y: [new Date(1801, 2, 5).getTime(), new Date(1801, 4, 1).getTime()],
          },
        ],
      },
      // James Madison
      {
        name: 'James Madison',
        data: [
          {
            x: 'Secretary of State',
            y: [new Date(1801, 4, 2).getTime(), new Date(1809, 2, 3).getTime()],
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: 'rangeBar',
      parentHeightOffset: 0,
      zoom: {
        enabled: true,
        allowMouseWheelZoom:false
      },
    },
    plotOptions: {
      bar: {
        horizontal: true,
        barHeight: '50%',
        rangeBarGroupRows: true,
      },
    },
    colors: [
      '#108dff',
      '#343a40',
      '#f59440',
      '#522c8f',
      '#db398a',
      '#522c8f',
      '#8D5B4C',
      '#ec344c',
      '#27ebb0',
      '#836ccb',
      '#F46036',
      '#0ab39c',
      '#963b68',
      '#f59440',
      '#73bbe2',
    ],
    fill: {
      type: 'solid',
    },
    xaxis: {
      type: 'datetime',
    },
    legend: {
      position: 'right',
    },
    tooltip: {
      custom: function (opts) {
        const fromYear = new Date(opts.y1).getFullYear()
        const toYear = new Date(opts.y2).getFullYear()

        const w = opts.ctx.w
        let ylabel = w.globals.labels[opts.dataPointIndex]
        let seriesName = w.config.series[opts.seriesIndex].name
          ? w.config.series[opts.seriesIndex].name
          : ''
        const color = w.globals.colors[opts.seriesIndex]

        return (
          '<div class="apexcharts-tooltip-rangebar">' +
          '<div> <span class="series-name" style="color: ' +
          color +
          '">' +
          (seriesName ? seriesName : '') +
          '</span></div>' +
          '<div> <span class="category">' +
          ylabel +
          ' </span> <span class="value start-value">' +
          fromYear +
          '</span> <span class="separator">-</span> <span class="value end-value">' +
          toYear +
          '</span></div>' +
          '</div>'
        )
      },
    },
  }
  dumbbellChart: Partial<ChartOptions> = {
    series: [
      {
        data: [
          {
            x: 'Operations',
            y: [2800, 4500],
          },
          {
            x: 'Customer Success',
            y: [3200, 4100],
          },
          {
            x: 'Engineering',
            y: [2950, 7800],
          },
          {
            x: 'Marketing',
            y: [3000, 4600],
          },
          {
            x: 'Product',
            y: [3500, 4100],
          },
          {
            x: 'Data Science',
            y: [4500, 6500],
          },
          {
            x: 'Sales',
            y: [4100, 5600],
          },
        ],
      },
    ],
    chart: {
      height: 350,
      type: 'rangeBar',
      parentHeightOffset: 0,
      zoom: {
        enabled: false,
      },
    },
    colors: ['#001b2f', '#108dff'],
    plotOptions: {
      bar: {
        horizontal: true,
        isDumbbell: true,
        dumbbellColors: [['#4a98f5', '#001b2f']],
      },
    },
    title: {
      text: 'Paygap Disparity',
    },
    legend: {
      show: true,
      showForSingleSeries: true,
      position: 'top',
      horizontalAlign: 'left',
      customLegendItems: ['Female', 'Male'],
    },
    fill: {
      type: 'gradient',
      gradient: {
        gradientToColors: ['#4a98f5'],
        inverseColors: false,
        stops: [0, 100],
      },
    },
    grid: {
      xaxis: {
        lines: {
          show: true,
        },
      },
      yaxis: {
        lines: {
          show: false,
        },
      },
    },
  }
}
