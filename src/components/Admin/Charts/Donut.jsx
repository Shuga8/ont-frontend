import React from "react";
import Chart from "react-apexcharts";
import { useQuery } from "@tanstack/react-query";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Donut = () => {
  const { user } = useAuthContext();

  const { data, isLoading, error } = useQuery({
    queryKey: ["Donut"],
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

  const options = {
    chart: {
      type: "donut",
    },
    colors: ["#22C55E", "#EAB308", "#A855F7", "#EF4444"],
    labels: [
      "Completed LGA's",
      "Pending LGA's",
      "Unfinished LGA's",
      "Rejected LGA's",
    ],
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
  };

  const donutData = data.data.lgasSurveyStats;
  const series = data
    ? [
        donutData.completedSurveysPercentage,
        donutData.pendingSurveysPercentage,
        donutData.inProgressSurveysPercentage,
        donutData.rejectedSurveysPercentage,
      ]
    : [40, 149, 11];

  return (
    <Chart
      options={options}
      series={series}
      type="donut"
      width="100%"
      height="100%"
    />
  );
};

export default Donut;
