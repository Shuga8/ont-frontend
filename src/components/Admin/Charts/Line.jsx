import { useQuery } from "@tanstack/react-query";
import React from "react";
import Chart from "react-apexcharts";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Skeleton from "../../Skeleton/Skeleton";

const LineGraph = () => {
  const { user } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["lineGraph"],
    queryFn: () =>
      fetch(
        "https://ont-survey-tracker-development.up.railway.app/v1/stats/charts",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      ).then((res) => {
        return res.json();
      }),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-y-3">
        <Skeleton type={"graph-chart"} />

        <Skeleton type={"graph-chart"} />

        <Skeleton type={"graph-chart"} />

        <Skeleton type={"graph-chart"} />

        <Skeleton type={"graph-chart"} />

        <Skeleton type={"graph-chart"} />
      </div>
    );
  }
  if (error) return <div>Error fetching data</div>;

  const yearly = data.data.yearlySurveyStats;
  const toLoop = yearly[2].data;
  const cats = [];

  for (let i = 1; i <= toLoop.length; i++) {
    cats.push(`Week-${i}`);
  }

  const options = {
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
      categories: cats,
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
          show: false,
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    markers: {
      size: 4,
      colors: "#fff",
      strokeColors: ["#EAB308", "#22C55E", "#A855F7", "#EF4444"],
      strokeWidth: 3,
      strokeOpacity: 0.9,
      strokeDashArray: 0,
      fillOpacity: 1,
      hover: {
        sizeOffset: 5,
      },
    },
    stroke: {
      width: [2, 2],
      curve: "straight",
    },
    colors: ["#EAB308", "#22C55E", "#A855F7", "#EF4444"],
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
  };

  const series = [
    {
      name: "Pending Surveys",
      data: yearly[2].data,
    },
    {
      name: "Completed Surveys",
      data: yearly[0].data,
    },
    {
      name: "Unfinished Surveys",
      data: yearly[1].data,
    },
    {
      name: "Rejected Survey",
      data: yearly[3].data,
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="area"
      width="100%"
      height="100%"
    />
  );
};

export default LineGraph;
