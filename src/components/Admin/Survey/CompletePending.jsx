import React from "react";
import { Loader, SideBar } from "../index";

const CompletePending = () => {
  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between">
          <span className="font-bold text-lg text-gray-900">
            Complete Pending Surveys
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5"></div>
      </div>
    </>
  );
};

export default CompletePending;
