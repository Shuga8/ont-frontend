import React from "react";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";

const SuccessToast = ({ message, isActive }) => {
  return (
    <div
      id="toast-success"
      className={`${
        isActive ? "flex" : "hidden"
      } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow border-t-4 border-t-green-800`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-green-800 text-red-200">
        <FaCircleCheck />
        <span className="sr-only">Success icon</span>
      </div>
      <div className="ms-3 text-sm font-normal text-green-500">{message}</div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8  text-lg"
        data-dismiss-target="#toast-success"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>

        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
};

export default SuccessToast;
