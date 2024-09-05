import React, { useEffect, useState } from "react";
import { Loader, SideBar } from "../index";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";

const CompletePending = () => {
  const { user } = useAuthContext();
  const [languages, setLanguages] = useState(null);
  const [respondent, setRespondent] = useState(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectButtonLoading, setRejectButtonLoading] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [enterSurveyLoading, setEnterSurveyLoading] = useState(false);
  const navigate = useNavigate();

  const giveConsent = () => {
    const consentScreen = document.querySelector(".consent-screen");
    const first_screen = document.querySelector(".screen-1");

    consentScreen.classList.replace("flex", "hidden");
    first_screen.classList.replace("hidden", "block");
  };

  const getSelectedLanguages = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/questions/supported-languages",
      {
        headers: myHeaders,
      }
    );

    const data = await response.json();

    if (response.ok) {
      setLanguages(data.data.languages);
    }
  };

  const getPhone = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("phone") || null;
  };

  const getRespondentByPhone = async (phone) => {
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${user.token}`);

    const response = await fetch(
      `https://ont-survey-tracker-development.up.railway.app/v1/respondents/id/${phone}`,
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    const data = await response.json();
    return data.data;
  };

  useEffect(() => {
    getSelectedLanguages();

    const getUser = async () => {
      const res = await getRespondentByPhone(getPhone());
      setRespondent(res);
    };

    getUser();
  }, []);

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
    const url = `/survey?language=${selectedLanguage}&phone=${getPhone()}&agent=${
      user.user._id
    }&respondent=${respondent.user._id}`;
    navigate(url);
  };

  const handleSubmitReject = (e) => {
    e.preventDefault();
  };

  const rejectConsent = () => {
    navigate(-1);
  };

  if (respondent == null) return false;

  const entry = respondent.survey.entries[0].responses;

  if (entry == null) {
    console.log("entries are null");
    return false;
  }

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
            <div className="consent-screen w-full min-h-96 flex flex-col gap-y-4 place-items-center justify-center">
              <h3 className="text-xl text-blue-600 font-semibold">
                Does the Respondent Agree to Continue?
              </h3>

              <div className="button-list flex flex-row gap-x-3">
                <Button
                  variant="contained"
                  color="error"
                  onClick={rejectConsent}
                >
                  No
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  onClick={giveConsent}
                >
                  Yes
                </Button>
              </div>
            </div>

            <div className="screen-1 hidden">
              <h2 className="text-stone-700 font-bold text-xl">
                Respondent Details
              </h2>
              <div className="details grid grid-cols-2 gap-x-2 mt-4 gap-y-2 md:gap-y-7 px-2 py-2">
                <p className="text-black font-semibold">Name:</p>
                <p className="text-gray-700">
                  {respondent.user.firstname ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Phone Number:</p>
                <p className="text-gray-700">
                  {respondent.user.phone ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Gender:</p>
                <p className="text-gray-700">
                  {respondent.user.gender ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Age:</p>
                <p className="text-gray-700">
                  {respondent.user.age ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Location:</p>
                <p className="text-gray-700">
                  {respondent.user.location ?? "Loading..."}
                </p>
              </div>

              <h2 className="text-blue-700 font-bold text-xl mt-4">
                Previous Q&A
              </h2>

              {entry.map((data, index) => {
                return (
                  <div className="preset-q-and-a px-2 py-2" key={index + 1}>
                    <div className="mb-2 py-3">
                      <p className="text-stone-800">
                        {index + 1}. {data.question}
                      </p>
                      <div className="px-4 py-1 italic text-gray-500 text-sm">
                        {data.answer}
                      </div>
                    </div>

                    <hr className="text-cyan-600" />
                  </div>
                );
              })}

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
                {languages &&
                  languages.map((lang) => (
                    <div className="flex items-center mb-2" key={lang}>
                      <input
                        type="radio"
                        id={lang}
                        name="lang"
                        value={lang}
                        className="custom-radio mr-2"
                        checked={selectedLanguage === lang}
                        onChange={handleChange}
                      />
                      <label
                        htmlFor={lang}
                        className="text-gray-800 capitalize"
                      >
                        {lang}
                      </label>
                    </div>
                  ))}
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
