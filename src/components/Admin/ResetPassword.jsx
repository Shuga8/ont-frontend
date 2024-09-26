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

const getEmail = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("email") || null;
};

const ResetPassword = () => {
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
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

    const email = document.forms["resetForm"]["email"].value;
    const password = document.forms["resetForm"]["password"].value;
    const token = document.forms["resetForm"]["otp"].value;

    if (
      email == "" ||
      email == null ||
      email.trim() == null ||
      email.trim() == ""
    ) {
      setError("Unauthorized access");
      setTimeout(() => {
        navigate("/admin/login");
      }, 1000);
      return;
    }

    if (
      token == "" ||
      token == null ||
      token.trim() == null ||
      token.trim() == ""
    ) {
      setError("Enter OTP recieved in email!");
      return;
    }

    if (
      password == "" ||
      password == null ||
      password.trim() == null ||
      password.trim() == ""
    ) {
      setError("Enter password!");
      return;
    }

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const reqBody = JSON.stringify({
      email,
      password,
      token,
    });

    const response = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/auth/reset-password",
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
      setSuccess("Password reset successfully, redirecting to login...");
      setIsLoading(false);
      setTimeout(() => {
        navigate(`/admin/login`);
      }, 2000);
    }
  };

  return (
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
                  name="resetForm"
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
                      defaultValue={getEmail()}
                      disabled={true}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="otp"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      OTP
                    </label>
                    <input
                      type="text"
                      name="otp"
                      id="otp"
                      className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                      autoComplete="code"
                      required=""
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 "
                    >
                      New Password
                    </label>
                    <div className="w-full relative">
                      <input
                        type={showPass ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5"
                        autoComplete="current-password"
                        required=""
                      />
                      <span
                        className="absolute px-3 top-3 right-0 text-blue-600 cursor-pointer text-lg"
                        onClick={() => setShowPass(!showPass)}
                      >
                        {!showPass ? <FaRegEye /> : <FaEyeSlash />}
                      </span>
                    </div>
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
  );
};

export default ResetPassword;
