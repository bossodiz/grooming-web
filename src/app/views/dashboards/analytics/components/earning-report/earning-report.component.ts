import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-earning-report',
  imports: [NgApexchartsModule],
  templateUrl: './earning-report.component.html',
  styles: ``
})
export class EarningReportComponent {
  earningReport: Partial<ChartOptions> = {
    series: [
      {
        name: "Total Income",
        type: "bar",
        data: [34, 65, 46, 68, 49, 61, 42, 44, 78, 52, 63, 67],
      },
      {
        name: "Total Expense",
        type: "bar",
        data: [16, 20, 32, 38, 42, 25, 15, 21, 17, 29, 12, 35],
      },
      {
        name: "Total Revenue",
        type: "line",
        data: [12, 16, 28, 32, 38, 22, 10, 18, 14, 58, 24, 70],
      },
    ],
    chart: {
      height: 340,
      type: "line",
      toolbar: {
        show: false,
      },
    },
    stroke: {
      dashArray: [0, 0],
      width: [0, 0, 2],
      curve: "smooth",
    },
    fill: {
      opacity: [1, 1],
      type: ["solid", "solid"],
      gradient: {
        type: "horizontal",
        inverseColors: false,
        opacityFrom: 0.5,
        opacityTo: 0,
        stops: [0, 90],
      },
    },
    markers: {
      size: [0, 0],
      strokeWidth: 2,
      hover: {
        size: 4,
      },
    },
    xaxis: {
      categories: [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ],
      axisTicks: {
        show: false,
      },
      axisBorder: {
        show: false,
      },
    },
    yaxis: {
      min: 0,
      axisBorder: {
        show: false,
      },
    },
    grid: {
      show: true,
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
      padding: {
        top: 0,
        right: -2,
        bottom: 0,
        left: 10,
      },
    },
    legend: {
      show: true,
      horizontalAlign: "center",
      offsetX: 0,
      offsetY: 5,
      itemMargin: {
        horizontal: 10,
        vertical: 0,
      },
    },
    plotOptions: {
      bar: {
        columnWidth: "50%",
        barHeight: "70%",
        borderRadius: 3,
      },
    },
    colors: ["#108dff", "#963b68", "#287F71"],
    tooltip: {
      shared: true,
      y: [
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + "k";
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + "k";
            }
            return y;
          },
        },
        {
          formatter: function (y) {
            if (typeof y !== "undefined") {
              return y.toFixed(1) + "k";
            }
            return y;
          },
        },
      ],
    },
  }
}
