import { Component } from '@angular/core'
import { ChartOptions } from '@common/apexchart.model'
import { NgApexchartsModule } from 'ng-apexcharts'

@Component({
  selector: 'app-ecommerce-order-review',
  imports: [NgApexchartsModule],
  templateUrl: './ecommerce-order-review.component.html',
  styles: ``
})
export class EcommerceOrderReviewComponent {
  orderReview: Partial<ChartOptions> = {
    chart: {
      height: 290,
      type: "radialBar",
      offsetX: 0,
      offsetY: 15,
    },
    plotOptions: {
      radialBar: {
        startAngle: -135,
        endAngle: 135,
        track: {
          strokeWidth: "97%",
        },
        dataLabels: {
          name: {
            fontSize: "16px",
            color: undefined,
            offsetY: 30,
          },
          value: {
            offsetY: -10,
            fontSize: "22px",
            color: undefined,
            formatter: function (val) {
              return val + "%";
            },
          },
        },
      },
    },
    colors: ["#108dff"],
    fill: {
      type: "solid",
      gradient: {
        shade: "dark",
        type: "horizontal",
        shadeIntensity: 0.5,
        gradientToColors: ["#108dff"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 1,
        stops: [0, 100],
      },
    },
    stroke: {
      dashArray: 3,
    },
    series: [92],
    labels: ["Orders"],
  };
}