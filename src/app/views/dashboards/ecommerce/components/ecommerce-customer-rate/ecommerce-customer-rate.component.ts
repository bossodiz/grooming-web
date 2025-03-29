import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-ecommerce-customer-rate',
    imports: [NgApexchartsModule],
    templateUrl: './ecommerce-customer-rate.component.html',
    styles: ``
})
export class EcommerceCustomerRateComponent {
  customerRate: Partial<ChartOptions> = {
    series: [
      {
        name: "New Customer",
        data: [85, 80, 150, 127, 220, 200, 300, 290, 314],
      },
      {
        name: "Old Customer",
        data: [215, 165, 100, 200, 145, 185, 104, 124, 82],
      },
    ],
    chart: {
      type: "line",
      height: 305,
      parentHeightOffset: 0,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
      animations: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    fill: {
      opacity: 1,
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
      dashArray: [0, 7],
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
      tooltipHoverFormatter: function (val, opts) {
        return (
          val +
          " <strong>" +
          opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] +
          "</strong>"
        );
      },
    },
    markers: {
      size: 0,
      hover: {
        sizeOffset: 6,
      },
    },
    grid: {
      strokeDashArray: 2,
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
    xaxis: {
      labels: {
        // padding: 0,
      },
      axisBorder: {
        show: false,
      },
      tooltip: {
        enabled: false,
      },
      categories: ["09", "10", "11", "12", "13", "14", "15", "16"],
    },
    tooltip: {
      y: [
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
        {
          title: {
            formatter: function (val) {
              return val;
            },
          },
        },
      ],
    },
    colors: ["#108dff", "#27ebb0"],
  }
}
