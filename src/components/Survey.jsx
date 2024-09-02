import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useRespondentList from "../hooks/useRespondentList";

const Survey = () => {
  const getRespondentIdFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("respondent") || "english";
  };

  const getLanguageFromUrl = () => {
    const params = new URLSearchParams(window.location.search);
    return params.get("language") || "english";
  };

  const [categoryLoading, setCategoryLoading] = useState(false);
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState(false);

  const respondentId = getRespondentIdFromUrl();
  const language = getLanguageFromUrl();
  const { loadingQuestions, surveyList, respondent } = useRespondentList(
    respondentId,
    language
  );

  useEffect(() => {
    if (surveyList.length > 0) {
      const firstIncompleteIndex = surveyList.findIndex(
        (survey) => !survey.isCompleted
      );
      if (firstIncompleteIndex !== -1) {
        setActiveIndex(firstIncompleteIndex);
      }
    }
  }, [surveyList]);

  useEffect(() => {
    const currentSurvey = surveyList[activeIndex];
    if (currentSurvey) {
      const questions = currentSurvey.questions || [];
      const initialOptions = {};
      questions.forEach((q, qIndex) => {
        if (q.type === "multiple-choice") {
          initialOptions[qIndex] = q.previousResponse || [];
        } else if (q.type === "single-choice" || q.type === "open-ended") {
          initialOptions[qIndex] = q.previousResponse || "";
          if (q.options && q.options[0] === "Others...please specify") {
            initialOptions[`${qIndex}_other`] = "";
          }
        }
      });
      setSelectedOptions(initialOptions);
    }
  }, [activeIndex, surveyList]);

  const handleInputChange = (qIndex, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [qIndex]: value,
    }));
  };

  const handleSingleChoiceChange = (qIndex, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [qIndex]: value,
    }));
  };

  const handleMultipleChoiceChange = (qIndex, option) => {
    setSelectedOptions((prevOptions) => {
      const updatedOptions = [...(prevOptions[qIndex] || [])];
      if (updatedOptions.includes(option)) {
        updatedOptions.splice(updatedOptions.indexOf(option), 1);
      } else {
        updatedOptions.push(option);
      }
      return {
        ...prevOptions,
        [qIndex]: updatedOptions,
      };
    });
  };

  const handleOtherOptionChange = (qIndex, value) => {
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [`${qIndex}_other`]: value,
    }));
  };

  const validateSurvey = () => {
    const currentSurvey = surveyList[activeIndex];
    if (currentSurvey) {
      const questions = currentSurvey.questions || [];
      return questions.every((q, qIndex) => {
        if (q.isRequired) {
          const answer = selectedOptions[qIndex];
          if (q.type === "multiple-choice") {
            return answer && answer.length > 0;
          } else if (q.type === "single-choice") {
            return answer && answer !== "";
          } else if (q.type === "open-ended") {
            return answer && answer.trim() !== "";
          }
        }
        return true;
      });
    }
    return false;
  };

  const handleSaveAndContinue = () => {
    setCategoryLoading(true);
    if (validateSurvey()) {
      const currentSurvey = surveyList[activeIndex];
      if (currentSurvey) {
        currentSurvey.questions.forEach((q, qIndex) => {
          if (
            q.type === "single-choice" &&
            selectedOptions[qIndex] === "Others...please specify"
          ) {
            q.options.push(selectedOptions[`${qIndex}_other`]);
          } else {
            q.options.push(selectedOptions[qIndex]);
          }
        });
        currentSurvey.isCompleted = true;

        const nextIncompleteIndex = surveyList.findIndex(
          (survey) => !survey.isCompleted
        );

        if (nextIncompleteIndex !== -1) {
          setActiveIndex(nextIncompleteIndex);
          setSelectedOptions({});
          setErrors(false);
        } else {
          setTimeout(() => {
            setQuestionsVisible(true);
          }, 1600);
          console.log(surveyList);
        }
      } else {
        console.error("Current survey not found.");
      }
    } else {
      setErrors(true);
    }

    setTimeout(() => {
      setCategoryLoading(false);
    }, 1500);
  };

  if (loadingQuestions) {
    return <div>Loading...</div>;
  }

  if (!surveyList || surveyList.length === 0) return null;

  const currentSurvey = surveyList[activeIndex] || {};
  const questions = currentSurvey.questions || [];

  return (
    <>
      <div hidden={questionsVisible}>
        <h1 className="text-3xl font-semibold text-center py-4 text-yellow-700">
          ONT Survey
        </h1>
        <div className="survey-widgets-container w-1/2 p-6 flex flex-row justify-center mx-auto overflow-x-scroll gap-x-2 gap-y-1">
          {surveyList.map((survey, index) => (
            <div
              key={index}
              className={`survey-widget shadow-2xl shadow-slate-700 ${
                activeIndex === index ? "active-widget" : ""
              }
              ${survey.isCompleted ? "cursor-not-allowed" : "cursor-pointer"}`}
              onClick={() => setActiveIndex(index)}
            ></div>
          ))}
        </div>

        <div className="surveys-container sm:px-1 py-9 md:px-6">
          <div className="questions-container py-2">
            <h2 className="text-center text-2xl text-yellow-600 mb-6 font-extrabold">
              {currentSurvey.title}
            </h2>

            {questions.map((q, qIndex) => (
              <div key={qIndex} className="question mb-4 shadow-xl">
                <p className="mb-2">
                  <span className="text-xl font-medium text-yellow-500">
                    {`${qIndex + 1}.`}
                  </span>{" "}
                  {q.content.question}
                </p>

                <div className="input-group px-4 py-6">
                  {q.type === "open-ended" && (
                    <input
                      type="text"
                      className="w-full p-2 border"
                      placeholder="Your answer ..."
                      maxLength={60}
                      value={selectedOptions[qIndex] || ""}
                      onChange={(e) =>
                        handleInputChange(qIndex, e.target.value)
                      }
                      disabled={!!q.previousResponse}
                    />
                  )}

                  {q.type === "single-choice" && (
                    <div>
                      {q.content.responseOptions.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <input
                            type="radio"
                            id={`q${qIndex}-o${oIndex}`}
                            name={q._id}
                            value={option}
                            className="custom-radio mr-2"
                            checked={
                              q.previousResponse
                                ? q.previousResponse.toLowerCase() ===
                                  option.toLowerCase()
                                : selectedOptions[qIndex] === option
                            }
                            onChange={(e) =>
                              handleSingleChoiceChange(qIndex, e.target.value)
                            }
                            disabled={!!q.previousResponse}
                          />
                          <label htmlFor={`q${qIndex}-o${oIndex}`}>
                            {option}
                          </label>
                        </div>
                      ))}
                      {selectedOptions[qIndex] ===
                        "Others...please specify" && (
                        <input
                          type="text"
                          className="w-full p-2 border"
                          placeholder="Please specify"
                          value={selectedOptions[`${qIndex}_other`] || ""}
                          onChange={(e) =>
                            handleOtherOptionChange(qIndex, e.target.value)
                          }
                        />
                      )}
                    </div>
                  )}
                  {q.type === "multiple-choice" && (
                    <div>
                      {q.content.responseOptions.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <input
                            type="checkbox"
                            id={`q${qIndex}-o${oIndex}`}
                            value={option}
                            className="custom-checkbox mr-2"
                            checked={
                              selectedOptions[qIndex] &&
                              selectedOptions[qIndex].includes(option)
                            }
                            onChange={() =>
                              handleMultipleChoiceChange(qIndex, option)
                            }
                            disabled={!!q.previousResponse}
                          />
                          <label htmlFor={`q${qIndex}-o${oIndex}`}>
                            {option}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {errors && (
            <p className="text-red-500 text-center">
              Please answer all questions in the current category.
            </p>
          )}

          <div className="actions-container flex justify-center py-6">
            <Button
              onClick={handleSaveAndContinue}
              variant="contained"
              color="primary"
              disabled={categoryLoading}
            >
              {categoryLoading ? "Saving..." : "Save and Continue"}
            </Button>
          </div>
        </div>
      </div>

      <div hidden={!questionsVisible}>
        <h1 className="text-3xl font-semibold text-center py-4 text-yellow-700">
          Thank you for completing the survey!
        </h1>
        <div className="text-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              window.location.href = "/";
            }}
          >
            Back to Home
          </Button>
        </div>
      </div>
    </>
  );
};

export default Survey;
