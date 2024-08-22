import React from "react";
import { SideBar } from "./Admin/index";
import { Link } from "react-router-dom";
import { RiListIndefinite, RiListCheck3, RiListCheck2 } from "react-icons/ri";
import { FaUsers } from "react-icons/fa";
const Admin = () => {
  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center ">
          <span>ONT&nbsp;/&nbsp;</span>
          <Link to={"/admin/"} className="underline text-blue-500">
            Dashboard
          </Link>
        </div>

        <div className="container-content px-1 py-2 md:px-6 md:py-5">
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
              <div className="icon w-12 h-12 rounded-full  bg-red-500 flex place-items-center justify-center mb-4">
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
              <div className="icon w-12 h-12 rounded-full  bg-purple-500 flex place-items-center justify-center mb-4">
                <FaUsers color="#fff" />
              </div>

              <div className="flow-widget-amount text-2xl text-gray-900">
                18
              </div>

              <div className="flow-widget-title text-sm text-gray-400">
                Agents
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Admin;
