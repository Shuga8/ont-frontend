import React from "react";
import { GrCloudUpload } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { Button } from "@mui/material";
import { MdFormatListBulletedAdd } from "react-icons/md";

const Search = () => {
  return (
    <>
      <div className="flex justify-end p-3 flex-row gap-x-2">
        <Button
          variant="outlined"
          color="primary"
          className="flex flex-row gap-x-2"
        >
          <span className="hidden md:block text-base">New Survey</span>
          <MdFormatListBulletedAdd className="text-blue-700 text-2xl" />
        </Button>
        <div className="search-form">
          <form className="max-w-md min-w-72 md:min-w-80 mx-auto md:mx-0">
            <label
              htmlFor="default-search"
              className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <FiSearch className="w-4 h-4 text-gray-500" />
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
                placeholder="Search by phone number..."
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="new-survey-form hidden">
        <form method="POST" encType="multipart/formdata">
          <div className="flex items-center justify-center ">
            <label
              htmlFor="dropzone-file"
              className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50   hover:bg-gray-100 "
            >
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <GrCloudUpload className="w-8 h-8 mb-4 text-gray-500" />

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  CSV only
                </p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" />
            </label>
          </div>
        </form>
      </div>
    </>
  );
};

export default Search;
