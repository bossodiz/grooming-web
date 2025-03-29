import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
    selector: 'app-top-session',
    imports: [NgApexchartsModule],
    templateUrl: './top-session.component.html',
    styles: ``
})
export class TopSessionComponent {
  sessionChart: Partial<ChartOptions> = {
    series: [65.48, 112.02, 80.48, 58.65],
    labels: ["Chrome", "Firefox", "Safari", "Opera"],
    chart: {
      type: "donut",
      height: 259,
    },
    plotOptions: {
      pie: {
        // size: 100,
        donut: {
          size: "80%",
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: false,
    },
    stroke: {
      width: 0,
    },
    yaxis: {
      labels: {
        formatter: function (e) {
          return e + "k Session";
        },
      },
      tickAmount: 4,
      min: 0,
    },
    colors: ["#287F71", "#522c8f", "#E77636", "#01D4FF"],
}

}