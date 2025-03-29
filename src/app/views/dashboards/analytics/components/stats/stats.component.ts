import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-stats',
    imports: [NgApexchartsModule],
    templateUrl: './stats.component.html',
    styles: ``
})
export class StatsComponent {
  websiteTraffic: Partial<ChartOptions> = {
    series: [
      {
        name: "Desktops",
        data: [35, 78, 40, 90, 56, 80, 15],
      },
    ],
    chart: {
      height: 45,
      type: "area",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        // bottom: 10,
        blur: 2,
        color: "#f0f4f7",
        opacity: 0.3,
      },
    },
    colors: ["#c26316"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  }
  converationRate: Partial<ChartOptions> = {
    series: [
      {
        name: "Desktops",
        data: [25, 55, 20, 60, 35, 60, 15],
      },
    ],
    chart: {
      height: 45,
      type: "area",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        // bottom: 10,
        blur: 2,
        color: "#f0f4f7",
        opacity: 0.3,
      },
    },
    colors: ["#E7366B"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  }
  sessionDuration: Partial<ChartOptions> = {
    series: [
      {
        name: "Desktops",
        data: [25, 68, 2, 50, 25, 55, 89],
      },
    ],
    chart: {
      height: 45,
      type: "area",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        // bottom: 10,
        blur: 2,
        color: "#f0f4f7",
        opacity: 0.3,
      },
    },
    colors: ["#287F71"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
  }
  user: Partial<ChartOptions> = {
    series: [
      {
        name: "Desktops",
        data: [36, 78, 36, 58, 35, 65, 55],
      },
    ],
    chart: {
      height: 45,
      type: "area",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        // bottom: 10,
        blur: 2,
        color: "#f0f4f7",
        opacity: 0.3,
      },
    },
    colors: ["#108dff"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    
    }
  }
  dailySales: Partial<ChartOptions> = {
    series: [
      {
        name: "Desktops",
        data: [36, 78, 36, 58, 35, 65, 55],
      },
    ],
    chart: {
      height: 45,
      type: "area",
      sparkline: {
        enabled: true,
      },
      animations: {
        enabled: false,
      },
      dropShadow: {
        enabled: true,
        top: 10,
        left: 0,
        // bottom: 10,
        blur: 2,
        color: "#f0f4f7",
        opacity: 0.3,
      },
    },
    colors: ["#108dff"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.5,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
    },
    tooltip: {
      enabled: false,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: false,
    },
    xaxis: {
      labels: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
    },
    yaxis: {
      show: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
}
}
