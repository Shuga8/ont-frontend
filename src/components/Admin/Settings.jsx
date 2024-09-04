import React, { useState, useEffect } from "react";
import { ErrorToast, InfoToast, Loader, SideBar, SuccessToast } from "./index";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { RiSave3Line } from "react-icons/ri";
import { useAuthContext } from "../../hooks/useAuthContext";
import { CgSpinner } from "react-icons/cg";

const Settings = () => {
  const { user } = useAuthContext();
  const [isOtherFormVIsible, setOtherFormVisible] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [isInfoActive, setInfoActive] = useState(false);
  const [isPassLoading, setPassLoading] = useState(false);
  const [isDetailsLoading, setDetailsLoading] = useState(false);

  const fname = user.user.firstname;
  const lname = user.user.lastname;

  const handleSubmit = async (e) => {
    if (e.target.checkValidity()) {
      e.preventDefault();
      setDetailsLoading(true);
      setInfo(null);
      setError(null);
      setSuccess(null);

      const f_name = document.forms["details_form"]["firstname"];
      const l_name = document.forms["details_form"]["lastname"];

      const firstname = f_name.value;
      const lastname = l_name.value;

      const reqBody = JSON.stringify({ firstname, lastname });
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${user.token}`);

      const response = await fetch(
        "https://ont-survey-tracker-development.up.railway.app/v1/admins/update",
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error.message) {
          setError(data.error.message);
          let recommendedtActions = data.error.recommendedActions;
          if (recommendedtActions.length > 0) {
            let timer = 1000;
            for (let i = 0; i < recommendedtActions.length; i++) {
              setTimeout(() => {
                setInfoActive(false);
                setInfo(null);
                setInfo(recommendedtActions[i]);
              }, timer);
              timer += 5000;
            }
          }
        } else {
          setError(data.error);
        }
      } else {
        setSuccess(
          "Details Updated Successfully, login again to complete changes!"
        );
      }

      setDetailsLoading(false);
    }
  };

  const handlePasswordSubmit = async (e) => {
    if (e.target.checkValidity()) {
      e.preventDefault();
      setPassLoading(true);
      setInfo(null);
      setError(null);
      setSuccess(null);

      const old = document.forms["passForm"]["password"];
      const confirm = document.forms["passForm"]["password_confirmation"];

      const oldPassword = old.value;
      const password = confirm.value;

      const reqBody = JSON.stringify({ oldPassword, password });

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${user.token}`);

      const response = await fetch(
        "https://ont-survey-tracker-development.up.railway.app/v1/auth/update-password",
        {
          method: "POST",
          headers: myHeaders,
          body: reqBody,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.error.message);
        let recommendedtActions = data.error.recommendedActions;
        if (recommendedtActions.length > 0) {
          let timer = 1000;
          for (let i = 0; i < recommendedtActions.length; i++) {
            setTimeout(() => {
              setInfoActive(false);
              setInfo(null);
              setInfo(recommendedtActions[i]);
            }, timer);
            timer += 5000;
          }
        }
      } else {
        setSuccess("Password successfully changed...");
        old.value = "";
        confirm.value = "";
      }

      setPassLoading(false);
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
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between ">
          <span className="font-bold text-lg text-gray-900">Settings</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/settings"} className="underline text-blue-500">
              Settings
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default sm:px-7 xl:pb-6">
            <h3 className="text-black font-semibold text-xl mb-4">
              User Settings
            </h3>
            <div
              className={`user-form ${isOtherFormVIsible ? "hidden" : "block"}`}
            >
              <form
                action=""
                method=""
                onSubmit={handleSubmit}
                className="w-full"
                name="details_form"
              >
                <label className="block">
                  <label htmlFor="email" className="text-gray-900">
                    Email{" "}
                    <span className="text-xs text-red-800">
                      (Email cannot be changed)
                    </span>
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email address "
                    defaultValue={user.user.email}
                    required={true}
                    disabled={true}
                  />
                </label>

                <label className="block">
                  <label htmlFor="firstname" className="text-gray-900">
                    Firstname{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="firstname"
                    defaultValue={fname}
                    required={true}
                  />
                </label>

                <label className="block">
                  <label htmlFor="lastname" className="text-gray-900">
                    Lastname{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="lastname"
                    defaultValue={lname}
                    required={true}
                  />
                </label>

                <div className="actions my-3 flex flex-row gap-x-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={isDetailsLoading}
                    className="text-xs"
                  >
                    {isDetailsLoading ? (
                      <span className="px-3 py-1 md:px-4  spinner text-white">
                        <CgSpinner />
                      </span>
                    ) : (
                      <span className="flex flex-row gap-x-2 text-xs place-items-center">
                        <RiSave3Line className="text-white" /> <span>Save</span>
                      </span>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      setOtherFormVisible(true);
                    }}
                  >
                    Change Password
                  </Button>
                </div>
              </form>
            </div>

            <div
              className={`password-form ${
                isOtherFormVIsible ? "block" : "hidden"
              }`}
            >
              <form
                action=""
                method=""
                onSubmit={handlePasswordSubmit}
                className="w-full"
                name="passForm"
              >
                <label className="block">
                  <label htmlFor="password" className="text-gray-900">
                    Old Password{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="***********"
                    autoComplete="current-pasword"
                    required={true}
                  />
                </label>
                <label className="block">
                  <label
                    htmlFor="password_confirmation"
                    className="text-gray-900"
                  >
                    New Password{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="***********"
                    autoComplete="current-pasword"
                    required={true}
                  />
                </label>

                <div className="actions my-3 flex flex-row gap-x-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    disabled={isPassLoading}
                    className="text-xs"
                  >
                    {isPassLoading ? (
                      <span className="px-3 py-1 md:px-4  spinner text-white">
                        <CgSpinner />
                      </span>
                    ) : (
                      <span className="flex flex-row gap-x-2 text-xs place-items-center">
                        <RiSave3Line className="text-white" /> <span>Save</span>
                      </span>
                    )}
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      setOtherFormVisible(false);
                    }}
                    className="text-sm"
                  >
                    Change User Details
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
