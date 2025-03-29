import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-ecommerce-sales-report',
  imports: [NgApexchartsModule],
  templateUrl: './ecommerce-sales-report.component.html',
  styles: ``
})
export class EcommerceSalesReportComponent {
  salesreport: Partial<ChartOptions> = {
    series: [
      {
        name: "Orders",
        type: "bar",
        data: [26, 59, 27, 51, 25, 39, 29, 48, 29, 52, 27, 37],
      },
      {
        name: "Sales",
        type: "line",
        data: [47, 41, 72, 35, 46, 35, 51, 78, 40, 75, 52, 58],
      },
    ],
    chart: {
      animations: {
        enabled: false,
      },
      type: 'line',
      height: 360,
      zoom: {
        enabled: false,
      },
      toolbar: {
        show: false,
      },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "35%",
        // endingShape: "rounded",
        borderRadius: 6,
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      position: "top",
      horizontalAlign: "right",
    },
    stroke: {
      curve: "smooth",
      width: [3, 2],
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
    colors: ["#108dff", "#E77636"],
    xaxis: {
      // type: "month",
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
      axisBorder: {
        show: true,
        color: "rgba(119, 119, 142, 0.05)",
        offsetX: 0,
        offsetY: 0,
      },
    }
  }
}
