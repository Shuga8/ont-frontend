import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { Button } from "@mui/material";
import { ImSpinner9 } from "react-icons/im";
import glo_logo from "../../assets/glo.png";
import oxford_logo from "../../assets/oxford.png";
import { useLogin } from "../../hooks/useLogin";
import ErrorToast from "../Alerts/ErrorToast";
import SuccessToast from "../Alerts/SuccessToast";

const Login = () => {
  const { login, isLoading, error, success } = useLogin();
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    let email = document.forms["login"]["email"].value;
    let pass = document.forms["login"]["password"].value;

    await login(email, pass);
  };

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
      return () => clearTimeout(timer);
    }
  }, [error, success]);

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
                <img className="w-8 h-8 mr-2" src={logo} alt="logo" />
                UNICEF SURVEY
              </Link>
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0  mb-3">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                    Sign in to your account
                  </h1>
                  <form
                    className="space-y-4 md:space-y-6"
                    action=""
                    onSubmit={handleSubmit}
                    name="login"
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
                    <div>
                      <label
                        htmlFor="password"
                        className="block mb-2 text-sm font-medium text-gray-900 "
                      >
                        Password
                      </label>
                      <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="••••••••"
                        className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-600 focus:border-blue-600 block w-full p-2.5 "
                        autoComplete="current-password"
                        required=""
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-start">
                        <div className="flex items-center h-5">
                          <input
                            id="remember"
                            aria-describedby="remember"
                            type="checkbox"
                            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 "
                            required=""
                          />
                        </div>
                        <div className="ml-3 text-sm">
                          <label htmlFor="remember" className="text-gray-500 ">
                            Remember me
                          </label>
                        </div>
                      </div>
                      <Link
                        to="#"
                        className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
                      >
                        Forgot password?
                      </Link>
                    </div>
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      className="w-full text-white bg-blue-600 hover:bg-blue-700 e  font-medium rounded-lg text-sm px-5 py-4 text-center "
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <span className="spinner text-xl py-1">
                          <ImSpinner9 />
                        </span>
                      ) : (
                        "Sign in"
                      )}
                    </Button>
                  </form>
                </div>
              </div>
              <h4 className="text-gray-300 font-extrabold text-xl uppercase">
                Partners
              </h4>
              <div className="partners py-3 flex flex-row justify-center gap-x-4">
                <img className="w-20 h-20 mr-2" src={glo_logo} alt="GLO" />
                <img
                  className="w-20 h-20 mr-2 object-contain mix-blend-multiply"
                  src={oxford_logo}
                  alt="Oxford"
                />
              </div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default Login;
