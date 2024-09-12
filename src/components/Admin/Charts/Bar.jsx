import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../hooks/useAuthContext";

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

  if (isLoading) return <p>Loading...</p>;
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
  };

  // Series data example (this would typically come from API data)
  const series = data
    ? [
        {
          name: "Completed Surveys",
          data: data.completedSurveys || [30, 40, 45, 50, 49, 60, 70, 91, 15],
        },
        {
          name: "Rejected Surveys",
          data: data.rejectedSurveys || [44, 55, 41, 67, 22, 43, 65, 60],
        },
      ]
    : [
        {
          name: "Completed Surveys",
          data: [30, 40, 45, 50, 49, 60, 70, 91, 15],
        },
        {
          name: "Rejected Surveys",
          data: [44, 55, 41, 67, 22, 43, 65, 60],
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
