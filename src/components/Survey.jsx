import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { List as surveyList } from "./index";

// Extract language from the URL
const getLanguageFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("language") || "english";
};

const getQuestionId = (surveyList, activeIndex, qIndex) => {
  let id = 1;
  for (let i = 0; i < activeIndex; i++) {
    if (surveyList[i].questions) {
      id += surveyList[i].questions[getLanguageFromUrl()].length;
    }
  }
  return id + qIndex;
};

const Survey = () => {
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [questionsVisible, setQuestionsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState(false);

  // Get language from URL
  const language = getLanguageFromUrl();

  useEffect(() => {
    const firstIncompleteIndex = surveyList.findIndex(
      (survey) => !survey.isCompleted
    );
    if (firstIncompleteIndex !== -1) {
      setActiveIndex(firstIncompleteIndex);
    }
  }, []);

  useEffect(() => {
    const currentSurvey = surveyList[activeIndex];
    const initialOptions = {};
    if (currentSurvey) {
      currentSurvey.questions[language].forEach((q, qIndex) => {
        if (q.answers.length > 0) {
          if (q.type === "multiple_choice") {
            initialOptions[qIndex] = q.answers;
          } else {
            initialOptions[qIndex] = q.answers[0] || "";
            if (q.answers[0] === "Others...please specify") {
              initialOptions[`${qIndex}_other`] = q.answers[1] || "";
            }
          }
        }
      });
      setSelectedOptions(initialOptions);
    }
  }, [activeIndex, language]);

  const handleSingleChoiceChange = (qIndex, value) => {
    setSelectedOptions((prev) => ({ ...prev, [qIndex]: value }));
  };

  const handleOtherOptionChange = (qIndex, value) => {
    setSelectedOptions((prev) => ({ ...prev, [`${qIndex}_other`]: value }));
  };

  const handleMultipleChoiceChange = (qIndex, value) => {
    setSelectedOptions((prev) => {
      const currentValues = prev[qIndex] || [];
      return {
        ...prev,
        [qIndex]: currentValues.includes(value)
          ? currentValues.filter((v) => v !== value)
          : [...currentValues, value],
      };
    });
  };

  const handleInputChange = (qIndex, value) => {
    setSelectedOptions((prev) => ({ ...prev, [qIndex]: value }));
  };

  const validateSurvey = () => {
    const currentSurvey = surveyList[activeIndex];
    const isValid = currentSurvey.questions[language].every((q, qIndex) => {
      if (q.type === "open") {
        return selectedOptions[qIndex] && selectedOptions[qIndex].trim() !== "";
      } else if (q.type === "single_choice") {
        return (
          selectedOptions[qIndex] !== undefined &&
          (selectedOptions[qIndex] !== "Others...please specify" ||
            selectedOptions[`${qIndex}_other`])
        );
      } else if (q.type === "multiple_choice") {
        return selectedOptions[qIndex] && selectedOptions[qIndex].length > 0;
      }
      return false;
    });

    setErrors(!isValid);
    return isValid;
  };

  const handleSaveAndContinue = () => {
    setCategoryLoading(true);
    if (validateSurvey()) {
      const currentSurvey = surveyList[activeIndex];
      currentSurvey.questions[language].forEach((q, qIndex) => {
        if (
          q.type === "single_choice" &&
          selectedOptions[qIndex] === "Others...please specify"
        ) {
          q.answers.push(selectedOptions[`${qIndex}_other`]);
        } else {
          q.answers.push(selectedOptions[qIndex]);
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
      console.error("Please answer all questions in the current category.");
    }

    setTimeout(() => {
      setCategoryLoading(false);
    }, 1500);
  };

  const isLastSurvey = activeIndex === surveyList.length - 1;

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
              {surveyList[activeIndex].title}
            </h2>

            {surveyList[activeIndex].questions[language].map((q, qIndex) => (
              <div key={qIndex} className="question mb-4 shadow-xl">
                <p className="mb-2">
                  <span className="text-xl font-medium text-yellow-500">
                    {getQuestionId(surveyList, activeIndex, qIndex)}
                  </span>
                  . {q.question}
                </p>

                <div className="input-group px-4 py-6">
                  {q.type === "open" && (
                    <input
                      type={q.field}
                      className="w-full p-2 border"
                      value={selectedOptions[qIndex] || ""}
                      onChange={(e) =>
                        handleInputChange(qIndex, e.target.value)
                      }
                      placeholder="Your answer ..."
                      maxLength={q.field === "number" ? "999999" : q.limit}
                    />
                  )}
                  {q.type === "single_choice" && (
                    <div>
                      {q.options.map((option, oIndex) => (
                        <div key={oIndex} className="flex items-center mb-2">
                          <input
                            type="radio"
                            id={`q${qIndex}-o${oIndex}`}
                            name={`q${qIndex}`}
                            value={option}
                            className="custom-radio mr-2"
                            checked={selectedOptions[qIndex] === option}
                            onChange={(e) =>
                              handleSingleChoiceChange(qIndex, e.target.value)
                            }
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
                  {q.type === "multiple_choice" && (
                    <div>
                      {q.options.map((option, oIndex) => (
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

          <div className="button-list block float-right p-3">
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAndContinue}
              disabled={categoryLoading}
            >
              {!categoryLoading ? (
                <span>
                  {isLastSurvey ? "Finish Survey" : "Save & Continue"}
                </span>
              ) : (
                <span className="material-symbols-outlined spinner">
                  progress_activity
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div
        className={`p-4 text-xl w-full h-screen place-items-center justify-center items-center text-green-600 text-center ${
          questionsVisible ? "flex" : "hidden"
        }`}
      >
        <span className="material-symbols-outlined text-green-600 text-center">
          task_alt
        </span>
        Survey Completed Successfully!
      </div>
    </>
  );
};

export default Survey;
