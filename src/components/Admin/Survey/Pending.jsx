import React, { useState, useEffect } from "react";
import { Loader, SideBar } from "../index";
import { IoTrashOutline } from "react-icons/io5";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { GoTasklist } from "react-icons/go";
import { Link } from "react-router-dom";
import Search from "./Search";
import useGetRespondents from "../Api/Respondents";

const getSearchValue = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("search") || null;
};

const Pending = () => {
  const [respondents, setRespondents] = useState(null);
  const { loadingGetRespondents, getRespondents } = useGetRespondents();

  useEffect(() => {
    const fetchRespondents = async () => {
      const { pagination, filteredRespondents } = await getRespondents(
        "pending"
      );
      setRespondents(filteredRespondents);
    };
    fetchRespondents();
  }, [getRespondents]);

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
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

                <div className="p-2 xl:p-5 hidden md:block">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    Gender
                  </h5>
                </div>

                <div className="p-2 xl:p-5">
                  <h5 className="text-sm text-center md:text-left  font-medium uppercase sm:text-base text-stone-900">
                    Actions
                  </h5>
                </div>
              </div>
              {respondents !== null ? (
                respondents.map((data, index) => {
                  if (!data || !data.survey || !data.respondent) {
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
                        <p className="font-medium text-gray-800 ">John Doe</p>
                      </div>

                      <div className="flex items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800 ">
                          +2341234567898
                        </p>
                      </div>

                      <div className="hidden md:flex items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800 ">Male</p>
                      </div>

                      <div className="flex items-center py-2 px-4 flex-row gap-x-3 xl:p-5  justify-center md:justify-normal">
                        <Link
                          to={"/admin/survey/pending/complete?survey_id=1"}
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
              ) : loadingGetRespondents ? (
                <div className="flex border-b border-stroke text-green-800 justify-center text-base dark:border-stone-600 py-3">
                  Loading...
                </div>
              ) : (
                <div className="flex border-b border-stroke text-red-800 justify-center text-base dark:border-stone-600 py-3">
                  No Respondents Available
                </div>
              )}
            </div>

            <div className="table-pagination pb-4 pt-6 flex flex-row justify-between gap-x-2 place-items-center">
              <p className="text-gray-700">Showing 1-5 of 25</p>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pending;
