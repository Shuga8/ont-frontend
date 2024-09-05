import React, { useEffect, useState } from "react";
import { Loader, SideBar } from "../index";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { TbWorldSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import Search from "./Search";
import useGetRespondents from "../Api/Respondents";
import Skeleton from "../../Skeleton/Skeleton";
import TableSkeleton from "../../Skeleton/TableSkeleton";

const List = () => {
  const [respondents, setRespondents] = useState(null);
  const { loadingGetRespondents, getRespondents } = useGetRespondents();
  const [pagination, setPagination] = useState(null);

  useEffect(() => {
    const fetchRespondents = async () => {
      const { pagination, filteredRespondents } = await getRespondents();
      setRespondents(filteredRespondents);
      setPagination(pagination);
    };
    fetchRespondents();
  }, []);

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between">
          <span className="font-bold text-lg text-gray-900">All Surveys</span>
          <span>
            ONT&nbsp;/&nbsp;Survey&nbsp;/
            <Link to={"/admin/survey/all"} className=" text-blue-700">
              &nbsp;All
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <Search />
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
                    Status
                  </h5>
                </div>

                <div className="p-2 xl:p-5">
                  <h5 className="text-sm font-medium text-center uppercase sm:text-base text-stone-900">
                    Menu
                  </h5>
                </div>
              </div>

              {respondents !== null ? (
                respondents.map((data, index) => {
                  // Skip if the respondent or survey is null
                  if (!data || !data.survey || !data.respondent) {
                    return null;
                  }

                  const status = data.survey.status;
                  const statusClasses = {
                    pending: "text-yellow-600",
                    completed: "text-green-600",
                    unfinished: "text-purple-600",
                    rejected: "text-red-600",
                  };

                  return (
                    <div
                      className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0"
                      key={index + 1}
                    >
                      <div className="flex items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800">
                          {index + 1}.
                        </p>
                      </div>

                      <div className="hidden md:flex items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800">
                          {data.respondent.firstname}
                        </p>
                      </div>

                      <div className="flex items-center p-2 xl:p-5 text-sm">
                        <p className="font-medium text-blue-700">
                          {data.respondent.phone}
                        </p>
                      </div>

                      <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                        <p
                          className={`font-medium ${statusClasses[status]} p-2 bg-slate-200 rounded-full capitalize`}
                        >
                          {status}
                        </p>
                      </div>

                      <div className="flex-row gap-x-2 items-center justify-center p-1 xl:p-5 flex">
                        <Link
                          to={`/admin/survey/${status}?search=${data.respondent.phone}`}
                          className="text-blue-500 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                          title="go to survey"
                        >
                          <TbWorldSearch />
                        </Link>
                        <p
                          className="font-medium text-yellow-600 p-2 text-xs bg-slate-200 rounded-full block md:hidden"
                          title="status"
                        >
                          {status === "pending" && "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                })
              ) : loadingGetRespondents ? (
                <>
                  <TableSkeleton />
                </>
              ) : (
                <div className="flex border-b border-stroke text-red-800 justify-center text-base dark:border-stone-600 py-3">
                  No Respondents Available
                </div>
              )}
            </div>

            <div className="table-pagination pb-4 pt-6 flex flex-row justify-between gap-x-2 place-items-center">
              <p className="text-gray-700">
                {pagination && (
                  <>
                    Showing {pagination.page} - {pagination.totalResults} of{" "}
                    {pagination.totalPages}
                  </>
                )}
              </p>
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

export default List;
