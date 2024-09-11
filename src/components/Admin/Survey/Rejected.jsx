import React, { useEffect, useState } from "react";
import { ErrorToast, Loader, SideBar, SuccessToast } from "../index";
import { MdOutlineRestorePage } from "react-icons/md";
import { IoMdCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";
import Search from "./Search";
import useGetRespondents from "../Api/Respondents";
import TableSkeleton from "../../Skeleton/TableSkeleton";
import useGetRespondentByPhone from "../Api/PhoneRespondent";
import { Button } from "@mui/material";
import { useAuthContext } from "../../../hooks/useAuthContext";
import Preloader from "../Widgets/Preloader";

const getSearchValue = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || null;
};

const Rejected = () => {
  const { user } = useAuthContext();
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [respondentByPhone, setRespondentByPhone] = useState(null);
  const [respondents, setRespondents] = useState(null);
  const { loadingGetRespondents, getRespondents } = useGetRespondents();
  const { loadingPhoneRespondents, errorPhone, getPhoneRespondent } =
    useGetRespondentByPhone(getSearchValue(), "rejected");
  const [reinstateActive, setReinstateActive] = useState(false);
  const [phone, setPhone] = useState("");
  const [restoreLoading, setRestoreLoading] = useState(false);

  const handleRestoreSubmit = async (e) => {
    if (e.target.checkValidity()) {
      e.preventDefault();

      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${user.token}`);

      const form = e.target;
      const reason = form.reason.value;
      const status = "approve";

      if (phone == "" || phone == null) {
        setError("Phone is  invalid");
        return;
      }

      if (reason == "" || reason == null) {
        setError("Please give a reason");
        return;
      }

      setRestoreLoading(true);

      const reqBody = JSON.stringify({
        phone,
        status,
        reason,
      });

      const response = await fetch(
        "https://ont-survey-tracker-development.up.railway.app/v1/surveys/status",
        {
          method: "PATCH",
          headers: myHeaders,
          body: reqBody,
        }
      );

      const data = await response.json();

      if (!response.ok) {
        if (data.error?.message) {
          setRestoreLoading(false);
          setError(data.error.message);
        } else {
          setRestoreLoading(false);
          setError(data.message);
        }
      } else if (data.data?.surveyResponse) {
        const errors = data.data.surveyResponse
          .flat()
          .map((res) => res.error)
          .join(", ");
        setError(errors);

        setTimeout(() => {
          setRestoreLoading(false);
        }, 2800);

        setTimeout(() => {
          window.location.reload();
        }, 3000);
      } else {
        setSuccess(data.message);
        form.reason.value = "";
        setTimeout(() => {
          setRestoreLoading(false);
        }, 700);

        setTimeout(() => {
          window.location.href = "/admin/survey/pending"; // Navigate and refresh
        }, 1000);
      }
    }
  };

  useEffect(() => {
    function handleClickOutside(e) {
      const reinstateForm = document.querySelector(".reinstate-form");
      const restoreBtns = document.querySelectorAll(".restore-btn");

      const isClickOutsideForm =
        reinstateForm && !reinstateForm.contains(e.target);
      const isClickOutsideBtns = [...restoreBtns].every(
        (btn) => !btn.contains(e.target)
      );

      if (isClickOutsideForm && isClickOutsideBtns) {
        setReinstateActive(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchRespondents = async () => {
      if (getSearchValue() == null) {
        setRespondents(null);
        const { pagination, filteredRespondents } = await getRespondents(
          "rejected"
        );
        setRespondents(filteredRespondents);
      } else {
        setRespondents(null);
        const { pagination, filteredRespondents } = await getPhoneRespondent();
        setError(errorPhone);
        setRespondentByPhone(filteredRespondents);
      }
    };
    fetchRespondents();
  }, []);

  useEffect(() => {
    if (error) {
      setErrorActive(true);
      const timer = setTimeout(() => {
        setErrorActive(false);
        setError(null);
      }, 3000);
      return () => clearTimeout(timer);
    }

    if (success) {
      setSuccessActive(true);
      const timer = setTimeout(() => {
        setSuccessActive(false);
        setSuccess(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success]);

  return (
    <>
      <Preloader isVisible={restoreLoading} />
      <SideBar />
      <div
        className={`reinstate-form-container ${
          reinstateActive ? "flex" : "hidden"
        }`}
      >
        <form
          name="reinstate-form"
          className="px-9 py-12 rounded-md"
          onSubmit={handleRestoreSubmit}
        >
          <span
            className="cursor-pointer absolute top-4 right-2 p-2 text-red-800 font-semibold text-2xl"
            onClick={() => setReinstateActive(false)}
          >
            <IoMdCloseCircle />
          </span>

          <label className="flex flex-col gap-y-7">
            <label
              htmlFor="reason"
              className="text-gray-700 uppercase font-bold text-lg text-center"
            >
              Give a Reason
            </label>
            <textarea
              name="reason"
              id="reason"
              placeholder="write here..."
              className="bg-transparent outline-none border-2 border-blue-400 focus:outline-blue-600 focus:border-none"
              required={true}
            ></textarea>
          </label>

          <div className="mt-7 float-right">
            <Button
              variant="contained"
              color="success"
              className="flex flex-row gap-x-1 place-items-center"
              type="submit"
            >
              <MdOutlineRestorePage />
              Restore
            </Button>
          </div>
        </form>
      </div>
      <div className="elements-container mt-14">
        <ErrorToast isActive={isErrorActive} message={error} />
        <SuccessToast isActive={isSuccessActive} message={success} />
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between">
          <span className="font-bold text-lg text-gray-900">
            Rejected Surveys
          </span>
          <span>
            ONT&nbsp;/&nbsp;Survey&nbsp;/
            <Link to={"/admin/survey/pending"} className=" text-red-700">
              &nbsp;Rejected
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <Search page="rejected" />
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7 xl:pb-6">
            <div className="flex flex-col">
              <div className="grid grid-cols-3 rounded-sm bg-gray-2 dark:bg-meta-4 sm:grid-cols-5 bg-slate-200">
                <div className="p-2 xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    ID
                  </h5>
                </div>

                <div className="p-2 xl:p-5 hidden md:block">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    Respondent
                  </h5>
                </div>

                <div className="p-2 xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    Phone
                  </h5>
                </div>

                <div className="p-2 xl:p-5 hidden md:block">
                  <h5 className="text-sm font-medium text-center uppercase sm:text-base text-stone-900">
                    Gender
                  </h5>
                </div>

                <div className="p-2 xl:p-5">
                  <h5 className="text-sm text-center  font-medium uppercase sm:text-base text-stone-900">
                    Actions
                  </h5>
                </div>
              </div>

              {!errorPhone &&
                !respondentByPhone &&
                !loadingPhoneRespondents && (
                  <>
                    {respondents && respondents.length > 0 ? (
                      respondents.filter((data) => data !== null).length > 0 ? (
                        respondents.map((data, index) => {
                          if (!data) {
                            return null;
                          }
                          const status = data.survey.status;
                          return (
                            <div
                              className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0"
                              key={index}
                            >
                              <div className="flex items-center p-2 xl:p-5">
                                <p className="font-medium text-gray-800 ">
                                  {index + 1}
                                </p>
                              </div>

                              <div className="hidden md:flex items-center p-2 xl:p-5">
                                <p className="font-medium text-gray-800 ">
                                  {data.respondent.firstname}
                                </p>
                              </div>

                              <div className="flex items-center p-2 xl:p-5">
                                <p className="font-medium text-gray-800 ">
                                  {data.respondent.phone}
                                </p>
                              </div>

                              <div className="hidden md:flex justify-center items-center p-2 xl:p-5">
                                <p className="font-medium text-gray-800 ">
                                  {data.respondent.gender}
                                </p>
                              </div>

                              <div className="flex items-center py-2 px-4 flex-row gap-x-3 xl:p-5  justify-center  relative">
                                <ul>
                                  <li
                                    className="border-b-2 border-slate-100 p-2 hover:bg-slate-50 rounded-sm text-xs md:text-base flex flex-row gap-x-1 place-items-center text-green-600 restore-btn"
                                    onClick={() => {
                                      setReinstateActive(true);
                                      setPhone(`${data.respondent.phone}`);
                                    }}
                                  >
                                    <MdOutlineRestorePage />{" "}
                                    <button>Restore</button>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex border-b border-stroke text-red-800 justify-center text-base dark:border-stone-600 py-3">
                          No Rejected Respondents Available
                        </div>
                      )
                    ) : loadingGetRespondents ? (
                      <TableSkeleton count={5} />
                    ) : (
                      <div className="flex border-b border-stroke text-red-800 justify-center text-base dark:border-stone-600 py-3">
                        No Rejected Respondents Available
                      </div>
                    )}
                  </>
                )}

              {errorPhone && (
                <div className="flex flex-row border-b border-stroke dark:border-stone-600 text-red-600 justify-center py-3 text-xs sm:text-base">
                  Phone &nbsp;
                  <span className="font-bold">{getSearchValue()}</span>&nbsp;not
                  found in rejected surveys
                </div>
              )}

              {loadingPhoneRespondents && (
                <>
                  <TableSkeleton count={10} />
                </>
              )}

              {respondentByPhone && (
                <>
                  <div className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0">
                    <div className="flex items-center p-2 xl:p-5">
                      <p className="font-medium text-gray-800 ">1.</p>
                    </div>

                    <div className="hidden md:flex items-center p-2 xl:p-5">
                      <p className="font-medium text-gray-800 ">
                        {respondentByPhone.respondent.firstname}
                      </p>
                    </div>

                    <div className="flex items-center p-2 xl:p-5">
                      <p className="font-medium text-gray-800 ">
                        {respondentByPhone.respondent.phone}
                      </p>
                    </div>

                    <div className="hidden md:flex justify-center items-center p-2 xl:p-5">
                      <p className="font-medium text-gray-800 ">
                        {respondentByPhone.respondent.gender}
                      </p>
                    </div>

                    <div className="flex items-center py-2 px-4 flex-row gap-x-3 xl:p-5  justify-center  relative">
                      <ul>
                        <li
                          className="border-b-2 border-slate-100 p-2 hover:bg-slate-50 rounded-sm text-xs md:text-base flex flex-row gap-x-1 place-items-center text-green-600 restore-btn"
                          onClick={() => {
                            setReinstateActive(true);
                            setPhone(`${data.respondent.phone}`);
                          }}
                        ></li>
                      </ul>
                    </div>
                  </div>

                  <div className="flex flex-row gap-x-3 gap-y-2 py-3 place-items-center">
                    <div className="font-medium text-xs text-stone-800">
                      Showing search result for respondent:{" "}
                    </div>
                    <div className="font-bold">
                      <span className="text-primary-600 text-base">
                        {getSearchValue()}
                      </span>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* <div className="table-pagination pb-4 pt-6 flex flex-row justify-between gap-x-2 place-items-center">
              <p className="text-gray-700">Showing 1-1 of 25</p>
              <nav>
                <ul className="flex items-center gap-x-2 h-8 text-sm">
                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
                    >
                      <span className="sr-only">Previous</span>
                      <GrFormPrevious />
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
                    >
                      <span className="sr-only">Next</span>

                      <GrFormNext />
                    </a>
                  </li>
                </ul>
              </nav>
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Rejected;
