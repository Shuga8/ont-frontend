import React, { Component } from "react";
import Chart from "react-apexcharts";

class Donut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      options: {
        chart: {
          type: "donut",
        },
        colors: ["#22C55E", "#A855F7", "#EF4444"],
        labels: ["Completed LGA's", "Uncompleted LGA's", "Rejected LGA's"],
        legend: {
          show: true,
          position: "bottom",
        },
        plotOptions: {
          pie: {
            donut: {
              size: "65%",
              background: "#fff",
            },
          },
        },
        dataLabels: {
          enabled: true,
        },
      },
      series: [40, 149, 11],
    };
  }

  render() {
    return (
      <Chart
        options={this.state.options}
        series={this.state.series}
        type="donut"
        width="100%"
        height="100%"
      />
    );
  }
}

export default Donut;
