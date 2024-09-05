import React, { useEffect, useState } from "react";
import { Loader, SideBar } from "../index";
import { Link } from "react-router-dom";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { IoTrashOutline } from "react-icons/io5";
import { TbPencilCog } from "react-icons/tb";
import Actions from "./Actions";
import { useAuthContext } from "../../../hooks/useAuthContext";
import TableSkeleton from "../../Skeleton/TableSkeleton";

const Agents = () => {
  const [userList, setUserList] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const getList = async () => {
      const myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("authorization", `Bearer ${user.token}`);
      const response = await fetch(
        `https://ont-survey-tracker-development.up.railway.app/v1/admins`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      await response.json().then((data) => {
        setUserList(data.data.admins);
      });
    };

    getList();
  }, [user.token]);
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
                    Role
                  </h5>
                </div>

                <div className="p-2 xl:p-5">
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
                      className="grid grid-cols-3 border-b border-stroke dark:border-stone-600 sm:grid-cols-5 py-3 md:py-0"
                      key={index + 1}
                    >
                      <div className="flex items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800 ">
                          {index + 1}.
                        </p>
                      </div>

                      <div className="hidden md:flex  items-center p-2 xl:p-5">
                        <p className="font-medium text-gray-800 capitalize">
                          {user.firstname}
                        </p>
                      </div>

                      <div className="flex items-center p-2 xl:p-5 text-base">
                        <p className="font-medium text-gray-800 capitalize">
                          {user.lastname}
                        </p>
                      </div>

                      <div className="items-center justify-center p-2 xl:p-5 hidden md:flex">
                        <p className="font-medium text-gray-600 text-sm capitalize">
                          {user.type.replace("-", " ")}
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
                  );
                })
              ) : (
                <TableSkeleton count={5} />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Agents;
