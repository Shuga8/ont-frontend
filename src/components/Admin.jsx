import React from "react";
import { Loader, SideBar } from "./Admin/index";
import { Link } from "react-router-dom";
import { RiListIndefinite, RiListCheck3, RiListCheck2 } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
import LineGraph from "./Admin/Charts/Line";
import BarGraph from "./Admin/Charts/Bar";
const Admin = () => {
  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center ">
          <span>ONT&nbsp;/&nbsp;</span>
          <Link to={"/admin/"} className="underline text-blue-500">
            Dashboard
          </Link>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <div className="flow-widgets grid w-full grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5 justify-center md:justify-normal">
            <div className="flow-widget rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block relative">
              <div className="icon w-12 h-12 rounded-full  bg-green-500 flex place-items-center justify-center mb-4">
                <RiListCheck3 color="#fff" />
              </div>

              <div className="flow-widget-amount text-2xl text-gray-900">
                100
              </div>

              <div className="flow-widget-title text-sm text-gray-400">
                Completed Surveys
              </div>
            </div>

            <div className="flow-widget rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block">
              <div className="icon w-12 h-12 rounded-full  bg-yellow-500 flex place-items-center justify-center mb-4">
                <RiListCheck2 color="#fff" />
              </div>

              <div className="flow-widget-amount text-2xl text-gray-900">
                118
              </div>

              <div className="flow-widget-title text-sm text-gray-400">
                Pending Surveys
              </div>
            </div>

            <div className="flow-widget rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block">
              <div className="icon w-12 h-12 rounded-full  bg-blue-500 flex place-items-center justify-center mb-4">
                <RiListIndefinite color="#fff" />
              </div>

              <div className="flow-widget-amount text-2xl text-gray-900">
                218
              </div>

              <div className="flow-widget-title text-sm text-gray-400">
                All Surveys
              </div>
            </div>

            <div className="flow-widget rounded-sm border border-stroke bg-white px-7 py-6 shadow-default dark:border-strokedark dark:bg-boxdark block">
              <div className="icon w-12 h-12 rounded-full  bg-red-500 flex place-items-center justify-center mb-4">
                <RiListCheck2 color="#fff" />
              </div>

              <div className="flow-widget-amount text-2xl text-gray-900">
                56
              </div>

              <div className="flow-widget-title text-sm text-gray-400">
                Rejected Surveys
              </div>
            </div>
          </div>

          <div className="graph-widgets mt-10 w-full grid grid-cols-1 grid-rows-2 md:grid-cols-3 md:grid-rows-1 gap-4">
            <div className="graph-widget col-span-1 md:col-span-2 p-2 h-96 bg-white rounded-md">
              <LineGraph />
            </div>

            <div className="graph-widget p-2 h-96 bg-white rounded-md">
              <BarGraph />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
