import React from "react";
import { HiMiniInformationCircle } from "react-icons/hi2";
import { IoIosCloseCircleOutline } from "react-icons/io";

const InfoToast = ({ message, isActive }) => {
  return (
    <div
      id="toast-info"
      className={`${
        isActive ? "flex" : "hidden"
      } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow border-t-4 border-t-blue-800`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-blue-800 text-primary-200">
        <HiMiniInformationCircle />
        <span className="sr-only">Info icon</span>
      </div>
      <div className="ms-3 text-sm font-normal text-blue-500 capitalize">
        <span className="text-gray-400">{message}</span>
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8  text-lg"
        data-dismiss-target="#toast-info"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>

        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
};

export default InfoToast;
