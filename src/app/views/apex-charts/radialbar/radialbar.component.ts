import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartOptions } from '@common/apexchart.model'

@Component({
    selector: 'app-radialbar',
    imports: [BreadcrumbComponent, NgApexchartsModule],
    templateUrl: './radialbar.component.html',
    styles: ``
})
export class RadialbarComponent {
  simpleRadialbar: Partial<ChartOptions> = {
    series: [70],
    chart: {
      height: 350,
      type: 'radialBar',
      parentHeightOffset: 0,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '70%',
        },
      },
    },
    colors: ['#108dff'],
    labels: ['Cricket'],
  }
  multipleRadialbar: Partial<ChartOptions> = {
    series: [44, 55, 67, 83],
    chart: {
      height: 350,
      type: 'radialBar',
      parentHeightOffset: 0,
    },
    plotOptions: {
      radialBar: {
        dataLabels: {
          name: {
            fontSize: '22px',
          },
          value: {
            fontSize: '16px',
          },
          total: {
            show: true,
            label: 'Total',
          },
        },
      },
    },
    labels: ['Apples', 'Oranges', 'Bananas', 'Berries'],
  }
  customAngleCircle: Partial<ChartOptions> = {
    series: [76, 67, 61, 90],
    chart: {
      height: 350,
      type: 'radialBar',
      parentHeightOffset: 0,
    },
    plotOptions: {
      radialBar: {
        offsetY: 0,
        startAngle: 0,
        endAngle: 270,
        hollow: {
          margin: 5,
          size: '30%',
          background: 'transparent',
          image: undefined,
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            show: false,
          },
        },
        barLabels: {
          enabled: true,
          useSeriesColors: true,
          // margin: 8,
          fontSize: '16px',
          formatter: function (seriesName, opts) {
            return seriesName + ':  ' + opts.w.globals.series[opts.seriesIndex]
          },
        },
      },
    },
    colors: ['#108dff', '#963b68', '#ec344c', '#f59440'],
    labels: ['Vimeo', 'Messenger', 'Facebook', 'LinkedIn'],
  }
  gradientRadialbar: Partial<ChartOptions> = {
    series: [64],
    chart: {
      height: 350,
      type: 'radialBar',
      parentHeightOffset: 0,
      toolbar: {
        show: true,
      },
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 225,
        hollow: {
          margin: 0,
          size: '70%',
          background: '#fff',
          image: undefined,
          imageOffsetX: 0,
          imageOffsetY: 0,
          position: 'front',
        },
        track: {
          strokeWidth: '67%',
          margin: 0, // margin is in pixels
        },

        dataLabels: {
          show: true,
          name: {
            offsetY: -10,
            show: true,
            color: '#888',
            fontSize: '17px',
          },
          // value: {
          //     formatter: function (val:string) {
          //         return parseInt(val);
          //     },
          //     color: '#111',
          //     fontSize: '36px',
          //     show: true,
          // }
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        type: 'horizontal',
        shadeIntensity: 0.5,
        gradientToColors: ['#ABE5A1'],
        inverseColors: true,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Percent'],
  }
  radialbarsImage: Partial<ChartOptions> = {
    series: [67],
    chart: {
      height: 335,
      type: 'radialBar',
      parentHeightOffset: 0,
    },
    plotOptions: {
      radialBar: {
        hollow: {
          margin: 15,
          size: '65%',
          image: './assets/images/rocket.png',
          imageWidth: 56,
          imageHeight: 56,
          imageClipped: false,
        },
        dataLabels: {
          name: {
            show: false,
            color: '#fff',
          },
          value: {
            show: true,
            color: '#333',
            offsetY: 65,
            fontSize: '22px',
          },
        },
      },
    },
    fill: {
      type: 'image',
      image: {
        src: ['./assets/images/small/img-4.jpg'],
      },
    },
    stroke: {
      lineCap: 'round',
    },
    labels: ['Volatility'],
  }
  strokedGauge: Partial<ChartOptions> = {
    series: [67],
    chart: {
      height: 350,
      type: 'radialBar',
      parentHeightOffset: 0,
      offsetY: -10,
    },
    colors: ['#108dff'],
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        dataLabels: {
          name: {
            fontSize: '16px',
            color: undefined,
            offsetY: 120,
          },
          value: {
            offsetY: 76,
            fontSize: '22px',
            color: undefined,
            formatter: function (val) {
              return val + '%'
            },
          },
        },
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'dark',
        shadeIntensity: 0.15,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 65, 91],
      },
    },
    stroke: {
      dashArray: 4,
    },
    labels: ['Median Ratio'],
  }
  semiCircleGauge: Partial<ChartOptions> = {
    series: [76],
    chart: {
      type: 'radialBar',
      height: 350,
      offsetY: -20,
      parentHeightOffset: 0,
      sparkline: {
        enabled: true,
      },
    },
    colors: ['#4a5a6b'],
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#e7e7e7',
          strokeWidth: '97%',
          margin: 5, // margin is in pixels
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            color: '#999',
            opacity: 1,
            blur: 2,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
          },
        },
      },
    },
    grid: {
      padding: {
        top: -10,
      },
    },
    fill: {
      type: 'gradient',
      gradient: {
        shade: 'light',
        shadeIntensity: 0.4,
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 50, 53, 91],
      },
    },
    labels: ['Average Results'],
  }
}
