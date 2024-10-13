import React, { useState } from "react";
import { MdError } from "react-icons/md";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { RiFileCopy2Line } from "react-icons/ri";

const ErrorToast = ({ message, isActive, IsCopyAble = false }) => {
  const [copyText, setCopyText] = useState("copy");

  const copyMessage = async () => {
    await navigator.clipboard.writeText(message);
  };
  return (
    <div
      id="toast-danger"
      className={`${
        isActive ? "flex " : "hidden"
      } items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow border-t-4 border-t-red-800`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8  rounded-lg bg-red-800 text-red-200">
        <MdError />
        <span className="sr-only">Error icon</span>
      </div>
      <div className="ms-3 text-sm flex flex-row justify-between place-items-center gap-x-2 font-normal text-red-500">
        {message}
        {IsCopyAble == true && (
          <>
            <button
              className="flex flex-row float-right gap-x-1 place-items-center text-xs px-1 py-1.5 border rounded-sm border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
              onClick={async () => {
                await copyMessage();
                setCopyText("copied");
                setTimeout(() => {
                  setCopyText("copy");
                }, 500);
              }}
            >
              <RiFileCopy2Line />
              <span className="copy-text">{copyText}</span>
            </button>
          </>
        )}
      </div>
      <button
        type="button"
        className="ms-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8  text-lg"
        data-dismiss-target="#toast-danger"
        aria-label="Close"
      >
        <span className="sr-only">Close</span>

        <IoIosCloseCircleOutline />
      </button>
    </div>
  );
};

export default ErrorToast;
