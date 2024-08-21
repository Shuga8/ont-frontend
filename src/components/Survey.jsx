import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { List as surveyList } from "./index";

const getQuestionId = (surveyList, activeIndex, qIndex) => {
  let id = 1;
  for (let i = 0; i < activeIndex; i++) {
    id += surveyList[i].questions.length;
  }
  return id + qIndex;
};

const Survey = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    const firstIncompleteIndex = surveyList.findIndex(
      (survey) => !survey.isCompleted
    );
    if (firstIncompleteIndex !== -1) {
      setActiveIndex(firstIncompleteIndex);
    }
  }, []);

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
    const isValid = currentSurvey.questions.every((q, qIndex) => {
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
    if (validateSurvey()) {
      const currentSurvey = surveyList[activeIndex];
      currentSurvey.questions.forEach((q, qIndex) => {
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
        console.log("The survey has finished.");
      }
    } else {
      console.error("Please answer all questions in the current category.");
    }
  };

  const isLastSurvey = activeIndex === surveyList.length - 1;

  return (
    <div>
      <h1 className="text-3xl text-center py-4 text-cyan-600">ONT Survey</h1>
      <div className="survey-widgets-container w-1/2 p-6 flex flex-row justify-center mx-auto overflow-x-scroll gap-1">
        {surveyList.map((survey, index) => (
          <div
            key={index}
            className={`survey-widget ${
              activeIndex === index && !survey.isCompleted
                ? "active-widget"
                : ""
            } ${survey.isCompleted ? "cursor-not-allowed" : "cursor-pointer"}`}
            onClick={() => {
              if (!survey.isCompleted) setActiveIndex(index);
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>

      <div className="surveys-container sm:px-1 py-9 md:px-6">
        <div className="questions-container py-2">
          <h2 className="text-center text-2xl text-cyan-600 mb-6 font-extrabold">
            {surveyList[activeIndex].title}
          </h2>
          {surveyList[activeIndex].questions.map((q, qIndex) => (
            <div key={qIndex} className="question mb-4">
              <p className="mb-2">
                <span className="text-xl font-medium text-gray-500">
                  {getQuestionId(surveyList, activeIndex, qIndex)}
                </span>
                . {q.question}
              </p>

              <div className="input-group px-4 py-6">
                {q.type === "open" && (
                  <input
                    type="text"
                    className="w-full p-2 border"
                    value={selectedOptions[qIndex] || ""}
                    onChange={(e) => handleInputChange(qIndex, e.target.value)}
                    placeholder="Your answer ..."
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
                    {selectedOptions[qIndex] === "Others...please specify" && (
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
          >
            {isLastSurvey ? "Finish Survey" : "Save & Continue"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Survey;
