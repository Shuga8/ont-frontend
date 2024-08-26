import React from "react";
import { Loader, SideBar } from "../index";
import { Link } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoTrashOutline } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";
import Actions from "./Actions";

const Agents = () => {
  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between ">
          <span className="font-bold text-lg text-gray-900">Agents</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/agents"} className="underline text-blue-500">
              Agents
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <Actions />
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
                    Firstname
                  </h5>
                </div>

                <div className="p-2 xl:p-5">
                  <h5 className="text-sm font-medium uppercase sm:text-base text-stone-900">
                    Lastname
                  </h5>
                </div>

                <div className="p-2 xl:p-5 hidden md:block">
                  <h5 className="text-sm font-medium text-center uppercase sm:text-base text-stone-900">
                    Email
                  </h5>
                </div>

                <div className="p-2 xl:p-5">
                  <h5 className="text-sm font-medium text-center uppercase sm:text-base text-stone-900">
                    Action
                  </h5>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0">
                <div className="flex items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">1.</p>
                </div>

                <div className="hidden md:flex  items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">John</p>
                </div>

                <div className="flex items-center p-2 xl:p-5 text-base">
                  <p className="font-medium text-gray-800 ">Doe</p>
                </div>

                <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                  <p className="font-medium text-gray-600 text-sm">
                    johndoe@mail.com
                  </p>
                </div>

                <div className="flex-row gap-x-2 items-center justify-center p-1 xl:p-5 flex">
                  <Link
                    className="text-red-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <IoTrashOutline />
                  </Link>
                  <Link
                    className="text-blue-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <TbPencilCog />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0">
                <div className="flex items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">1.</p>
                </div>

                <div className="hidden md:flex  items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">John</p>
                </div>

                <div className="flex items-center p-2 xl:p-5 text-base">
                  <p className="font-medium text-gray-800 ">Doe</p>
                </div>

                <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                  <p className="font-medium text-gray-600 text-sm">
                    johndoe@mail.com
                  </p>
                </div>

                <div className="flex-row gap-x-2 items-center justify-center p-1 xl:p-5 flex">
                  <Link
                    className="text-red-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <IoTrashOutline />
                  </Link>
                  <Link
                    className="text-blue-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <TbPencilCog />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0">
                <div className="flex items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">1.</p>
                </div>

                <div className="hidden md:flex  items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">John</p>
                </div>

                <div className="flex items-center p-2 xl:p-5 text-base">
                  <p className="font-medium text-gray-800 ">Doe</p>
                </div>

                <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                  <p className="font-medium text-gray-600 text-sm">
                    johndoe@mail.com
                  </p>
                </div>

                <div className="flex-row gap-x-2 items-center justify-center p-1 xl:p-5 flex">
                  <Link
                    className="text-red-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <IoTrashOutline />
                  </Link>
                  <Link
                    className="text-blue-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <TbPencilCog />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0">
                <div className="flex items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">1.</p>
                </div>

                <div className="hidden md:flex  items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">John</p>
                </div>

                <div className="flex items-center p-2 xl:p-5 text-base">
                  <p className="font-medium text-gray-800 ">Doe</p>
                </div>

                <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                  <p className="font-medium text-gray-600 text-sm">
                    johndoe@mail.com
                  </p>
                </div>

                <div className="flex-row gap-x-2 items-center justify-center p-1 xl:p-5 flex">
                  <Link
                    className="text-red-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <IoTrashOutline />
                  </Link>
                  <Link
                    className="text-blue-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <TbPencilCog />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0">
                <div className="flex items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">1.</p>
                </div>

                <div className="hidden md:flex  items-center p-2 xl:p-5">
                  <p className="font-medium text-gray-800 ">John</p>
                </div>

                <div className="flex items-center p-2 xl:p-5 text-base">
                  <p className="font-medium text-gray-800 ">Doe</p>
                </div>

                <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                  <p className="font-medium text-gray-600 text-sm">
                    johndoe@mail.com
                  </p>
                </div>

                <div className="flex-row gap-x-2 items-center justify-center p-1 xl:p-5 flex">
                  <Link
                    className="text-red-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <IoTrashOutline />
                  </Link>
                  <Link
                    className="text-blue-700 p-2 bg-slate-200 rounded-full text-base md:text-lg"
                    title="go to survey"
                  >
                    <TbPencilCog />
                  </Link>
                </div>
              </div>
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

export default Agents;
