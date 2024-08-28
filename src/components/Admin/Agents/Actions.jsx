import React, { useState, useEffect } from "react";
import { FiSearch } from "react-icons/fi";
import { Button } from "@mui/material";
import { MdFormatListBulletedAdd } from "react-icons/md";
import { PiUserCirclePlusDuotone } from "react-icons/pi";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { BsSend } from "react-icons/bs";
import { ImSpinner3 } from "react-icons/im";
import ErrorToast from "../../Alerts/ErrorToast";
import SuccessToast from "../../Alerts/SuccessToast";
import { useAuthContext } from "../../../hooks/useAuthContext";

const Actions = () => {
  const { user } = useAuthContext();
  const showNewSurveyForm = (e) => {
    document.querySelector(".new-survey-form").classList.remove("hidden");
  };
  window.addEventListener("click", function (e) {
    if (e.target == document.querySelector(".new-survey-form")) {
      document.querySelector(".new-survey-form").classList.add("hidden");
    }
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuccess(null);

    const email = document.forms["invite_form"]["email"].value;
    const firstname = document.forms["invite_form"]["firstname"].value;
    const lastname = document.forms["invite_form"]["lastname"].value;
    const role = document.forms["invite_form"]["role"].value;
    const password = document.forms["invite_form"]["password"].value;

    const data = JSON.stringify({ email, firstname, lastname, role, password });

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${user.token}`);

    const response = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/admin/create",
      {
        method: "POST",
        headers: myHeaders,
        body: data,
      }
    );

    const result = await response.json();
    if (!response.ok) {
      setError(result.message);
      setIsLoading(false);
    } else {
      if (role === "admin") {
        setSuccess("New admin has been created...");
      } else if (role === "call-center") {
        setSuccess("New  call center agent created...");
      }

      localStorage.setItem(
        "passwordResetToken",
        result.data.admin.passwordResetToken
      );
      localStorage.setItem(
        "passwordResetTokenExpiry",
        result.data.admin.passwordResetTokenExpiry
      );

      setIsLoading(false);
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
  }, [error, success]);

  const generatePassword = () => {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?";
    const passwordLength = 12;
    let password = "";
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      password += chars[randomIndex];
    }
    return password;
  };

  return (
    <>
      <div className="flex justify-end p-3 flex-row gap-x-2">
        <ErrorToast isActive={isErrorActive} message={error} />
        <SuccessToast message={success} isActive={isSuccessActive} />
        <Button
          variant="outlined"
          color="primary"
          className="flex flex-row gap-x-2"
          onClick={showNewSurveyForm}
        >
          <span className="hidden md:block text-base">New Agent</span>
          <PiUserCirclePlusDuotone className="text-blue-700 text-2xl" />
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
                placeholder="Search by email"
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
      <div className="new-survey-form  hidden">
        <div className="new-form flex items-center justify-center px-6 py-8 mx-auto md:h-screen min-w-96 lg:py-0">
          <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700 min-w-96">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account for agent
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                method="POST"
                onSubmit={handleSubmit}
                name="invite_form"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="firstname"
                    className="block mb-2 text-sm fsont-medium text-white"
                  >
                    Firstname
                  </label>
                  <input
                    type="text"
                    name="firstname"
                    id="firstname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="firstname"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="lastname"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Lastname
                  </label>
                  <input
                    type="text"
                    name="lastname"
                    id="lastname"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="lastname"
                    required=""
                  />
                </div>
                <div>
                  <label
                    htmlFor="Role"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Role
                  </label>
                  <select
                    name="role"
                    id="role"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    required=""
                  >
                    <option value="admin">Admin</option>
                    <option value="call-center">Call Center Agent</option>
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-white"
                  >
                    Password
                  </label>
                  <div className="flex items-center">
                    <div className="relative w-full">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="password"
                        autoComplete="suggest-password"
                        required
                      />

                      <span
                        className="absolute top-2 right-px px-2 py-px text-gray-300 text-2xl cursor-pointer eye-icon"
                        onClick={(e) => {
                          setShowPassword(!showPassword);
                        }}
                      >
                        {!showPassword ? <IoEyeOutline /> : <IoEyeOffOutline />}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const generatedPassword = generatePassword();
                        document.getElementById("password").value =
                          generatedPassword;
                      }}
                      className="ml-2 bg-blue-600 text-white text-xs rounded-lg px-2.5 py-3 hover:bg-blue-700"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="w-full text-white bg-primary-600 hover:bg-primary-700 0 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  disabled={isLoading}
                >
                  {!isLoading ? (
                    <span className="flex flex-row gap-x-2 place-items-center">
                      Send Invite <BsSend color="#fff" />
                    </span>
                  ) : (
                    <span className="spinner py-3">
                      <ImSpinner3 color="#fff" />
                    </span>
                  )}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Actions;
