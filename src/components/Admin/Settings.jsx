import React from "react";
import { Loader, SideBar } from "./index";
import { Link } from "react-router-dom";

const Settings = () => {
  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between ">
          <span className="font-bold text-lg text-gray-900">Settings</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/settings"} className="underline text-blue-500">
              Settings
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-6"></div>
        </div>
      </div>
    </>
  );
};

export default Settings;
