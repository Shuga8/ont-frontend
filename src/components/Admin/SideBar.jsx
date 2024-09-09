import React, { useEffect, useState } from "react";
import logo from "../../assets/logo.png";
import {
  RiMenu3Line,
  RiArrowDownSLine,
  RiSpeedUpLine,
  RiListIndefinite,
  RiSettings5Line,
  RiLogoutCircleRLine,
} from "react-icons/ri";
import { PiUsersFourDuotone } from "react-icons/pi";
import { CgProfile } from "react-icons/cg";
import { TbWorldDownload } from "react-icons/tb";
import { Link, useNavigate } from "react-router-dom";
import user_icon from "../../assets/user_icon.png";
import { useLogout } from "../../hooks/useLogout";
import { useAuthContext } from "../../hooks/useAuthContext";

const SideBar = () => {
  const { logout } = useLogout();
  const [dropDownOpen, setDropDownOpen] = useState(false);
  const [asideActive, setAsideActive] = useState(false);
  const { user } = useAuthContext();

  const [stats, setStats] = useState(null);
  const url = `https://ont-survey-tracker-development.up.railway.app/v1/stats/widgets`;

  useEffect(() => {
    const getDashboardStats = async (url) => {
      const cache = await caches.open("my-cache");
      const cachedResponse = await cache.match(url);

      if (cachedResponse) {
        const data = await cachedResponse.json();
        setStats(data.data.stats);
      }

      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${user.token}`);

      try {
        const response = await fetch(url, {
          method: "GET",
          headers: myHeaders,
        });

        if (response.ok) {
          cache.put(url, response.clone());
          const freshData = await response.json();
          setStats(freshData.data.stats);
        } else {
          throw new Error("Network error");
        }
      } catch (error) {
        console.error("Fetch error:", error);
      }
    };

    getDashboardStats(url);
  }, [user.token]);

  useEffect(() => {
    function handleClickOutside(event) {
      const logoToggle = document.querySelector("#logoToggleBtn");
      const sidebar = document.querySelector("#logo-sidebar");
      const dropdown = document.querySelector("#dropdown-user");
      const dropdownBtn = document.querySelector("#dropdownBtn");
      if (
        dropdown &&
        !dropdown.contains(event.target) &&
        dropdownBtn &&
        !dropdownBtn.contains(event.target)
      ) {
        setDropDownOpen(false);
      }

      if (
        sidebar &&
        !sidebar.contains(event.target) &&
        !logoToggle.contains(event.target)
      ) {
        setAsideActive(false);
      }
    }

    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const pathNameCheck = (name) => {
    return window.location.pathname == name;
  };

  const pathNameLike = (name) => {
    return window.location.pathname.includes(name);
  };

  useEffect(() => {
    if (pathNameLike("/admin/survey")) {
      const allLinks = document.querySelectorAll(".links");

      allLinks.forEach((link, i) => {
        if (link.style.height === "0px" || link.style.height === "") {
          const contentHeight = link.scrollHeight + "px";
          link.style.height = contentHeight;
        }
      });
    }
  }, [pathNameLike("/admin/survey")]);

  const toggleLink = (index) => {
    const allLinks = document.querySelectorAll(".links");

    allLinks.forEach((link, i) => {
      if (i === index) {
        if (link.style.height === "0px" || link.style.height === "") {
          const contentHeight = link.scrollHeight + "px";
          link.style.height = contentHeight;
        } else {
          link.style.height = "0px";
        }
      } else {
        link.style.height = "0px";
      }
    });
  };

  const logoutAction = async (e) => {
    e.preventDefault(e);
    await logout();
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-200 dark:bg-gray-800 dark:border-gray-700">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                id="logoToggleBtn"
                type="button"
                className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                onClick={() => setAsideActive(!asideActive)}
              >
                <span className="sr-only">Open sidebar</span>
                <RiMenu3Line color="#fff" />
              </button>
              <Link to={"/admin/"} className="flex ms-2 md:me-24">
                <img src={logo} className="h-8 me-3" alt="UNICEF Logo" />
                <span className="self-center text-xl font-semibold sm:text-2xl whitespace-nowrap dark:text-white">
                  UNICEF SURVEY
                </span>
              </Link>
            </div>
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                    aria-expanded={dropDownOpen}
                    onClick={() => setDropDownOpen(!dropDownOpen)}
                    id="dropdownBtn"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      className="w-8 h-8 rounded-full"
                      src={user_icon}
                      alt="user photo"
                    />
                  </button>
                </div>
                <div
                  className={`z-50 ${
                    dropDownOpen ? "block" : "hidden"
                  } fixed my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600`}
                  id="dropdown-user"
                >
                  <div className="px-4 py-3" role="none">
                    <p
                      className="text-sm text-gray-900 dark:text-white"
                      role="none"
                    >
                      Agent one
                    </p>
                    <p
                      className="text-sm font-medium text-gray-900 truncate dark:text-gray-300"
                      role="none"
                    >
                      agentone@ont.com
                    </p>
                  </div>
                  <ul className="py-1" role="none">
                    <li>
                      <Link
                        to={"/admin/settings"}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                      >
                        Settings
                      </Link>
                    </li>

                    <li>
                      <Link
                        href="#"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                        role="menuitem"
                        onClick={logoutAction}
                      >
                        Sign out
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform -translate-x-full bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700 ${
          asideActive ? "transform-none" : "-translate-x-full"
        }`}
        aria-modal={asideActive}
        aria-label="Sidebar"
        aria-hidden={!asideActive}
        role={asideActive ? "modal" : null}
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to={"/admin/"}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathNameCheck("/admin/") ? "bg-gray-700" : ""
                }`}
              >
                <RiSpeedUpLine color="#fff" />

                <span className="ms-3">Dashboard</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/admin/profile"}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathNameCheck("/admin/profile") ? "bg-gray-700" : ""
                }`}
                aria-hidden="true"
              >
                <CgProfile color="#fff" />

                <span className="ms-3">Profile</span>
              </Link>
            </li>

            {user.user.type !== "call-center" && (
              <li>
                <Link
                  to={"/admin/agents"}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                    pathNameCheck("/admin/agents") ? "bg-gray-700" : ""
                  }`}
                >
                  <PiUsersFourDuotone color="#fff" />

                  <span className="ms-3">Agents</span>
                </Link>
              </li>
            )}

            <div className="dropdown-list">
              <div
                className={`dropdownBtn flex flex-row justify-between place-items-center hover:bg-gray-100 dark:hover:bg-gray-700 p-1 rounded-md cursor-pointer ${
                  pathNameLike("/admin/survey") ? "bg-gray-700" : ""
                }`}
                onClick={() => toggleLink(0)}
              >
                <p className="text-base text-gray-300 px-2 py-1 flex flex-row gap-x-2 place-items-center">
                  <span>
                    <RiListIndefinite />
                  </span>{" "}
                  Surveys
                </p>
                <span className="text-base text-gray-300 px-3 py-1">
                  <RiArrowDownSLine />
                </span>
              </div>

              <div className="links w-full block overflow-hidden px-3 transition-all">
                <li>
                  <Link
                    to={"/admin/survey/completed"}
                    className={`text-sm mb-3 mt-2 flex flex-row justify-between place-items-center text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer ${
                      pathNameCheck("/admin/survey/completed")
                        ? "bg-gray-600"
                        : ""
                    }`}
                  >
                    <span>Completed Surveys</span>
                    <span className="bg-green-500 px-2 text-center text-sm text-white rounded-lg">
                      {stats ? stats.totalCompletedSurvey : 0}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/admin/survey/unfinished"}
                    className={`text-sm mb-3 mt-2 flex flex-row justify-between place-items-center text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer ${
                      pathNameCheck("/admin/survey/unfinished")
                        ? "bg-gray-600"
                        : ""
                    }`}
                  >
                    <span>Unfinished Surveys</span>
                    <span className="bg-purple-500 px-2 text-center text-sm text-white rounded-lg">
                      {stats ? stats.totalUnfinishedSurvey : 0}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/admin/survey/pending"}
                    className={`text-sm mb-3 flex flex-row justify-between text-white place-items-center hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer ${
                      pathNameLike("/admin/survey/pending") ? "bg-gray-600" : ""
                    }`}
                  >
                    <span>Pending Surveys</span>
                    <span className="bg-yellow-500 px-2 text-center text-sm text-white rounded-lg">
                      {stats ? stats.totalPendingSurvey : 0}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/admin/survey/rejected"}
                    className={`text-sm mb-3 flex flex-row justify-between place-items-center text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer ${
                      pathNameCheck("/admin/survey/rejected")
                        ? "bg-gray-600"
                        : ""
                    }`}
                  >
                    <span>Rejected Surveys</span>
                    <span className="bg-red-500 px-2 text-center text-sm text-white rounded-lg">
                      {stats ? stats.totalRejectedSurvey : 0}
                    </span>
                  </Link>
                </li>

                <li>
                  <Link
                    to={"/admin/survey/all"}
                    className={`text-sm mb-3 flex flex-row justify-between place-items-center text-white hover:bg-gray-100 dark:hover:bg-gray-700 px-3 py-2 rounded-md cursor-pointer ${
                      pathNameCheck("/admin/survey/all") ? "bg-gray-600" : ""
                    }`}
                  >
                    <span>All Surveys</span>
                    <span className="bg-blue-500 px-2 text-center text-sm text-white rounded-lg">
                      {stats ? stats.totalSurvey : 0}
                    </span>
                  </Link>
                </li>
              </div>
            </div>

            <li>
              <Link
                to={"/admin/download"}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathNameCheck("/admin/download") ? "bg-gray-600" : ""
                }`}
              >
                <TbWorldDownload color="#fff" />

                <span className="ms-3">Download</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/admin/settings"}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group ${
                  pathNameCheck("/admin/settings") ? "bg-gray-600" : ""
                }`}
              >
                <RiSettings5Line color="#fff" />

                <span className="ms-3">Settings</span>
              </Link>
            </li>

            <li>
              <Link
                to={"/admin/logout"}
                className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group `}
                onClick={logoutAction}
              >
                <RiLogoutCircleRLine color="#fff" />

                <span className="ms-3">Logout</span>
              </Link>
            </li>
          </ul>
        </div>
      </aside>
    </>
  );
};

export default SideBar;
