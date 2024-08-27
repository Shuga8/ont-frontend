import React, { useState } from "react";
import { Loader, SideBar } from "./index";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import { RiSave3Line } from "react-icons/ri";

const Settings = () => {
  const handleSubmit = (e) => {
    e.preventDefault(e);
  };

  const [isOtherFormVIsible, setOtherFormVisible] = useState(false);

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between ">
          <span className="font-bold text-lg text-gray-900">Settings</span>
          <span>
            ONT&nbsp;/&nbsp;
            <Link to={"/admin/settings"} className="underline text-blue-500">
              Settings
            </Link>
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <div className="rounded-sm border border-stroke bg-white px-5 pb-6 pt-6 shadow-default sm:px-7 xl:pb-6">
            <h3 className="text-black font-semibold text-xl mb-4">
              User Settings
            </h3>
            <div
              className={`user-form ${isOtherFormVIsible ? "hidden" : "block"}`}
            >
              <form
                action=""
                method=""
                onSubmit={handleSubmit}
                className="w-full"
              >
                <label className="block">
                  <label htmlFor="email" className="text-gray-900">
                    Email{" "}
                    <span className="text-xs text-red-800">
                      (Email cannot be changed)
                    </span>
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="email address "
                    value={"johndoe@mail.com"}
                    required="true"
                    disabled="true"
                  />
                </label>

                <label className="block">
                  <label htmlFor="firstname" className="text-gray-900">
                    Firstname{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="text"
                    name="firstname"
                    id="firstname"
                    placeholder="firstname"
                    value={"John"}
                    required="true"
                  />
                </label>

                <label className="block">
                  <label htmlFor="lastname" className="text-gray-900">
                    Lastname{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="text"
                    name="lastname"
                    id="lastname"
                    placeholder="lastname"
                    value={"Doe"}
                    required="true"
                  />
                </label>

                <div className="actions my-3 flex flex-row gap-x-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="flex flex-row gap-x-2"
                  >
                    <RiSave3Line className="text-white" />{" "}
                    <span>Save Changes</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      setOtherFormVisible(true);
                    }}
                  >
                    Change Password
                  </Button>
                </div>
              </form>
            </div>

            <div
              className={`password-form ${
                isOtherFormVIsible ? "block" : "hidden"
              }`}
            >
              <form
                action=""
                method=""
                onSubmit={handleSubmit}
                className="w-full"
              >
                <label className="block">
                  <label htmlFor="password" className="text-gray-900">
                    New Password{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="***********"
                    required="true"
                  />
                </label>
                <label className="block">
                  <label
                    htmlFor="password_confirmation"
                    className="text-gray-900"
                  >
                    Confirm Password{" "}
                  </label>
                  <input
                    className="w-full my-2 py-3 px-3 rounded-md bg-transparent text-gray-900 border-2 border-blue-300"
                    type="password"
                    name="password_confirmation"
                    id="password_confirmation"
                    placeholder="***********"
                    required="true"
                  />
                </label>

                <div className="actions my-3 flex flex-row gap-x-3">
                  <Button
                    type="submit"
                    variant="contained"
                    color="success"
                    className="flex flex-row gap-x-2"
                  >
                    <RiSave3Line className="text-white" />{" "}
                    <span>Save Changes</span>
                  </Button>

                  <Button
                    type="button"
                    variant="outlined"
                    color="info"
                    onClick={() => {
                      setOtherFormVisible(false);
                    }}
                  >
                    Change User Details
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Settings;
