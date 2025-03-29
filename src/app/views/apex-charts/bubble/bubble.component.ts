import { Component } from '@angular/core'
import { BreadcrumbComponent } from '../../../components/breadcrumb/breadcrumb.component'
import { NgApexchartsModule } from 'ng-apexcharts'
import { ChartOptions } from '@common/apexchart.model'

@Component({
    selector: 'app-bubble',
    imports: [BreadcrumbComponent, NgApexchartsModule],
    templateUrl: './bubble.component.html',
    styles: ``
})
export class BubbleComponent {
  generateData(e: number, t: number, a: { max: number; min: number }) {
    for (var r = 0, o = []; r < t; ) {
      var n = Math.floor(750 * Math.random()) + 1,
        l = Math.floor(Math.random() * (a.max - a.min + 1)) + a.min,
        m = Math.floor(61 * Math.random()) + 15
      o.push([n, l, m]), r++
    }
    return o
  }
  simpleBubble: Partial<ChartOptions> = {
    series: [
      {
        name: 'Bubble1',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble2',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble3',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Bubble4',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    chart: {
      height: 350,
      type: 'bubble',
      zoom: {
        enabled: true,
        allowMouseWheelZoom:false
      },
      parentHeightOffset: 0,
    },
    colors: ['#108dff', '#963b68', '#ec344c', '#108dff'],
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 0.8,
    },
    title: {
      text: 'Simple Bubble Chart',
    },
    xaxis: {
      tickAmount: 12,
      type: 'category',
    },
    yaxis: {
      max: 70,
    },
  }
  animationBubble: Partial<ChartOptions> = {
    series: [
      {
        name: 'Product1',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Product2',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Product3',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
      {
        name: 'Product4',
        data: this.generateData(new Date('11 Feb 2017 GMT').getTime(), 20, {
          min: 10,
          max: 60,
        }),
      },
    ],
    chart: {
      height: 350,
      type: 'bubble',
      parentHeightOffset: 0,
      zoom: {
        enabled: true,
        allowMouseWheelZoom:false
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      type: 'gradient',
    },
    title: {
      text: '3D Bubble Chart',
    },
    xaxis: {
      tickAmount: 12,
      type: 'datetime',
      labels: {
        rotate: 0,
      },
    },
    colors: ['#108dff', '#963b68', '#f59440', '#73bbe2'],
    yaxis: {
      max: 70,
    },
    theme: {
      palette: 'palette2',
    },
  }
}
