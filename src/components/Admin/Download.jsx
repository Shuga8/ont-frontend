import React, { useState, useEffect } from "react";
import { ErrorToast, Loader, SideBar } from "./index";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { RiFileDownloadLine } from "react-icons/ri";
import { CgSpinner } from "react-icons/cg";
import SuccessToast from "../Alerts/SuccessToast";
import InfoToast from "../Alerts/InfoToast";
import Preloader from "./Widgets/Preloader";
import { useAuthContext } from "../../hooks/useAuthContext";

const Download = () => {
  const { user } = useAuthContext();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [isInfoActive, setInfoActive] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [station, setStation] = useState(null);
  const [selectedStations, setSelectedStations] = useState([]);
  const stationsSet = {
    ikorodu: [
      "IKORODU-IKORODU",
      "IKORODU-IJEDE",
      "IKORODU-IMOTA",
      "IKORODU-IGBOGBO",
      "IKORODU-ODOGUNYAN",
    ],
    alimosho: [
      "ALIMOSHO-EGBEDA",
      "ALIMOSHO-IDIMU",
      "ALIMOSHO-IKOTUN",
      "ALIMOSHO-ISHERI OLOFIN",
      "ALIMOSHO-IPAJA",
    ],
  };

  const handleLGAChange = async (e) => {
    setSelectedStations([]);
    if (e.target.value === "none" || e.target.value === "all") {
      setStation(null);
      return;
    }
    setStation(e.target.value);
  };

  const handleStationSelected = async (e) => {
    const { value, checked } = e.target;

    // If "All Stations" is selected
    if (value === "all-stations") {
      if (checked) {
        const allStations = stationsSet[station];
        setSelectedStations(allStations);
      } else {
        setSelectedStations([]);
      }
    } else {
      setSelectedStations((prev) =>
        checked ? [...prev, value] : prev.filter((station) => station !== value)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setLoading(true);

    const form = e.target;
    const status = form.status.value;
    const region = form.region.value;

    if (status == "none") {
      setError("Please select a status or all statuses");
      setLoading(false);
      return;
    }

    if (
      (status === "none" || !status) &&
      (region === "none" || !region || selectedStations.length === 0) &&
      region !== "all" &&
      region !== "none"
    ) {
      setError("Please select correct download format, lga cannot be none");
      setLoading(false);
      return;
    }

    if (
      region !== "all" &&
      region !== "none" &&
      selectedStations.length === 0
    ) {
      setError("Please select local government stations");
      setLoading(false);
      return;
    }

    let message = "";

    let url = `https://ont-survey-tracker-development.up.railway.app/v1/surveys/download`;

    if (status === "all" && (region === "all" || region === "none")) {
      message = `Downloading All Surveys`;
    } else if (status === "all" && region !== "all" && region !== "none") {
      if (selectedStations.length > 0) {
        message = `Downloading All Surveys for the following stations: ${selectedStations.join(
          ", "
        )}`;
        url += `?localGovernment=["${region.toUpperCase()}"]&localStation=["${selectedStations.join(
          '","'
        )}"]`;
      } else {
        message = `Downloading All Surveys of Region "${region}"`;
        url += `?localGovernment=["${region.toUpperCase()}"]`;
      }
    } else if (
      status !== "none" &&
      status !== "all" &&
      (region == "all" || region === "none")
    ) {
      message = `Downloading Surveys of Status "${status}"`;
      url += `?status=["${status}"]`;
    } else if (status === "none" && region !== "all" && region !== "none") {
      if (selectedStations.length > 0) {
        message = `Downloading Surveys for the following stations: ${selectedStations.join(
          ", "
        )}`;
        url += `?localGovernment=["${region.toUpperCase()}"]&localStation=["${selectedStations.join(
          '","'
        )}"]`;
      } else {
        message = `Downloading Surveys of Region "${region}"`;
        url += `?localGovernment=["${region.toUpperCase()}"]`;
      }
    } else if (status !== "none" && region !== "all" && region !== "none") {
      if (selectedStations.length > 0) {
        message = `Downloading all ${status} Surveys for ${region} stations: ${selectedStations.join(
          ", "
        )}`;
        url += `?status=["${status}"]&localGovernment=["${region.toUpperCase()}"]&localStation=["${selectedStations.join(
          '","'
        )}"]`;
      } else {
        message = `Downloading all ${status} Surveys of Region "${region}"`;
        url += `?status=["${status}"]&localGovernment=["${region.toUpperCase()}"]`;
      }
    }

    setInfo(message);

    const myHeader = new Headers();
    myHeader.append("Authorization", `Bearer ${user.token}`);

    try {
      const response = await fetch(url, {
        headers: myHeader,
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message);
      } else {
        const disposition = response.headers.get("Content-Disposition");
        const rand = Math.floor(Math.random() * 443930120);
        const now = new Date().getTime();
        const fileName = disposition
          ? disposition.split("filename=")[1].replace(/['"]/g, "")
          : `${rand}_${now}.xlsx`;
        const blob = await response.blob();

        const downloadLink = document.createElement("a");
        const url = window.URL.createObjectURL(blob);
        downloadLink.href = url;
        downloadLink.download = fileName;

        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);

        window.URL.revokeObjectURL(url);

        setSuccess("Download successful");
      }
    } catch (error) {
      setError("An error occurred while downloading the file");
    } finally {
      setLoading(false);
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
  }, [error, success, info, station]);

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Preloader isVisible={isLoading} />
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
                  defaultValue={null}
                >
                  <option value={"none"}>None</option>
                  <option value="completed">Completed</option>
                  <option value="pending">Pending</option>
                  <option value="rejected">Rejected</option>
                  <option value="all">All</option>
                </select>
              </div>

              <div className="h-auto px-4 py-1 block">
                <label htmlFor="region" className="text-gray-900 font-medium">
                  Choose LGA
                </label>
                <select
                  name="region"
                  id="region"
                  className="bg-white px-4 py-3 outline-none  focus:outline-none border-2 border-slate-200 w-full mt-2"
                  defaultValue={"none"}
                  onChange={handleLGAChange}
                >
                  <option value="none">None</option>
                  <option value="all">All</option>
                  <option value="alimosho">ALIMOSHO</option>
                  <option value="ikorodu">IKORODU</option>
                </select>
              </div>

              {station && (
                <div className="h-auto px-4 py-1 block">
                  <p className="text-gray-900 font-medium">
                    Choose Local Station
                  </p>

                  <div className="station-input flex flex-col">
                    {stationsSet[station].map((_ls, index) => (
                      <label
                        key={index}
                        className="px-2 py-2 flex flex-row gap-x-3"
                      >
                        <input
                          type="checkbox"
                          name={`${station}-station`}
                          id={`${_ls}-station`}
                          value={_ls}
                          onChange={handleStationSelected}
                          checked={selectedStations.includes(_ls)}
                          className="p-3"
                        />
                        <label
                          htmlFor={`${_ls}-station`}
                          className="text-gray-600 text-sm"
                        >
                          {_ls.replace("-", " ")}
                        </label>
                      </label>
                    ))}
                    <label className="px-2 py-2 flex flex-row gap-x-3">
                      <input
                        type="checkbox"
                        name={`${station}-station`}
                        id={`all-stations`}
                        value={`all-stations`}
                        onChange={handleStationSelected} // Use onChange here
                        checked={
                          selectedStations.length ===
                          stationsSet[station].length
                        }
                        className="p-3"
                      />

                      <label
                        htmlFor={`all-stations`}
                        className="text-gray-600 text-sm"
                      >
                        All Stations
                      </label>
                    </label>
                  </div>
                </div>
              )}

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
