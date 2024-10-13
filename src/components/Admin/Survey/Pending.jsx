import React, { useState, useEffect } from "react";
import { ErrorToast, Loader, SideBar } from "../index";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { GoTasklist } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import Search from "./Search";
import useGetRespondents from "../Api/Respondents";
import TableSkeleton from "../../Skeleton/TableSkeleton";
import useGetRespondentByPhone from "../Api/PhoneRespondent";

const getSearchValue = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || null;
};

const getPageValue = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("page") || null;
};

const Pending = () => {
  const [respondents, setRespondents] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [error, setError] = useState(null);
  const [respondentByPhone, setRespondentByPhone] = useState(null);
  const { loadingGetRespondents, getRespondents } = useGetRespondents();
  const { loadingPhoneRespondents, errorPhone, getPhoneRespondent } =
    useGetRespondentByPhone(getSearchValue(), "pending");
  const [pagination, setPagination] = useState(null);
  const [page, setPage] = useState(getPageValue());
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRespondents = async () => {
      if (getSearchValue() == null) {
        setRespondents(null);
        const { pagination, filteredRespondents } = await getRespondents(
          "pending",
          page
        );
        setRespondents(filteredRespondents);
        setPagination(pagination);
      } else {
        setRespondents(null);
        const { pagination, filteredRespondents } = await getPhoneRespondent();
        setRespondentByPhone(filteredRespondents);
        setPagination(pagination);
      }
    };
    fetchRespondents();
  }, [page]);

  useEffect(() => {
    if (error) {
      setErrorActive(true);
      const timer = setTimeout(() => {
        setErrorActive(false);
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handlePageChange = (page) => {
    const currentParams = new URLSearchParams(window.location.search);
    currentParams.set("page", page);
    navigate(`?${currentParams.toString()}`);
  };

  if (loadingPhoneRespondents || loadingGetRespondents) {
    return (
      <>
        <SideBar />
        <div className="elements-container mt-14">
          <ErrorToast isActive={isErrorActive} message={error} />
          <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between">
            <span className="font-bold text-lg text-gray-900">
              Pending Surveys
            </span>
            <span>
              ONT&nbsp;/&nbsp;Survey&nbsp;/
              <Link to={"/admin/survey/pending"} className=" text-yellow-600">
                &nbsp;Pending
              </Link>
            </span>
          </div>
          <div className="container-content  px-1 py-2 md:px-6 md:py-5">
            <Search page="pending" />
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

                  <div className="p-2 xl:p-5 text-center hidden md:block">
                    <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                      Gender
                    </h5>
                  </div>

                  <div className="p-2 xl:p-5 text-center">
                    <h5 className="text-sm text-center md:text-left  font-medium uppercase sm:text-base text-stone-900">
                      Actions
                    </h5>
                  </div>
                </div>

                <TableSkeleton count={6} />
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <ErrorToast isActive={isErrorActive} message={error} />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between">
          <span className="font-bold text-lg text-gray-900">
            Pending Surveys
          </span>
          <span>
            ONT&nbsp;/&nbsp;Survey&nbsp;/
            <Link to={"/admin/survey/pending"} className=" text-yellow-600">
              &nbsp;Pending
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <Search page="pending" />
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

                <div className="p-2 xl:p-5 text-center hidden md:block">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    Gender
                  </h5>
                </div>

                <div className="p-2 xl:p-5 text-center">
                  <h5 className="text-sm text-center md:text-left  font-medium uppercase sm:text-base text-stone-900">
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
                              key={index + 1}
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

                              <div className="flex items-center py-2 px-4 flex-row gap-x-3 xl:p-5  justify-center md:justify-normal">
                                <Link
                                  to={`/admin/survey/pending/complete?phone=${data.respondent.phone}`}
                                  className="font-medium text-blue-600 text-lg p-3 bg-gray-200 rounded-full hover:bg-slate-100"
                                  title="Complete Survey"
                                >
                                  <span>
                                    <GoTasklist />
                                  </span>
                                </Link>
                              </div>
                            </div>
                          );
                        })
                      ) : (
                        <div className="flex border-b border-stroke text-red-800 justify-center text-base dark:border-stone-600 py-3">
                          No Pending Respondents Available
                        </div>
                      )
                    ) : loadingGetRespondents ? (
                      <>
                        <TableSkeleton count={4} />
                      </>
                    ) : (
                      <div className="flex border-b border-stroke text-red-800 justify-center text-base dark:border-stone-600 py-3">
                        No Pending Respondents Available
                      </div>
                    )}
                  </>
                )}

              {errorPhone && (
                <div className="flex flex-row border-b border-stroke dark:border-stone-600 text-red-600 justify-center py-3 text-xs">
                  Phone &nbsp;
                  <span className="font-bold">{getSearchValue()}</span>&nbsp;not
                  found in pending surveys
                </div>
              )}

              {loadingPhoneRespondents && (
                <>
                  <TableSkeleton count={2} />
                </>
              )}

              {respondentByPhone &&
                respondentByPhone.map((res, resIndex) => {
                  let count = resIndex + 1;
                  return (
                    <>
                      <div
                        className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0"
                        key={resIndex}
                      >
                        <div className="flex items-center p-2 xl:p-5">
                          <p className="font-medium text-gray-800 ">{count}</p>
                        </div>

                        <div className="hidden md:flex items-center p-2 xl:p-5">
                          <p className="font-medium text-gray-800 ">
                            {res.respondent.firstname}
                          </p>
                        </div>

                        <div className="flex items-center p-2 xl:p-5">
                          <p className="font-medium text-gray-800 ">
                            {res.respondent.phone}
                          </p>
                        </div>

                        <div className="hidden md:flex justify-center items-center p-2 xl:p-5">
                          <p className="font-medium text-gray-800 ">
                            {res.respondent.gender}
                          </p>
                        </div>

                        <div className="flex items-center py-2 px-4 flex-row gap-x-3 xl:p-5  justify-center md:justify-normal">
                          <Link
                            to={`/admin/survey/pending/complete?phone=${res.respondent.phone}`}
                            className="font-medium text-blue-600 text-lg p-3 bg-gray-200 rounded-full hover:bg-slate-100"
                            title="Complete Survey"
                          >
                            <span>
                              <GoTasklist />
                            </span>
                          </Link>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>

            {respondentByPhone && (
              <div className="flex flex-row gap-x-3 gap-y-2 py-3 place-items-center">
                <div className="font-medium text-xs text-stone-800">
                  Showing search result for :{" "}
                </div>
                <div className="font-bold">
                  <span className="text-primary-600 text-base">
                    {getSearchValue()}
                  </span>
                </div>
              </div>
            )}

            {pagination && (
              <div className="table-pagination pb-4 pt-6 flex flex-row justify-between gap-x-2 place-items-center">
                <p className="text-gray-700">
                  Page <b>{pagination.page}</b> of{" "}
                  <b>{pagination.totalPages} </b> in {" ("}
                  {pagination.page != pagination.totalPages
                    ? respondents.length * pagination.page
                    : pagination.totalResults}{" "}
                  out of {pagination.totalResults}
                  {" )"} results
                </p>
                <nav>
                  <ul className="flex items-center gap-x-2 h-8 text-sm">
                    <li>
                      <Link
                        to={pagination.prevPage ?? "#"}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.prevPage) {
                            setPage(pagination.prev);
                            handlePageChange(pagination.prev);
                          }
                        }}
                      >
                        <span className="sr-only">Previous</span>
                        <GrFormPrevious />
                      </Link>
                    </li>

                    <li>
                      <Link
                        to={pagination.nextPage ?? "#"}
                        className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 hover:text-gray-700"
                        onClick={(e) => {
                          e.preventDefault();
                          if (pagination.nextPage) {
                            setPage(pagination.next);
                            handlePageChange(pagination.next);
                          }
                        }}
                      >
                        <span className="sr-only">Next</span>

                        <GrFormNext />
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pending;
