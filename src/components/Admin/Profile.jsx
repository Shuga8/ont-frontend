import React from "react";
import { Loader, SideBar } from "./index";
import { Link } from "react-router-dom";
import user_icon from "../../assets/user_icon.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { formatDistanceToNow } from "date-fns/formatDistanceToNow";
import { TfiMore } from "react-icons/tfi";

const Profile = () => {
  const { user } = useAuthContext();
  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between rounded-lg">
          <span className="font-bold text-lg text-gray-900">Profile</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/profile"} className="underline text-blue-500">
              Profile
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default sm:px-7 xl:pb-6">
            <div className="action-layer flex justify-end px-4">
              <button
                id="more-actions-btn"
                className=" font-semibold p-2"
                data-dropdown-toggle="dropdown"
              >
                <TfiMore color="#ccc" />
              </button>

              <div
                id="dropdown"
                className="z-10 hidden text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44  "
              >
                <ul className="py-2 px-4" aria-labelledby="more-actions-btn">
                  <li>
                    <Link
                      to="/admin/settings"
                      className="block px-4 py-2 text-sm   text-blue-600 hover:text-blue-900"
                    >
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="user_img w-32 h-32 overflow-hidden rounded-full border-4 border-purple-600 mx-auto">
              <img
                src={user_icon}
                alt="Profile Picture"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-xl text-gray-500 text-center uppercase my-4 font-semibold">
              {user.user.name}
            </p>

            <p className="text-base text-gray-700 text-center uppercase my-4 font-semibold">
              {user.user.email}
            </p>

            <p className="text-sm text-blue-700 text-center uppercase my-4 font-thin">
              Created{" "}
              {formatDistanceToNow(new Date(user.user.createdAt), {
                addSuffix: true,
              })}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
