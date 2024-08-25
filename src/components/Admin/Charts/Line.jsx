import React, { Component } from "react";
import Chart from "react-apexcharts";

class LineGraph extends Component {
  constructor(props) {
    super(props);

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
            "Week-1",
            "Week-2",
            "Week-3",
            "Week-4",
            "Week-5",
            "Week-6",
          ],
          axisBorder: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
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
