import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Skeleton from "../../Skeleton/Skeleton";

const BarGraph = () => {
  const { user } = useAuthContext();

  // Fetch the data using useQuery
  const { data, isLoading, error } = useQuery({
    queryKey: ["barGraph"],
    queryFn: () =>
      fetch(
        "https://ont-survey-tracker-development.up.railway.app/v1/stats/charts",
        {
          headers: {
            authorization: `Bearer ${user.token}`,
          },
        }
      ).then((res) => res.json()),
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-6 gap-x-3 place-content-center">
        <Skeleton type={"bar-chart"} />

        <Skeleton type={"bar-chart"} />

        <Skeleton type={"bar-chart"} />

        <Skeleton type={"bar-chart"} />

        <Skeleton type={"bar-chart"} />

        <Skeleton type={"bar-chart"} />
      </div>
    );
  }
  if (error) return <p>Error loading chart data</p>;

  const agStats = data.data.adminSurveyStats;
  const options = {
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
    // colors: ["#22C55E", "#EF4444", "#EAB308", "#A855F7"],
    colors: ["#22C55E", "#EF4444", "#A855F7"],
    xaxis: {
      categories: [...agStats.admin],
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
  };

  const series = [
    {
      name: "Completed Surveys",
      data: [...agStats.stats[0].data],
    },
    {
      name: "Rejected Surveys",
      data: [...agStats.stats[1].data],
    },
    // {
    //   name: "Pending Surveys",
    //   data: [...agStats.stats[2].data],
    // },
    {
      name: "Unfinished Surveys",
      data: [...agStats.stats[3].data],
    },
  ];

  return (
    <Chart
      options={options}
      series={series}
      type="bar"
      width="100%"
      height="100%"
    />
  );
};

export default BarGraph;
