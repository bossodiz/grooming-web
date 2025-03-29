import { Component } from '@angular/core';
import { ChartOptions } from '@common/apexchart.model';
import { NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';

@Component({
  selector: 'app-job-application-statisstics',
  imports: [NgApexchartsModule, NgbDropdownModule],
  templateUrl: './job-application-statisstics.component.html',
  styles: ``
})
export class JobApplicationStatissticsComponent {
  jobApplication: Partial<ChartOptions> = {
    series: [
      {
        name: "Active Job",
        data: [44, 55, 41, 67, 22, 43, 44, 55, 41, 67, 22, 43],
      },
      {
        name: "On Hold",
        data: [13, 23, 20, 8, 13, 27, 13, 23, 20, 8, 13, 27],
      },
      {
        name: "Shortlisted",
        data: [11, 17, 15, 15, 21, 14, 11, 17, 15, 15, 21, 14],
      },
    ],
    chart: {
      type: "bar",
      height: 360,
      stacked: true,
      // foreColor: "#adb0bb",
      parentHeightOffset: 0,
      toolbar: {
        show: false,
      },
    },
    grid: {
      borderColor: "#f1f1f1",
      strokeDashArray: 3,
    },
    plotOptions: {
      bar: {
        columnWidth: "40%",
        borderRadius: 2,
      },
    },
    colors: ["#108dff", "rgba(16, 141, 255, 0.5)", "rgba(16, 141, 255, 0.2)"],
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
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
    },
    fill: {
      opacity: 1,
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
    },
  }
}
