import React, { useState, useEffect } from "react";
import { ErrorToast, Loader, SideBar } from "./index";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { RiFileDownloadLine } from "react-icons/ri";
import { CgSpinner } from "react-icons/cg";
import SuccessToast from "../Alerts/SuccessToast";
import InfoToast from "../Alerts/InfoToast";

const Download = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [isInfoActive, setInfoActive] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const status = document.forms["downloadForm"]["status"].value;
    const region = document.forms["downloadForm"]["region"].value;

    if (
      (status == null || status == "" || status == "none") &&
      (region == null || region == "" || region == "none")
    ) {
      setError("One or both export type must be picked");
      setLoading(false);
      return;
    }

    if (status !== "none" && region === "none") {
      setInfo(`Downloading Surveys of Status "${status}"`);
    } else if (status === "none" && region !== "none") {
      setInfo(`Downloading Surveys of Region "${region}"`);
    } else if (status !== "none" && region !== "none") {
      setInfo(`Downloading all ${status} Surveys Of ${region}`);
    }
  };

  useEffect(() => {
    if (error) {
      setErrorActive(true);
      const timer = setTimeout(() => {
        setErrorActive(false);
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (success) {
      setSuccessActive(true);
      const timer = setTimeout(() => {
        setSuccessActive(false);
        setSuccess(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (info) {
      setInfoActive(true);
      const timer = setTimeout(() => {
        setInfoActive(false);
        setInfo(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, info]);

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <InfoToast message={info} isActive={isInfoActive} />
        <ErrorToast message={error} isActive={isErrorActive} />
        <SuccessToast message={success} isActive={isSuccessActive} />
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700 border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between rounded-lg">
          <span className="font-bold text-lg text-gray-900">Download</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/download"} className="underline text-blue-500">
              Download
            </Link>
          </span>
        </div>

        <div className="container-content px-1 py-2 md:px-6 md:py-5">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default sm:px-7 xl:pb-6">
            <h3 className="text-blue-600 text-xl text-center my-4 font-semibold">
              Download Surveys
            </h3>

            <p className="text-pink-700 text-xs text-center">
              One or both export type must be picked
            </p>

            <form
              className="grid grid-cols-1 grid-rows-2 gap-y-2"
              onSubmit={handleSubmit}
              name="downloadForm"
            >
              <div className="h-auto px-4 py-1 block">
                <label htmlFor="status" className="text-gray-900 font-medium">
                  Choose Export Status:
                </label>
                <select
                  name="status"
                  id="status"
                  className="bg-white px-4 py-3 outline-none  focus:outline-none border-2 border-slate-200 w-full mt-2"
                  defaultValue={"none"}
                >
                  <option value="none">None</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="h-auto px-4 py-1 block">
                <label htmlFor="status" className="text-gray-900 font-medium">
                  Choose Export Region:
                </label>
                <select
                  name="region"
                  id="region"
                  className="bg-white px-4 py-3 outline-none  focus:outline-none border-2 border-slate-200 w-full mt-2"
                  defaultValue={"none"}
                >
                  <option value="none">None</option>
                  <option value="ikorodu-agric">Ikorodu (Agric)</option>
                  <option value="ikorodu-zone-1">Ikorodu (Zone 1)</option>
                  <option value="ikorodu-zone-2">Ikorodu (Zone 2)</option>
                  <option value="ikorodu-zone-3">Ikorodu (Zone 3)</option>
                  <option value="gbagada-main">Gbagada (Main)</option>
                  <option value="gbagada-zone-1">Gbagada (Zone 1)</option>
                  <option value="gbagada-zone-2">Gbagada (Zone 2)</option>
                  <option value="gbagada-zone-3">Gbagada (Zone 3)</option>
                  <option value="gbagada-zone-4">Gbagada (Zone 4)</option>
                  <option value="gbagada-zone-5">Gbagada (Zone 5)</option>
                </select>
              </div>

              <div className="my-10 px-4 py-1">
                <Button
                  variant="contained"
                  color="success"
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className="text-white py-2 px-10 spinner">
                      <CgSpinner />
                    </span>
                  ) : (
                    <span className="flex flex-row gap-x-2 place-items-center">
                      <RiFileDownloadLine color="#fff" /> Download
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Download;
