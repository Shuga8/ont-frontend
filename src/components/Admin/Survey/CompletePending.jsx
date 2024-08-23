import React, { useState } from "react";
import { Loader, SideBar } from "../index";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";

const CompletePending = () => {
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectButtonLoading, setRejectButtonLoading] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [enterSurveyLoading, setEnterSurveyLoading] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
  };

  const handleRejectButtonClick = () => {
    setRejectButtonLoading(true);
    setIsRejecting(true);

    setTimeout(() => {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: "smooth",
      });

      setRejectButtonLoading(false);
    }, 500);
  };

  const handleContinueButtonClick = () => {
    setIsContinuing(true);

    setTimeout(() => {
      setIsContinuing(false);
    }, 990);

    setTimeout(() => {
      document.querySelector(".screen-1").classList.remove("block");
      document.querySelector(".screen-1").classList.add("hidden");

      document.querySelector(".screen-2").classList.add("block");
      document.querySelector(".screen-2").classList.remove("hidden");
    }, 1000);
  };

  const handleEnterSurveyButtonClick = () => {
    setEnterSurveyLoading(true);
    const url = `/survey?language=${selectedLanguage}&phone=+2341234567890`;
    navigate(url);
  };

  const handleSubmitReject = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <SideBar />
      <div className="elements-container mt-14">
        <Loader />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between">
          <span className="font-bold text-lg text-gray-900">
            Complete Pending Survey
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5">
          <div className="screens w-full py-6 px-3 md:px-8 bg-white rounded-lg">
            <div className="screen-1 block">
              <h2 className="text-stone-700 font-bold text-xl">
                Respondent Details
              </h2>
              <div className="details grid grid-cols-2 gap-x-2 mt-4 gap-y-2 md:gap-y-7 px-2 py-2">
                <p className="text-black font-semibold">Name:</p>
                <p className="text-gray-700">John Doe</p>
                <p className="text-black font-semibold">Phone Number:</p>
                <p className="text-gray-700">+2341234567898</p>
                <p className="text-black font-semibold">Gender:</p>
                <p className="text-gray-700">Male</p>
                <p className="text-black font-semibold">Age:</p>
                <p className="text-gray-700">40</p>
                <p className="text-black font-semibold">Employment Status:</p>
                <p className="text-gray-700">Employed</p>
              </div>

              <h2 className="text-blue-700 font-bold text-xl mt-4">
                Preset Q&A
              </h2>

              <div className="preset-q-and-a px-2 py-2">
                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    1. May I ask you a few short questions? The survey will take
                    about 15 minutes and you may stop at any time.
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    Yes
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    2. Are you the parent or caregiver of any children who are
                    younger than 2 years old?
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    Yes
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    3. Are you residing in [name LGA from listing] ?
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    Yes
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    4. Number of total household members
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    7
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    5. What is your relationship with the child?
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    Guardian
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    6. You are a caregiver to how many children under -2?
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    3
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">7. What is your age?</p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    40
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">8. What is your gender?</p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    Male
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    9. What is your education level?
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    Graduate
                  </div>
                </div>

                <hr className="text-cyan-600" />

                <div className="mb-2 py-3">
                  <p className="text-stone-800">
                    10. What is your employment status?
                  </p>
                  <div className="px-4 py-1 italic text-gray-500 text-sm">
                    Employed
                  </div>
                </div>
              </div>

              <div className="screen-1-action-buttons flex flex-row gap-x-4 justify-end">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => {
                    handleRejectButtonClick();
                  }}
                >
                  {!rejectButtonLoading ? (
                    "Reject"
                  ) : (
                    <span className="material-symbols-outlined spinner">
                      progress_activity
                    </span>
                  )}
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  disabled={isRejecting || isContinuing}
                  onClick={() => {
                    handleContinueButtonClick();
                  }}
                >
                  {!isContinuing ? (
                    "Continue"
                  ) : (
                    <span className="material-symbols-outlined spinner">
                      progress_activity
                    </span>
                  )}
                </Button>
              </div>

              {isRejecting && (
                <div className="w-full py-8">
                  <form
                    method="POST"
                    className="rejection-form flex flex-row w-full gap-x-3"
                    onSubmit={handleSubmitReject}
                  >
                    <input
                      type="text"
                      name="reason_for_rejection"
                      placeholder="Reason for rejection"
                      className="px-3 py-2 w-72"
                    />
                    <Button variant="contained" color="primary" type="submit">
                      Submit
                    </Button>
                  </form>
                </div>
              )}
            </div>

            <div className="screen-2 hidden">
              <h2 className="text-stone-700 font-bold text-lg">
                Select Language to complete survey in...
              </h2>

              <div className="languages px-4 py-6">
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="english"
                    name="lang"
                    value="english"
                    className="custom-radio mr-2"
                    checked={selectedLanguage === "english"}
                    onChange={handleChange}
                  />
                  <label htmlFor="english" className="text-gray-800">
                    English
                  </label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="pidgin"
                    name="lang"
                    value="pidgin"
                    className="custom-radio mr-2"
                    checked={selectedLanguage === "pidgin"}
                    onChange={handleChange}
                  />
                  <label htmlFor="pidgin" className="text-gray-800">
                    Pidgin
                  </label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="igbo"
                    name="lang"
                    value="igbo"
                    className="custom-radio mr-2"
                    checked={selectedLanguage === "igbo"}
                    onChange={handleChange}
                  />
                  <label htmlFor="igbo" className="text-gray-800">
                    Igbo
                  </label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="hausa"
                    name="lang"
                    value="hausa"
                    className="custom-radio mr-2"
                    checked={selectedLanguage === "hausa"}
                    onChange={handleChange}
                  />
                  <label htmlFor="hausa" className="text-gray-800">
                    Hausa
                  </label>
                </div>

                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id="yoruba"
                    name="lang"
                    value="yoruba"
                    className="custom-radio mr-2"
                    checked={selectedLanguage === "yoruba"}
                    onChange={handleChange}
                  />
                  <label htmlFor="yoruba" className="text-gray-800">
                    Yoruba
                  </label>
                </div>
              </div>

              <div className="screen-2-action-buttons flex flex-row gap-x-4 justify-end">
                <Button
                  variant="contained"
                  color="success"
                  disabled={enterSurveyLoading}
                  onClick={() => {
                    handleEnterSurveyButtonClick();
                  }}
                >
                  {enterSurveyLoading ? (
                    <span className="material-symbols-outlined spinner">
                      progress_activity
                    </span>
                  ) : (
                    "Enter Survey"
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompletePending;
