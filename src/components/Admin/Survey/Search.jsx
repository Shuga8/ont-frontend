import React, { useState } from "react";
import { GrCloudUpload } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import { Button } from "@mui/material";
import { MdFormatListBulletedAdd, MdPlaylistAddCheck } from "react-icons/md";
import csvThumbnail from "../../../assets/csv_thumbnail.png";

const Search = (page) => {
  const [formType, setFromType] = useState(null);

  const showNewSurveyForm = (type) => {
    setFromType(type);
    document.querySelector(".new-survey-form").classList.remove("hidden");
  };

  const [csvPreview, setCsvPreview] = useState("");

  window.addEventListener("click", function (e) {
    if (e.target == document.querySelector(".new-survey-form")) {
      document.querySelector(".new-survey-form").classList.add("hidden");
      setCsvPreview("");
    }
  });

  const handleDrop = (e) => {
    e.preventDefault();
    let file;

    if (e.dataTransfer && e.dataTransfer.files.length > 0) {
      file = e.dataTransfer.files[0];
    } else if (e.target && e.target.files.length > 0) {
      file = e.target.files[0];
    }

    if (file && file.type === "text/csv") {
      const reader = new FileReader();

      reader.onload = (event) => {
        const text = event.target.result;
        setCsvPreview(text.split("\n").slice(0, 5).join("\n"));
      };

      reader.readAsText(file);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <>
      <div className="flex justify-end p-3 flex-row gap-x-2">
        <Button
          variant="outlined"
          color="primary"
          className="flex flex-row gap-x-2 "
          onClick={() => showNewSurveyForm("new")}
        >
          <span className="hidden md:block text-base">New Survey</span>
          <MdFormatListBulletedAdd className="text-blue-700 text-2xl" />
        </Button>
        <Button
          variant="outlined"
          color="success"
          className="flex flex-row gap-x-2"
          onClick={() => showNewSurveyForm("add")}
        >
          <span className="hidden md:block text-base">Add Survey</span>
          <MdPlaylistAddCheck className="text-green-700 text-2xl" />
        </Button>
        <div className="search-form">
          <form
            className="max-w-md min-w-60 md:min-w-80 mx-auto md:mx-0"
            name="search_form"
          >
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
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 placeholder:text-xs"
                placeholder="Search by phone number..."
                autoComplete="phone"
                required
              />
              <button
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-xs md:text-sm px-2 py-2 md:px-4"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="new-survey-form hidden">
        <form
          method="POST"
          encType="multipart/formdata "
          className="grid grid-cols-1 justify-center items-center place-items-center grid-rows-3 bg-white px-3"
        >
          <label
            htmlFor="dropzone-file"
            className="flex flex-col items-center justify-center w-full h-auto cursor-pointer row-span-2 "
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            {csvPreview ? (
              <div className="preview-div w-full h-full leading-8 overflow-auto text-base">
                {csvPreview}
              </div>
            ) : (
              <div className="flex flex-col items-center place-content-center place-items-center justify-center py-6 px-2">
                <div className="mb-4">
                  <img
                    src={csvThumbnail}
                    className="w-20 h-20 object-contain mix-blend-multiply"
                    alt="CSV Thumbnail"
                  />
                </div>
                <GrCloudUpload className="w-8 h-8 mb-4 text-gray-500" />

                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 hidden">
                  CSV only
                </p>
              </div>
            )}
            <input
              id="dropzone-file"
              type="file"
              className="hidden"
              onChange={handleDrop}
            />
          </label>

          <Button variant="contained" color="primary" className="flex-end">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
};

export default Search;
