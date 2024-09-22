import React, { useEffect, useState } from "react";
import { ErrorToast, Loader, SideBar, SuccessToast } from "../index";
import { Link } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoTrashOutline } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";
import Actions from "./Actions";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TableSkeleton from "../../Skeleton/TableSkeleton";
import { IoMdCloseCircle } from "react-icons/io";
import { MdLockReset } from "react-icons/md";
import { Button } from "@mui/material";
import Preloader from "../Widgets/Preloader";

const getSearchValue = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("email") || null;
};

const Agents = () => {
  const [userList, setUserList] = useState(null);
  const { user } = useAuthContext();
  const [searchEmail, setSearchEmail] = useState(getSearchValue());
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);

  let id = 1;

  const showPasswordForm = (e) => {
    document
      .querySelector(".passwordChange-container")
      .classList.remove("hidden");
  };
  window.addEventListener("click", function (e) {
    if (e.target == document.querySelector(".passwordChange-container")) {
      document
        .querySelector(".passwordChange-container")
        .classList.add("hidden");

      const form = document.forms["resetForm"];
      form.password.value = "";
      form.password_confirmation.value = "";
    }
  });

  useEffect(() => {
    const getList = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${user.token}`);

      let url = "";

      if (searchEmail != null) {
        url = `https://ont-survey-tracker-development.up.railway.app/v1/admins?email=${searchEmail}`;
      } else {
        url = `https://ont-survey-tracker-development.up.railway.app/v1/admins`;
      }
      const response = await fetch(url, {
        method: "GET",
        headers: myHeaders,
      });

      await response.json().then((data) => {
        setUserList(data.data.admins);
      });
    };

    getList();
  }, [user.token]);

  const handleSubmit = async (e) => {
    if (e.target.checkValidity()) {
      e.preventDefault();

      const form = document.forms["resetForm"];
      const password = form.password.value;
      const password_confirmation = form.password_confirmation.value;
      const email = form.email.value;

      if (email == "" || email == null) {
        setError("Invalid email address");
        return;
      }

      if (password == "" || password == null) {
        setError("Enter password!");
        return;
      }

      if (password_confirmation == "" || password_confirmation == null) {
        setError("Re-enter password!");
        return;
      }

      if (password != password_confirmation) {
        setError("Passwords do not match");
        return;
      }

      setLoading(true);

      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${user.token}`);
      myHeaders.append("Content-Type", `application/json`);

      const reqBody = JSON.stringify({
        email,
        password,
      });

      const response = await fetch(
        "https://ont-survey-tracker-development.up.railway.app/v1/auth/call-center/update-password",
        {
          method: "POST",
          headers: myHeaders,
          body: reqBody,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setError(data.message);
        setLoading(false);
        return;
      } else {
        setSuccess("Password reset successfull");
        setLoading(false);
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
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
  return (
    <>
      <SideBar />
      <Preloader isVisible={loading} />
      <ErrorToast isActive={isErrorActive} message={error} />
      <SuccessToast isActive={isSuccessActive} message={success} />
      <Loader />
      <div className="elements-container mt-14">
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between ">
          <span className="font-bold text-lg text-gray-900">Agents</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/agents"} className="text-blue-500">
              Agents
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <Actions />
          <div
            className={`passwordChange-container hidden
            `}
          >
            <form
              name="resetForm"
              className="bg-white relative py-6 px-2 rounded-md"
              onSubmit={handleSubmit}
            >
              <span
                className="absolute top-1 p-2 right-1 text-red-600 text-xl cursor-pointer"
                onClick={() => {
                  document
                    .querySelector(".passwordChange-container")
                    .classList.add("hidden");

                  const form = document.forms["resetForm"];
                  form.password.value = "";
                  form.password_confirmation.value = "";
                }}
              >
                <IoMdCloseCircle />
              </span>

              <h3 className="text-blue-600 font-semibold text-center">
                Reset Password
              </h3>

              <label className="flex flex-col gap-y-2 px-4 my-4">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="focus:outline-none outline-none  p-2"
                  name="email"
                  disabled
                  value={email || ""}
                />
              </label>

              <label className="flex flex-col gap-y-2 px-4 my-4">
                <label htmlFor="password">New Password</label>
                <input
                  type="password"
                  className="focus:outline-none outline-none  p-2"
                  name="password"
                  autoComplete="new-password"
                />
              </label>

              <label className="flex flex-col gap-y-2 px-4 my-4">
                <label htmlFor="password_confirmation">Confirm Password</label>
                <input
                  type="password"
                  className="focus:outline-none outline-none  p-2"
                  name="password_confirmation"
                  autoComplete="new-password"
                />
              </label>

              <div className="w-full py-2 px-4 block">
                <Button
                  variant="contained"
                  color="primary"
                  type="submit"
                  className="float-right flex flex-row- gap-x-2 place-items-center"
                >
                  <MdLockReset />
                  <span>Reset</span>
                </Button>
              </div>
            </form>
          </div>
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-6">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-6 bg-slate-200">
                <div className="p-2 xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    ID
                  </h5>
                </div>

                <div className="p-2 xl:p-5 hidden md:block">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    Firstname
                  </h5>
                </div>

                <div className="p-2 xl:p-5 hidden md:block">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    Lastname
                  </h5>
                </div>

                <div className="p-2 xl:p-5 ">
                  <h5 className="text-sm font-medium text-center uppercase sm:text-base text-stone-900">
                    Email
                  </h5>
                </div>

                <div className="p-2 xl:p-5 hidden md:block">
                  <h5 className="text-sm font-medium text-center uppercase sm:text-base text-stone-900">
                    Role
                  </h5>
                </div>

                <div className="p-2 xl:p-5 ">
                  <h5 className="text-sm font-medium text-center uppercase sm:text-base text-stone-900">
                    Action
                  </h5>
                </div>
              </div>

              {userList ? (
                userList.map((user, index) => {
                  if (user.type == "respondent") return false;

                  return (
                    <div
                      className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-6 py-3 md:py-0"
                      key={index}
                    >
                      <div className="flex items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800 ">{id++}.</p>
                      </div>

                      <div className="hidden md:flex  items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800 capitalize">
                          {user.firstname}
                        </p>
                      </div>

                      <div className="hidden md:flex  items-center p-2 xl:p-5 text-base">
                        <p className="font-medium text-gray-800 capitalize">
                          {user.lastname}
                        </p>
                      </div>

                      <div className="items-center justify-center p-2 xl:p-5 flex">
                        <p className="font-medium text-gray-800 text-xs">
                          {user.email}
                        </p>
                      </div>

                      <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                        <p className="font-medium text-gray-600 text-sm capitalize">
                          {user.type.replace("-", " ")}
                        </p>
                      </div>

                      <div className="flex-row gap-x-2 items-center justify-center p-1 xl:p-5 flex">
                        <span
                          className="text-blue-700 p-2 bg-slate-200 rounded-full text-base md:text-lg cursor-pointer hover:bg-slate-100"
                          title="edit user"
                          onClick={() => {
                            showPasswordForm();
                            setEmail(user.email);
                          }}
                        >
                          <TbPencilCog />
                        </span>
                      </div>
                    </div>
                  );
                })
              ) : (
                <TableSkeleton count={5} />
              )}

              {userList && searchEmail && (
                <div className="w-full p-2 text-xs flex place-self-center">
                  Showing search results for email:&nbsp;
                  <span className="text-blue-700">{searchEmail}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agents;
