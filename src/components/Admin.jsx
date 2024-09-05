import React, { useEffect, useState } from "react";
import { Loader, SideBar } from "./Admin/index";
import { Link } from "react-router-dom";
import { RiListIndefinite, RiListCheck3, RiListCheck2 } from "react-icons/ri";
import { FaListCheck, FaMapLocationDot } from "react-icons/fa6";
import { MdOutlineWrongLocation } from "react-icons/md";
import { TbLocationQuestion, TbLocationPause } from "react-icons/tb";
import LineGraph from "./Admin/Charts/Line";
import BarGraph from "./Admin/Charts/Bar";
import Info from "./Admin/Widgets/Info";
import { useAuthContext } from "../hooks/useAuthContext";
import Donut from "./Admin/Charts/Donut";
import Skeleton from "./Skeleton/Skeleton";

const Admin = () => {
  const { user } = useAuthContext();
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const getDashboardStats = async () => {
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${user.token}`);

      const response = await fetch(
        `https://ont-survey-tracker-development.up.railway.app/v1/stats/widgets`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      const data = await response.json();

      setStats(data.data.stats);
    };

    getDashboardStats();
  }, [user.token]);

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <Info />

        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between ">
          <span className="font-bold text-lg text-gray-900">Dasbhoard</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/"} className="text-blue-500">
              Dashboard
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <div className="flow-widgets grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 justify-center md:justify-normal">
            <div className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl">
              {stats ? (
                <div className="icon w-12 h-12 rounded-full  bg-green-500 flex place-items-center justify-center mb-4 relative">
                  <RiListCheck3 color="#fff" />
                </div>
              ) : (
                <Skeleton type="widget-icon" />
              )}

              <div className="flow-widget-amount text-2xl text-gray-900">
                {stats ? (
                  stats.totalCompletedSurvey
                ) : (
                  <Skeleton type={"small-text"} />
                )}
              </div>

              {stats ? (
                <Link
                  to={"/admin/survey/completed"}
                  className="absolute top-4 right-5 py-px px-2 text-xs  border-2 border-green-400 text-green-600 rounded-lg hover:bg-green-400 hover:text-white"
                >
                  view
                </Link>
              ) : (
                <div className="absolute top-4 right-5">
                  <Skeleton type={"title"} />
                </div>
              )}

              <div className="flow-widget-title text-sm text-gray-400">
                {stats ? "Completed Surveys" : <Skeleton type={"text"} />}
              </div>
            </div>

            <div className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl">
              {stats ? (
                <div className="icon w-12 h-12 rounded-full  bg-purple-500 flex place-items-center justify-center mb-4 relative">
                  <FaListCheck color="#fff" />
                </div>
              ) : (
                <Skeleton type="widget-icon" />
              )}

              <div className="flow-widget-amount text-2xl text-gray-900">
                {stats ? (
                  stats.totalUnfinishedSurvey
                ) : (
                  <Skeleton type={"small-text"} />
                )}
              </div>

              {stats ? (
                <Link
                  to={"/admin/survey/unfinished"}
                  className="absolute top-4 right-5 py-px px-2 text-xs  border-2 border-purple-400 text-purple-600 rounded-lg hover:bg-purple-400 hover:text-white"
                >
                  view
                </Link>
              ) : (
                <div className="absolute top-4 right-5">
                  <Skeleton type={"title"} />
                </div>
              )}

              <div className="flow-widget-title text-sm text-gray-400">
                {stats ? "Unfinished Surveys" : <Skeleton type={"text"} />}
              </div>
            </div>

            <div className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl">
              {stats ? (
                <div className="icon w-12 h-12 rounded-full  bg-yellow-500 flex place-items-center justify-center mb-4 ">
                  <RiListCheck2 color="#fff" />
                </div>
              ) : (
                <Skeleton type="widget-icon" />
              )}

              <div className="flow-widget-amount text-2xl text-gray-900">
                {stats ? (
                  stats.totalPendingSurvey
                ) : (
                  <Skeleton type={"small-text"} />
                )}
              </div>

              {stats ? (
                <Link
                  to={"/admin/survey/pending"}
                  className="absolute top-4 right-5 py-px px-2 text-xs  border-2 border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-400 hover:text-white"
                >
                  view
                </Link>
              ) : (
                <div className="absolute top-4 right-5">
                  <Skeleton type={"title"} />
                </div>
              )}

              <div className="flow-widget-title text-sm text-gray-400">
                {stats ? "Pending Surveys" : <Skeleton type={"text"} />}
              </div>
            </div>

            <div className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl">
              {stats ? (
                <div className="icon w-12 h-12 rounded-full  bg-red-500 flex place-items-center justify-center mb-4">
                  <RiListCheck2 color="#fff" />
                </div>
              ) : (
                <Skeleton type="widget-icon" />
              )}

              <div className="flow-widget-amount text-2xl text-gray-900">
                {stats ? (
                  stats.totalUnfinishedSurvey
                ) : (
                  <Skeleton type={"small-text"} />
                )}
              </div>

              {stats ? (
                <Link
                  to={"/admin/survey/rejected"}
                  className="absolute top-4 right-5 py-px px-2 text-xs  border-2 border-red-400 text-red-600 rounded-lg hover:bg-red-400 hover:text-white"
                >
                  view
                </Link>
              ) : (
                <div className="absolute top-4 right-5">
                  <Skeleton type={"title"} />
                </div>
              )}

              <div className="flow-widget-title text-sm text-gray-400">
                {stats ? "Rejected Surveys" : <Skeleton type={"text"} />}
              </div>
            </div>

            <div
              className={`flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block col-span-1 relative shadow-xl`}
            >
              {stats ? (
                <div className="icon w-12 h-12 rounded-full  bg-blue-500 flex place-items-center justify-center mb-4">
                  <RiListIndefinite color="#fff" />
                </div>
              ) : (
                <Skeleton type="widget-icon" />
              )}

              <div className="flow-widget-amount text-2xl text-gray-900">
                {stats ? stats.totalSurvey : <Skeleton type={"small-text"} />}
              </div>

              {stats ? (
                <Link
                  to={"/admin/survey/all"}
                  className="absolute top-4 right-5 py-px px-2 text-xs  border-2 border-blue-400 text-blue-600 rounded-lg hover:bg-blue-400 hover:text-white"
                >
                  view
                </Link>
              ) : (
                <div className="absolute top-4 right-5">
                  <Skeleton type={"title"} />
                </div>
              )}

              <div className="flow-widget-title text-sm text-gray-400">
                {stats ? "All Surveys" : <Skeleton type={"text"} />}
              </div>
            </div>

            {stats ? (
              stats.surveyStatsByLga.map((lga) =>
                lga.localStations.map((station) => {
                  const stationKey = station.station.replace("-", " ");
                  return (
                    <React.Fragment key={`${lga.lga}-${stationKey}`}>
                      <div
                        className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl"
                        key={`${lga.lga}-completed-${stationKey}`} // Unique key based on LGA and station
                      >
                        <div className="icon w-12 h-12 rounded-full bg-green-500 flex place-items-center justify-center mb-4">
                          <FaMapLocationDot color="#fff" />
                        </div>
                        <div className="flow-widget-amount text-2xl text-gray-900">
                          {station.totalCompleted}
                        </div>
                        <div className="flow-widget-title text-sm text-gray-400">
                          <span className="text-green-600">Completed</span> for{" "}
                          <span className="text-gray-800 font-semibold">
                            {lga.lga.toUpperCase()} {stationKey}
                          </span>
                        </div>
                      </div>

                      <div
                        className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl"
                        key={`${lga.lga}-unfinished-${stationKey}`}
                      >
                        <div className="icon w-12 h-12 rounded-full bg-purple-500 flex place-items-center justify-center mb-4">
                          <TbLocationPause color="#fff" />
                        </div>
                        <div className="flow-widget-amount text-2xl text-gray-900">
                          {station.totalUnfinished}
                        </div>
                        <div className="flow-widget-title text-sm text-gray-400">
                          <span className="text-purple-600">Unfinished</span>{" "}
                          for{" "}
                          <span className="text-gray-800 font-semibold">
                            {lga.lga.toUpperCase()} {stationKey}
                          </span>
                        </div>
                      </div>

                      <div
                        className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl"
                        key={`${lga.lga}-pending-${stationKey}`}
                      >
                        <div className="icon w-12 h-12 rounded-full bg-yellow-500 flex place-items-center justify-center mb-4">
                          <TbLocationQuestion color="#fff" />
                        </div>
                        <div className="flow-widget-amount text-2xl text-gray-900">
                          {station.totalPending}
                        </div>
                        <div className="flow-widget-title text-sm text-gray-400">
                          <span className="text-yellow-600">Pending</span> for{" "}
                          <span className="text-gray-800 font-semibold">
                            {lga.lga.toUpperCase()} {stationKey}
                          </span>
                        </div>
                      </div>

                      <div
                        className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl flex-grow"
                        key={`${lga.lga}-rejected-${stationKey}`}
                      >
                        <div className="icon w-12 h-12 rounded-full bg-red-500 flex place-items-center justify-center mb-4">
                          <MdOutlineWrongLocation color="#fff" />
                        </div>
                        <div className="flow-widget-amount text-2xl text-gray-900">
                          {station.totalRejected}
                        </div>
                        <div className="flow-widget-title text-sm text-gray-400">
                          <span className="text-red-600">Rejected</span> for{" "}
                          <span className="text-gray-800 font-semibold">
                            {lga.lga.toUpperCase()} {stationKey}
                          </span>
                        </div>
                      </div>
                    </React.Fragment>
                  );
                })
              )
            ) : (
              <>
                {Array.from({ length: 11 }).map((_, index) => (
                  <div
                    className="flow-widget rounded-md border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative shadow-xl"
                    key={index}
                  >
                    <Skeleton type="widget-icon" />

                    <div className="flow-widget-amount text-2xl text-gray-900">
                      <Skeleton type={"small-text"} />
                    </div>

                    <div className="flow-widget-title text-sm text-gray-400">
                      <Skeleton type={"text"} />
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>

          <div className="graph-widgets mt-10 w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 gap-x-8 gap-y-6 xl:grid-cols-3">
            <div className="graph-widget col-span-1 xl:col-span-2 p-2 h-96 bg-white rounded-md shadow-xl">
              <LineGraph />
            </div>

            <div className="graph-widget p-2 h-96 bg-white rounded-md shadow-xl">
              <BarGraph />
            </div>
          </div>

          <div className="graph-widgets mt-10 w-full grid grid-cols-1 grid-rows-2 md:grid-cols-2 md:grid-rows-1 xl:grid-cols-3 gap-x-8 gap-y-6">
            <div className="graph-widget h-96 p-2 bg-white rounded-md shadow-xl">
              <h3 className="text-xl text-gray-700 px-5 font-semibold py-2">
                LGA's
              </h3>

              <div className="graph w-full px-5 py-1 h-full">
                <Donut />
              </div>
            </div>
            <div className="graph-widget h-96 p-2 bg-white rounded-md col-span-1 xl:col-span-2  shadow-xl">
              <h3 className="text-xl text-gray-700 px-5 font-semibold py-2">
                Region Labels
              </h3>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
