import React from "react";
import { MdError } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";

const ErrorToast = ({ message, isActive }) => {
  return (
    <div
      id="toast-danger"
      class={`${
        isActive ? "flex" : "hidden"
      } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow border-t-4 border-t-red-800`}
      role="alert"
    >
      <div class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-red-800 text-red-200">
        <MdError />
        <span class="sr-only">Error icon</span>
      </div>
      <div class="ms-3 text-sm font-normal text-red-500">{message}</div>
      <button
        type="button"
        class="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8  text-lg"
        data-dismiss-target="#toast-danger"
        aria-label="Close"
      >
        <span class="sr-only">Close</span>

        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
};

export default ErrorToast;
