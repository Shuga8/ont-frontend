import React, { Component } from "react";
import Chart from "react-apexcharts";

class BarGraph extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          id: "bar",
          columnWidth: "25%",
          borderRadiusApplication: "end",
          borderRadiusWhenStacked: "last",
          stacked: true,
          toolbar: {
            show: false,
          },
          zoom: {
            enabled: false,
          },
        },
        colors: ["#22C55E", "#EF4444"],
        xaxis: {
          categories: [
            "Ag1",
            "Ag2",
            "Ag3",
            "Ag4",
            "Ag5",
            "Ag6",
            "A7g",
            "Ag8",
            "Ag9",
            "Ag10",
          ],
        },
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
      },
      series: [
        {
          name: "Completed Surveys",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 15],
        },
        {
          name: "Rejected Surveys",
          data: [44, 55, 41, 67, 22, 43, 65, 60],
        },
      ],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="bar"
        width="100%"
        height={"100%"}
      />
    );
  }
}

export default BarGraph;
