import React, { useState, useEffect } from "react";
import { Loader, SideBar } from "./index";
import { Link } from "react-router-dom";
import user_icon from "../../assets/user_icon.png";
import { useAuthContext } from "../../hooks/useAuthContext";
import { formatDistanceToNow } from "date-fns";
import { TfiMore } from "react-icons/tfi";
import { RiSettings5Line } from "react-icons/ri";

const Profile = () => {
  const [isDropActive, setDropActive] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    function handleClickOutside(event) {
      const dropdown = document.querySelector("#dropdown");
      const dropdownBtn = document.querySelector("#more-actions-btn");

      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        dropdownBtn &&
        !dropdownBtn.contains(event.target)
      ) {
        setDropActive(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // Ensure user object exists before rendering
  if (!user || !user.user) {
    return <div>Error: User data is not available.</div>;
  }

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700 border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between rounded-lg">
          <span className="font-bold text-lg text-gray-900">Profile</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/profile"} className="underline text-blue-500">
              Profile
            </Link>
          </span>
        </div>

        <div className="container-content px-1 py-2 md:px-6 md:py-5">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default sm:px-7 xl:pb-6">
            <div className="action-layer flex justify-end px-4 relative">
              <button
                id="more-actions-btn"
                className="font-semibold p-2"
                onClick={() => setDropActive(!isDropActive)}
              >
                <TfiMore color="#777" />
              </button>

              <div
                id="dropdown"
                className={`z-10 ${
                  isDropActive ? "block" : "hidden"
                } absolute top-8 text-base list-none bg-white divide-y divide-gray-100 rounded-lg w-44 shadow-md`}
              >
                <ul className="py-2 px-4" aria-labelledby="more-actions-btn">
                  <li>
                    <Link
                      to="/admin/settings"
                      className="flex flex-row gap-x-2 px-4 py-2 text-sm place-items-center text-blue-600 hover:text-blue-900"
                    >
                      <RiSettings5Line />
                      Settings
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="user_img w-32 h-32 overflow-hidden rounded-full mx-auto">
              <img
                src={user_icon}
                alt="Profile Picture"
                className="w-full h-full object-contain"
              />
            </div>

            <p className="text-xl text-gray-500 text-center uppercase my-4 font-semibold">
              {user.user.name}
            </p>

            <hr className="w-4/5 mx-auto border- border-stone-700" />

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
