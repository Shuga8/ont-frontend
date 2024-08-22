import React from "react";
import { SideBar } from "../index";
import { Link } from "react-router-dom";

const Completed = () => {
  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center ">
          <span>ONT&nbsp;/&nbsp;</span>
          <Link
            to={"/admin/survey/completed"}
            className="underline text-blue-500"
          >
            Survey&nbsp;/&nbsp;Completed
          </Link>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5"></div>
      </div>
    </>
  );
};

export default Completed;
