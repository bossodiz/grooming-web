import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-project-statistics',
  imports: [NgApexchartsModule],
  templateUrl: './project-statistics.component.html',
  styles: ``
})
export class ProjectStatisticsComponent {
  projectStat: Partial<ChartOptions> = {
    series: [
      {
        name: "Active Projects",
        type: "bar",
        data: [100, 100, 120, 148, 120, 120, 220, 103, 83, 114, 265, 174],
      },
      {
        name: "Completed Projects",
        type: "bar",
        data: [95, 80, 130, 115, 190, 115, 159, 102, 138, 136, 62, 240],
      },
      // {
      //   name: "Total Revenue",
      //   type: "line",
      //   data: [12, 16, 28, 32, 38, 22, 10, 18, 14, 58, 24, 70],
      // },
    ],
    chart: {
      height: 312,
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
    colors: ["#108dff", "rgba(16, 141, 255, 0.3)"],
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
