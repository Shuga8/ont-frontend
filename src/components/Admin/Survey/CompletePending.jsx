import React, { useEffect, useState } from "react";
import { ErrorToast, InfoToast, SuccessToast, Loader, SideBar } from "../index";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { TbLoader3 } from "react-icons/tb";
import Preloader from "../Widgets/Preloader";
import Message from "../Widgets/Message";

const CompletePending = () => {
  const { user } = useAuthContext();
  const { welcome, consentQuestion } = Message();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [info, setInfo] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [isInfoActive, setInfoActive] = useState(false);
  const [languages, setLanguages] = useState(null);
  const [respondent, setRespondent] = useState(null);
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectButtonLoading, setRejectButtonLoading] = useState(false);
  const [isContinuing, setIsContinuing] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [displayMessage, setDisplayMessage] = useState(
    welcome[selectedLanguage]
  );
  const [displayConsent, setDisplayConsent] = useState(
    consentQuestion[selectedLanguage]
  );
  const [enterSurveyLoading, setEnterSurveyLoading] = useState(false);
  const [isSubmittingRejectLoading, setSubmittingRejectLoading] =
    useState(false);
  const [isLoading, setIsloading] = useState(false);
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
    return data.data.respondents[0];
  };

  useEffect(() => {
    getSelectedLanguages();
    setSubmittingRejectLoading(false);

    const getUser = async () => {
      const res = await getRespondentByPhone(getPhone());
      setRespondent(res);
    };

    getUser();
  }, []);

  useEffect(() => {
    if (error) {
      setErrorActive(true);
      const timer = setTimeout(() => {
        setErrorActive(false);
        setError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (success) {
      setSuccessActive(true);
      const timer = setTimeout(() => {
        setSuccessActive(false);
        setSuccess(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (info) {
      setInfoActive(true);
      const timer = setTimeout(() => {
        setInfoActive(false);
        setInfo(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error, success, info]);

  const handleChange = (event) => {
    setSelectedLanguage(event.target.value);
    setDisplayMessage(welcome[event.target.value]);
    setDisplayConsent(consentQuestion[event.target.value]);
  };

  const submitResponse = async (data) => {
    if (user.user.type !== "admin") {
      return;
    }
    setIsloading(true);
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${user.token}`);

    const reqBody = JSON.stringify(data);
    const response = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/surveys",
      {
        method: "POST",
        headers: myHeaders,
        body: reqBody,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      if (result.error.message) {
        setError(result.error.message);
      } else {
        setError(result.message);
      }
    } else {
      setSuccess("Update successfull");
    }

    setIsloading(false);
  };

  const submitUpdate = async (e) => {
    e.preventDefault();
    const formEl = document.forms["first10Form"].elements;
    let len = formEl.length - 1; //because last element is a button

    const res = {
      respondent: respondent.respondent._id,
      language: selectedLanguage,
      category: respondent.survey.entries.category._id,
    };

    const responses = [];
    for (let i = 0; i < len; i++) {
      const element = formEl[i];

      if (element.name) {
        let response = {
          question: element.name,
          answer: element.value,
        };
        responses.push(response);
      }
    }

    res.responses = responses;

    await submitResponse(res);

    setTimeout(() => {
      window.location.href = `/admin/survey/unfinished?search=${getPhone()}`;
    }, 2000);
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
      document.querySelector(".screen-2").classList.remove("block");
      document.querySelector(".screen-2").classList.add("hidden");

      document.querySelector(".screen-1").classList.add("block");
      document.querySelector(".screen-1").classList.remove("hidden");
    }, 1000);
  };

  const handleEnterSurveyButtonClick = () => {
    setEnterSurveyLoading(true);
    const url = `/survey?language=${selectedLanguage}&phone=${getPhone()}&agent=${
      user.user._id
    }&respondent=${respondent.respondent._id}&researcherCode=${
      user.user.researcherCode
    }`;
    navigate(url);
  };

  const handleSubmitReject = async (e) => {
    e.preventDefault();

    const form = e.target;
    const reason = form.reason.value;
    const phone = getPhone() ?? null;
    const status = "reject";

    if (phone == null) {
      setError("Respondent Identification is invalid!");
      return;
    }

    if (reason == null || reason == "") {
      setError("Specify rejection reason!");
      return;
    }

    setSubmittingRejectLoading(true);

    const reqBody = JSON.stringify({
      phone,
      status,
      reason,
    });

    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${user.token}`);
    myHeaders.append("Content-Type", "application/json");

    const response = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/surveys/status",
      {
        method: "PATCH",
        headers: myHeaders,
        body: reqBody,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (data.error.message) {
        setError(data.message);
        setTimeout(() => {
          setSubmittingRejectLoading(false);
        }, 1200);
        return;
      } else if (data.error) {
        setError(data.error);
        setTimeout(() => {
          setSubmittingRejectLoading(false);
        }, 1200);
        return;
      }
    } else {
      setSuccess("Survey Rejected successfully");
      setTimeout(() => {
        setSubmittingRejectLoading(false);
      }, 1200);

      setTimeout(() => {
        navigate("/admin/survey/rejected");
        // window.location.href = "/admin/survey/rejected";
      }, 1400);
    }
  };

  const rejectConsent = () => {
    navigate(-1);
  };

  if (respondent == null) {
    return (
      <>
        <SideBar />
        <div className="elements-container mt-14">
          <Loader leave={false} />
        </div>
      </>
    );
  }

  const entry = respondent.survey.entries.responses ?? null;

  if (entry == null) {
    return (
      <>
        <SideBar />
        <div className="elements-container mt-14">
          <Loader leave={false} />
        </div>
      </>
    );
  }

  return (
    <>
      <SideBar />

      <div className="elements-container mt-14">
        <Loader />
        <Preloader isVisible={isSubmittingRejectLoading || isLoading} />
        <InfoToast message={info} isActive={isInfoActive} />
        <ErrorToast message={error} isActive={isErrorActive} />
        <SuccessToast message={success} isActive={isSuccessActive} />
        <div className="w-full h-10 px-4 py-8 text-gray-700   border-b-2 border-gray-300 flex flex-row items-center place-items-center justify-between">
          <span className="font-bold text-lg text-gray-900">
            Complete Pending Survey
          </span>
        </div>

        <div className="container-content  px-1 py-2 md:px-6 md:py-5 h-full">
          <div className="screens w-full py-6 px-3 md:px-8 bg-white rounded-lg">
            {/* <div className="consent-screen w-full min-h-96 flex flex-col gap-y-4 place-items-center justify-center">
              <h3 className="text-sm md:text-base text-blue-600 font-semibold">
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
            </div> */}

            <div className="screen-1 hidden">
              <h2 className="text-stone-700 font-bold text-xl">
                Respondent Details
              </h2>
              <div className="details grid grid-cols-2 gap-x-2 mt-4 gap-y-2 md:gap-y-7 px-2 py-2">
                <p className="text-black font-semibold">Name:</p>
                <p className="text-gray-700">
                  {respondent.respondent.firstname ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Phone Number:</p>
                <p className="text-gray-700">
                  {respondent.respondent.phone ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Gender:</p>
                <p className="text-gray-700">
                  {respondent.respondent.gender ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Age:</p>
                <p className="text-gray-700">
                  {respondent.respondent.age ?? "Loading..."}
                </p>
                <p className="text-black font-semibold">Location:</p>
                <p className="text-gray-700">
                  {respondent.respondent.location ?? "Loading..."}
                </p>
              </div>

              <h2 className="text-blue-700 font-bold text-xl mt-4">
                Previous Q&A
              </h2>

              <form name="first10Form" onSubmit={submitUpdate}>
                {entry &&
                  entry.map((data, index) => {
                    let isDisabled = false;
                    const disabledArray = [0, 1, 2, 3, 10, 12];
                    if (disabledArray.includes(index)) {
                      isDisabled = true;
                    }

                    if (user.user.type !== "admin") {
                      isDisabled = true;
                    }

                    return (
                      <div className="preset-q-and-a px-2 py-2" key={index + 1}>
                        <div className="mb-2 py-3">
                          <p className="text-stone-800 flex flex-row">
                            {index + 1}.{" "}
                            <span className="flex flex-row gap-x-2">
                              <span>{data.questionDetails.question}</span>
                              {user.user.type == "admin" && (
                                <span>
                                  {isDisabled ? (
                                    <span className="text-xs text-red-600">
                                      (fixed)
                                    </span>
                                  ) : (
                                    <span className="text-xs text-green-600">
                                      (editable)
                                    </span>
                                  )}
                                </span>
                              )}
                            </span>
                          </p>
                          <input
                            type="text"
                            name={data.questionDetails._id}
                            className="px-4 bg-transparent py-1 italic text-gray-500 text-sm w-full focus:outline-none"
                            defaultValue={data.answer}
                            disabled={isDisabled}
                          />
                        </div>

                        <hr className="text-cyan-600" />
                      </div>
                    );
                  })}

                {user.user.type == "admin" && (
                  <Button variant="contained" color="primary" type="submit">
                    Update
                  </Button>
                )}
              </form>
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
                    <span className=" spinner text-white text-lg">
                      <TbLoader3 />
                    </span>
                  )}
                </Button>

                <Button
                  variant="contained"
                  color="success"
                  disabled={isRejecting || isContinuing}
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

              {isRejecting && (
                <div className="w-full py-8">
                  <form
                    method="POST"
                    className="rejection-form flex flex-row w-full gap-x-3"
                    onSubmit={handleSubmitReject}
                    name="rejectionReasonForm"
                  >
                    <input
                      type="text"
                      name="reason"
                      placeholder="Reason for rejection"
                      className="px-3 py-2 w-72"
                    />
                    <Button
                      variant="contained"
                      color="primary"
                      type="submit"
                      disabled={isSubmittingRejectLoading}
                    >
                      {!isSubmittingRejectLoading ? (
                        "Submit"
                      ) : (
                        <span className=" spinner text-white text-lg">
                          <TbLoader3 />
                        </span>
                      )}
                    </Button>
                  </form>
                </div>
              )}
            </div>

            <div className="screen-2 h-full ">
              <div className="mb-6">
                <h2 className="text-black font-semibold text-lg">
                  Respondent Phone Number:
                </h2>
                <p className="text-gray-700 px-2">
                  {respondent.respondent.phone ?? "Loading..."}
                </p>
              </div>

              <h3 className="text-stone-700 font-bold text-lg">
                Select Language to complete survey in...
              </h3>

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

              <div className="message-container leading-8 text-gray-900 px-2 py-3 mb-6">
                <div className="bg-slate-600 text-white py-1 px-2">
                  {displayMessage}
                </div>
                <div className="static-message text-stone-600 mt-5 text-sm">
                  {displayConsent}
                </div>
              </div>

              <div className="screen-2-action-buttons flex flex-row gap-x-4 justify-end">
                <Button
                  variant="contained"
                  color="error"
                  disabled={isContinuing}
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  Decline
                </Button>
                <Button
                  variant="contained"
                  color="success"
                  disabled={isContinuing}
                  onClick={() => {
                    handleContinueButtonClick();
                  }}
                >
                  {!isContinuing ? (
                    "Continue"
                  ) : (
                    <span className=" spinner text-white text-lg">
                      <TbLoader3 />
                    </span>
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
