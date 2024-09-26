import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "@mui/material";
import { ImSpinner9 } from "react-icons/im";
import unicef_logo from "../../assets/unicef.png";
import oxford_logo from "../../assets/oxford.png";
import { FaRegEye, FaEyeSlash } from "react-icons/fa";
import ErrorToast from "../Alerts/ErrorToast";
import SuccessToast from "../Alerts/SuccessToast";

const ForgotPassword = () => {
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setErrorActive(true);
      const timer = setTimeout(() => {
        setErrorActive(false);
      }, 2000);
      return () => clearTimeout(timer);
    }

    if (success) {
      setSuccessActive(true);
      const timer = setTimeout(() => {
        setSuccessActive(false);
      }, 2000);
      //   const redirect = setTimeout(() => {
      //     navigate("/admin/dashboard");
      //   }, 2002);
      return () => {
        clearTimeout(timer);
        // clearTimeout(redirect);
      };
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setIsLoading(true);

    const email = document.forms["OtpForm"]["email"].value;

    if (
      email == "" ||
      email == null ||
      email.trim() == null ||
      email.trim() == ""
    ) {
      setError("Enter email!");
      setIsLoading(false);

      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const reqBody = JSON.stringify({
      email,
    });

    const response = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/auth/reset-password/initiate",
      {
        method: "POST",
        headers: myHeaders,
        body: reqBody,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.message);
      setIsLoading(false);
    } else {
      setSuccess(data.message);
      setIsLoading(false);
      setTimeout(() => {
        navigate(`/admin/reset-password?email=${email}`);
      }, 1000);
    }
  };

  return (
    <>
      <div className="login-container">
        <div className="wrapper">
          <section className="bg-gray-50 ">
            <ErrorToast message={error} isActive={isErrorActive} />
            <SuccessToast message={success} isActive={isSuccessActive} />
            <div className="flex w-full h-screen flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <Link
                to="#"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 "
              >
                <img className="w-20 h-20 mr-2" src={logo} alt="logo" />
                ONT SURVEY
              </Link>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  mb-3">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Reset Password
                  </h1>

                  <div className="block float-right">
                    <Link
                      to={"/admin/login"}
                      className="text-sm lowercase text-blue-500"
                    >
                      login
                    </Link>
                  </div>
                  <form
                    className="space-y-4 md:space-y-6"
                    action=""
                    onSubmit={handleSubmit}
                    name="OtpForm"
                  >
                    <div>
                      <label
                        htmlFor="email"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Your email
                      </label>
                      <input
                        type="email"
                        name="email"
                        id="email"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        placeholder="name@company.com"
                        autoComplete="email"
                        required=""
                      />
                    </div>

                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="w-full text-white bg-blue-600 hover:bg-blue-700  font-medium rounded-lg text-sm px-5 py-1 text-center "
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="spinner text-xl py-1">
                          <ImSpinner9 />
                        </span>
                      ) : (
                        "Send Code"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
