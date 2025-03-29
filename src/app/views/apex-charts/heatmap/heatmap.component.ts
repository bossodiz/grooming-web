import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartOptions } from '@common/apexchart.model'

@Component({
    selector: 'app-heatmap',
    imports: [BreadcrumbComponent, NgApexchartsModule],
    templateUrl: './heatmap.component.html',
    styles: ``
})
export class HeatmapComponent {
  generateData(count: number, yrange: any) {
    var i = 0
    var series = []
    while (i < count) {
      var x = (i + 1).toString()
      var y =
        Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min

      series.push({
        x: x,
        y: y,
      })
      i++
    }
    return series
  }

  basicHeatmap: Partial<ChartOptions> = {
    series: [
      {
        name: 'Metric1',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric2',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric3',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric4',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric5',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric6',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric7',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric8',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric9',
        data: this.generateData(18, {
          min: 0,
          max: 90,
        }),
      },
    ],
    chart: {
      height: 350,
      type: 'heatmap',
      parentHeightOffset: 0,
    },
    dataLabels: {
      enabled: false,
    },
    colors: ['#108dff'],
    title: {
      text: 'HeatMap Chart (Single color)',
    },
  }

  multipleColor: Partial<ChartOptions> = {
    series: [
      {
        name: 'W1',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W2',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W3',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W4',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W5',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W6',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W7',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W8',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W9',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W10',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W11',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W12',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W13',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W14',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'W15',
        data: this.generateData(8, {
          min: 0,
          max: 90,
        }),
      },
    ],
    chart: {
      height: 350,
      type: 'heatmap',
      parentHeightOffset: 0,
    },
    dataLabels: {
      enabled: false,
    },
    colors: [
      '#108dff',
      '#108dff',
      '#522c8f',
      '#963b68',
      '#db398a',
      '#ec344c',
      '#c26316',
      '#f59440',
      '#27ebb0',
      '#73bbe2',
      '#963b68',
      '#108dff',
      '#27ebb0',
      '#f59440',
      '#522c8f',
    ],
    xaxis: {
      type: 'category',
      categories: [
        '10:00',
        '10:30',
        '11:00',
        '11:30',
        '12:00',
        '12:30',
        '01:00',
        '01:30',
      ],
    },
    title: {
      text: 'HeatMap Chart (Different color shades for each series)',
      style: {
        fontWeight: 500,
      },
    },
    grid: {
      padding: {
        right: 20,
      },
    },
  }
  rangeColor: Partial<ChartOptions> = {
    series: [
      {
        name: 'Jan',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'Feb',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'Mar',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'Apr',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'May',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'Jun',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'Jul',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'Aug',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
      {
        name: 'Sep',
        data: this.generateData(20, {
          min: -30,
          max: 55,
        }),
      },
    ],
    chart: {
      height: 350,
      type: 'heatmap',
      parentHeightOffset: 0,
    },
    plotOptions: {
      heatmap: {
        shadeIntensity: 0.5,
        radius: 0,
        useFillColorAsStroke: true,
        colorScale: {
          ranges: [
            {
              from: -30,
              to: 5,
              name: 'low',
              color: '#108dff',
            },
            {
              from: 6,
              to: 20,
              name: 'medium',
              color: '#963b68',
            },
            {
              from: 21,
              to: 45,
              name: 'high',
              color: '#108dff',
            },
            {
              from: 46,
              to: 55,
              name: 'extreme',
              color: '#f59440',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 1,
    },
    title: {
      text: 'HeatMap Chart with Color Range',
    },
  }

  roundedColor: Partial<ChartOptions> = {
    series: [
      {
        name: 'Metric1',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric2',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric3',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric4',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric5',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric6',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric7',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric8',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
      {
        name: 'Metric8',
        data: this.generateData(20, {
          min: 0,
          max: 90,
        }),
      },
    ],
    chart: {
      height: 350,
      type: 'heatmap',
      parentHeightOffset: 0,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      heatmap: {
        radius: 30,
        enableShades: false,
        colorScale: {
          ranges: [
            {
              from: 0,
              to: 50,
              color: '#108dff',
            },
            {
              from: 51,
              to: 100,
              color: '#108dff',
            },
          ],
        },
      },
    },
    dataLabels: {
      enabled: true,
      style: {
        colors: ['#fff'],
      },
    },
    xaxis: {
      type: 'category',
    },
    title: {
      text: 'Rounded (Range without Shades)',
    },
  }
}
