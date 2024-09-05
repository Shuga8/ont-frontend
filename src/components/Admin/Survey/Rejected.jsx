import React, { useEffect, useState } from "react";
import { Loader, SideBar } from "../index";
import { MdOutlineRestorePage } from "react-icons/md";
import { FcDeleteColumn } from "react-icons/fc";
import { TfiMore } from "react-icons/tfi";
import { Link } from "react-router-dom";
import Search from "./Search";
import useGetRespondents from "../Api/Respondents";
import TableSkeleton from "../../Skeleton/TableSkeleton";

const Rejected = () => {
  const [moreContent, setMoreContent] = useState(false);
  const [respondents, setRespondents] = useState(null);
  const { loadingGetRespondents, getRespondents } = useGetRespondents();

  const handleMoreContent = (el) => {
    if (moreContent) {
      el.nextElementSibling.classList.replace("block", "hidden");
    } else {
      el.nextElementSibling.classList.replace("hidden", "block");
    }
  };

  useEffect(() => {
    function handleClickOutside(event) {
      const moreBtns = document.querySelectorAll(".more-btn");
      const moreContent = document.querySelectorAll(".more-content");

      moreBtns.forEach((btn) => {
        const content = btn.nextElementSibling;
        if (
          btn &&
          !btn.contains(event.target) &&
          content.classList.contains("block") &&
          !content.contains(event.target)
        ) {
          setMoreContent(false);

          content.classList.replace("block", "hidden");
        }
      });
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const fetchRespondents = async () => {
      const { pagination, filteredRespondents } = await getRespondents(
        "rejected"
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
                            0{data.respondent.phone}
                          </p>
                        </div>

                        <div className="hidden md:flex justify-center items-center p-2 xl:p-5">
                          <p className="font-medium text-gray-800 ">
                            {data.respondent.gender}
                          </p>
                        </div>

                        <div className="flex items-center py-2 px-4 flex-row gap-x-3 xl:p-5  justify-center  relative">
                          <button
                            className="more-btn font-medium text-gray-600 text-lg hover:text-gray-500 px-2 py-1"
                            title="More"
                            onClick={(e) => {
                              setMoreContent(!moreContent);
                              handleMoreContent(e.currentTarget);
                            }}
                          >
                            <TfiMore />
                          </button>

                          <div className="more-content absolute top-12 left-2 rounded-md shadow-md hidden px-2 py-3 z-10 bg-slate-100 w-auto">
                            <ul>
                              <li className="border-b-2 border-slate-100 p-2 hover:bg-slate-50 rounded-sm text-xs md:text-base flex flex-row gap-x-1 place-items-center text-green-600">
                                <MdOutlineRestorePage />{" "}
                                <button>Restore</button>
                              </li>
                              <li className="border-b-2 border-slate-100 p-2 hover:bg-slate-50 rounded-sm text-xs md:text-base flex flex-row gap-x-1 place-items-center text-red-500">
                                <FcDeleteColumn /> <button>Delete</button>
                              </li>
                            </ul>
                          </div>
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
