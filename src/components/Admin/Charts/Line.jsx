import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineGraph extends Component {
  constructor(props) {
    super(props);

    const chartOneOptions = {
      series: [
        {
          name: "Product One",
          data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30, 45],
        },

        {
          name: "Product Two",
          data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39, 51],
        },
      ],
      legend: {
        show: false,
        position: "top",
        horizontalAlign: "left",
      },
      colors: ["#3C50E0", "#80CAEE"],
      chart: {
        fontFamily: "Satoshi, sans-serif",
        height: 335,
        type: "area",
        dropShadow: {
          enabled: true,
          color: "#623CEA14",
          top: 10,
          blur: 4,
          left: 0,
          opacity: 0.1,
        },

        toolbar: {
          show: false,
        },
      },
      responsive: [
        {
          breakpoint: 1024,
          options: {
            chart: {
              height: 300,
            },
          },
        },
        {
          breakpoint: 1366,
          options: {
            chart: {
              height: 350,
            },
          },
        },
      ],
      stroke: {
        width: [2, 2],
        curve: "straight",
      },

      markers: {
        size: 0,
      },
      labels: {
        show: false,
        position: "top",
      },
      grid: {
        xaxis: {
          lines: {
            show: true,
          },
        },
        yaxis: {
          lines: {
            show: true,
          },
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 4,
        colors: "#fff",
        strokeColors: ["#3056D3", "#80CAEE"],
        strokeWidth: 3,
        strokeOpacity: 0.9,
        strokeDashArray: 0,
        fillOpacity: 1,
        discrete: [],
        hover: {
          size: undefined,
          sizeOffset: 5,
        },
      },
      xaxis: {
        type: "category",
        categories: [
          "Sep",
          "Oct",
          "Nov",
          "Dec",
          "Jan",
          "Feb",
          "Mar",
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
        ],
        axisBorder: {
          show: false,
        },
        axisTicks: {
          show: false,
        },
      },
      yaxis: {
        title: {
          style: {
            fontSize: "0px",
          },
        },
        min: 0,
        max: 100,
      },
    };

    this.state = {
      options: {
        legend: {
          position: "top",
          horizontalAlign: "left",
          fontFamily: "Roboto",
          fontWeight: 500,
          fontSize: "14px",
          radius: "50px",

          markers: {
            radius: 99,
            shape: "circle",
          },
        },
        xaxis: {
          type: "category",
          categories: [
            "July",
            "August",
            "September",
            "October",
            "November",
            "Decenber",
          ],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
        },

        markers: {
          size: 0,
        },
        grid: {
          xaxis: {
            lines: {
              show: true,
            },
          },
          yaxis: {
            lines: {
              show: true,
            },
          },
        },
        dataLabels: {
          enabled: false,
        },
        markers: {
          size: 4,
          colors: "#fff",
          strokeColors: ["#EAB308", "#22C55E", "#EF4444"],
          strokeWidth: 3,
          strokeOpacity: 0.9,
          strokeDashArray: 0,
          fillOpacity: 1,
          discrete: [],
          hover: {
            size: undefined,
            sizeOffset: 5,
          },
        },
        stroke: {
          width: [2, 2],
          curve: "straight",
        },
        colors: ["#EAB308", "#22C55E", "#EF4444"],
        chart: {
          fontFamily: "Roboto",
          width: "100%",
          height: "100%",
          type: "area",
          dropShadow: {
            enabled: true,
            color: "#623CEA14",
            top: 10,
            blur: 4,
            left: 0,
            opacity: 0.1,
          },
          toolbar: {
            show: false,
          },
        },
      },
      series: [
        {
          name: "Pending Surveys",
          data: [12, 10, 13, 19, 18, 12],
        },

        {
          name: "Completed Surveys",
          data: [8, 7, 19, 20, 40, 50],
        },

        {
          name: "Rejected Survey",
          data: [6, 3, 2, 11, 9, 4],
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="area"
        width="100%"
        height={"100%"}
      />
    );
  }
}

export default LineGraph;
