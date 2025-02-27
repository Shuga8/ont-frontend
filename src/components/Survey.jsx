import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import useRespondentList from "../hooks/useRespondentList";
import { ErrorToast } from "./Admin/index";
import { SuccessToast } from "./Admin/index";
import { useAuthContext } from "../hooks/useAuthContext";
import Preloader from "./Admin/Widgets/Preloader";
import { useNavigate } from "react-router-dom";
import Message from "./Admin/Widgets/Message";
import { TiInputCheckedOutline } from "react-icons/ti";
import { config } from "../../config/config";

const Survey = () => {
  const { user } = useAuthContext();
  const { goodbye } = Message();
  const navigate = useNavigate();
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
  const [surveyError, setSurveyError] = useState(null);
  const [surveySuccess, setSurveySuccess] = useState(null);
  const [isErrorActive, setErrorActive] = useState(false);
  const [isSuccessActive, setSuccessActive] = useState(false);
  const [openVisible, setOpenVisible] = useState(true);

  const respondentId = getRespondentIdFromUrl();
  const language = getLanguageFromUrl();
  const { loadingQuestions, surveyList, respondent } = useRespondentList(
    respondentId,
    language
  );
  const others_text =
    "Others…………………. Please specify (Text box - 50 Characters)";

  useEffect(() => {
    if (surveyError) {
      setErrorActive(true);
      const timer = setTimeout(() => {
        setErrorActive(false);
        setSurveyError(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
    if (surveySuccess) {
      setSuccessActive(true);
      const timer = setTimeout(() => {
        setSuccessActive(false);
        setSurveySuccess(null);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [surveyError, surveySuccess]);

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
          if (
            q.content.responseOptions &&
            q.content.responseOptions[0] ===
              "Others…………………. Please specify (Text box - 50 Characters)"
          ) {
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

  const handleSingleChoiceChange = (qIndex, option) => {
    option = option.toString();
    if (option === undefined) {
      console.error("Option value is undefined");
      return;
    }
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [qIndex]: option.toLowerCase() ?? 0,
    }));
  };

  const handleMultipleChoiceChange = (qIndex, option) => {
    if (option === others_text) {
      if (selectedOptions[qIndex].includes(option)) {
        // Remove "Others" from the selected options
        setSelectedOptions((prevOptions) => {
          const updatedOptions = [...(prevOptions[qIndex] || [])];
          updatedOptions.splice(updatedOptions.indexOf(option), 1);
          return {
            ...prevOptions,
            [qIndex]: updatedOptions,
          };
        });
      } else {
        // Add "Others" to the selected options
        setSelectedOptions((prevOptions) => {
          return {
            ...prevOptions,
            [qIndex]: [option],
            [`${qIndex}_other`]: "",
          };
        });
      }
    } else {
      // If a different option is selected, remove "Others" from the selected options
      if (selectedOptions[qIndex]?.includes(others_text)) {
        setSelectedOptions((prevOptions) => {
          const updatedOptions = [...(prevOptions[qIndex] || [])];
          updatedOptions.splice(updatedOptions.indexOf(others_text), 1);
          return {
            ...prevOptions,
            [qIndex]: updatedOptions,
          };
        });
      }
      // Add the new option to the selected options
      setSelectedOptions((prevOptions) => {
        const updatedOptions = [...(prevOptions[qIndex] || [])];
        if (!updatedOptions.includes(option)) {
          updatedOptions.push(option);
        } else {
          updatedOptions.splice(updatedOptions.indexOf(option), 1);
        }

        return {
          ...prevOptions,
          [qIndex]: updatedOptions,
        };
      });
    }
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

          let isValid = false;

          if (q.type === "multiple-choice") {
            if (
              q.slug === "SQ404" &&
              selectedOptions[qIndex].includes(
                q.meta.conditions.respondToIfEquals.ifValueEquals
              ) &&
              selectedOptions[qIndex].length > 1
            ) {
              isValid = false;
            } else {
              isValid = answer && answer.length > 0;
            }
          } else if (q.type === "single-choice") {
            isValid = answer && answer !== "";
          } else if (q.type === "open-ended") {
            isValid = answer && answer !== "";
          }

          if (q?.meta?.conditions?.respondToIfEquals) {
            const nestedQuestion =
              q.meta.conditions.respondToIfEquals?.question;
            // console.log(q?.meta?.conditions?.respondToIfEquals?.question);

            if (nestedQuestion.isRequired) {
              if (q.slug == "SQ404") {
                if (
                  selectedOptions[qIndex].includes(
                    q.meta.conditions.respondToIfEquals.ifValueEquals
                  )
                ) {
                  const nestedAnswer = selectedOptions[nestedQuestion.slug];
                  if (nestedQuestion.type === "multiple-choice") {
                    isValid =
                      nestedAnswer &&
                      nestedAnswer.length > 0 &&
                      nestedAnswer !== undefined;
                  } else if (nestedQuestion.type === "single-choice") {
                    isValid =
                      nestedAnswer &&
                      nestedAnswer !== "" &&
                      nestedAnswer !== undefined;
                  } else if (nestedQuestion.type === "open-ended") {
                    isValid =
                      nestedAnswer &&
                      nestedAnswer !== "" &&
                      nestedAnswer !== undefined;
                  }
                }
              } else {
                // console.log(nestedQuestion);
                const nestedAnswer = selectedOptions[nestedQuestion.slug];
                if (nestedQuestion.type === "multiple-choice") {
                  isValid =
                    nestedAnswer &&
                    nestedAnswer.length > 0 &&
                    nestedAnswer !== undefined;
                } else if (nestedQuestion.type === "single-choice") {
                  isValid =
                    nestedAnswer &&
                    nestedAnswer !== "" &&
                    nestedAnswer !== undefined;
                } else if (nestedQuestion.type === "open-ended") {
                  isValid =
                    nestedAnswer &&
                    nestedAnswer !== "" &&
                    nestedAnswer !== undefined;
                }
              }
            }
          }

          return isValid;
        }
        return true;
      });
    }
    return false;
  };

  const handleSaveAndContinue = async () => {
    setCategoryLoading(true);
    setErrors(false);
    let hasError = false;
    if (validateSurvey()) {
      const currentSurvey = surveyList[activeIndex];
      if (currentSurvey) {
        const res = {
          respondent: getRespondentIdFromUrl(),
          language: getLanguageFromUrl(),
          category: currentSurvey._id,
        };
        const response = [];
        currentSurvey.questions.forEach((q, qIndex) => {
          if (
            q.type === "single-choice" &&
            selectedOptions[qIndex] === others_text?.toLowerCase()
          ) {
            // q.previousResponse = selectedOptions[`${qIndex}_other`];

            if (
              selectedOptions[`${qIndex}_other`]?.trim() == "" ||
              selectedOptions[`${qIndex}_other`]?.trim() == undefined ||
              selectedOptions[`${qIndex}_other`]?.trim() == null
            ) {
              hasError = true;
            }
            if (q?.meta?.conditions?.respondToIfEquals) {
              const nestedQuestion =
                q?.meta?.conditions?.respondToIfEquals?.question;

              response.push({
                question: q._id,
                answer: Array.isArray(selectedOptions[`${qIndex}_other`])
                  ? selectedOptions[`${qIndex}_other`].join(", ")
                  : selectedOptions[`${qIndex}_other`],
              });
              response.push({
                question: nestedQuestion._id,
                answer: Array.isArray(selectedOptions[`${nestedQuestion.slug}`])
                  ? selectedOptions[`${nestedQuestion.slug}`].join(", ")
                  : selectedOptions[`${nestedQuestion.slug}`],
              });
            } else {
              response.push({
                question: q._id,
                answer: Array.isArray(selectedOptions[`${qIndex}_other`])
                  ? selectedOptions[`${qIndex}_other`].join(", ")
                  : selectedOptions[`${qIndex}_other`],
              });
            }
          } else if (
            q.type === "multiple-choice" &&
            selectedOptions[qIndex]
              .map((option) => option.toLowerCase())
              .includes(others_text?.toLowerCase())
          ) {
            // q.previousResponse = selectedOptions[qIndex];

            if (
              selectedOptions[`${qIndex}_other`]?.trim() == "" ||
              selectedOptions[`${qIndex}_other`]?.trim() == undefined ||
              selectedOptions[`${qIndex}_other`]?.trim() == null
            ) {
              hasError = true;
            }

            response.push({
              question: q._id,
              answer: Array.isArray(selectedOptions[`${qIndex}_other`])
                ? selectedOptions[`${qIndex}_other`].join(", ")
                : selectedOptions[`${qIndex}_other`],
            });
          } else {
            if (q?.meta?.conditions?.respondToIfEquals) {
              if (q.slug == "SQ404") {
                if (
                  selectedOptions[qIndex].includes(
                    q.meta.conditions.respondToIfEquals.ifValueEquals
                  ) &&
                  selectedOptions[qIndex].length === 1
                ) {
                  const nestedQuestion =
                    q?.meta?.conditions?.respondToIfEquals?.question;
                  // q.previousResponse = selectedOptions[qIndex];
                  response.push({
                    question: q._id,
                    answer: Array.isArray(selectedOptions[qIndex])
                      ? selectedOptions[qIndex].join(", ")
                      : selectedOptions[qIndex],
                  });
                  response.push({
                    question: nestedQuestion._id,
                    answer: Array.isArray(
                      selectedOptions[`${nestedQuestion.slug}`]
                    )
                      ? selectedOptions[`${nestedQuestion.slug}`].join(", ")
                      : selectedOptions[`${nestedQuestion.slug}`],
                  });

                  if (nestedQuestion?.meta?.conditions?.respondToIfEquals) {
                    const inner =
                      nestedQuestion?.meta?.conditions?.respondToIfEquals;
                    const innerQ = inner.question;

                    response.push({
                      question: innerQ._id,
                      answer: Array.isArray(selectedOptions[`${innerQ.slug}`])
                        ? selectedOptions[`${innerQ.slug}`].join(", ")
                        : selectedOptions[`${innerQ.slug}`],
                    });
                  }
                } else {
                  response.push({
                    question: q._id,
                    answer: Array.isArray(selectedOptions[qIndex])
                      ? selectedOptions[qIndex].join(", ")
                      : selectedOptions[qIndex],
                  });
                }
              } else {
                const nestedQuestion =
                  q?.meta?.conditions?.respondToIfEquals?.question;
                // q.previousResponse = selectedOptions[qIndex];
                response.push({
                  question: q._id,
                  answer: Array.isArray(selectedOptions[qIndex])
                    ? selectedOptions[qIndex].join(", ")
                    : selectedOptions[qIndex],
                });
                response.push({
                  question: nestedQuestion._id,
                  answer: Array.isArray(
                    selectedOptions[`${nestedQuestion.slug}`]
                  )
                    ? selectedOptions[`${nestedQuestion.slug}`].join(", ")
                    : selectedOptions[`${nestedQuestion.slug}`],
                });

                if (nestedQuestion?.meta?.conditions?.respondToIfEquals) {
                  const inner =
                    nestedQuestion?.meta?.conditions?.respondToIfEquals;
                  const innerQ = inner.question;

                  response.push({
                    question: innerQ._id,
                    answer: Array.isArray(selectedOptions[`${innerQ.slug}`])
                      ? selectedOptions[`${innerQ.slug}`].join(", ")
                      : selectedOptions[`${innerQ.slug}`],
                  });
                }
              }
            } else {
              // q.previousResponse = selectedOptions[qIndex];
              response.push({
                question: q._id,
                answer: Array.isArray(selectedOptions[qIndex])
                  ? selectedOptions[qIndex].join(", ")
                  : selectedOptions[qIndex],
              });
            }
          }
        });

        if (hasError) {
          setErrors(true);

          setCategoryLoading(false);
          return;
        }

        res.responses = response;
        // console.log(selectedOptions);
        // console.log(res);
        // setTimeout(() => {
        //   setCategoryLoading(false);
        // }, 1500);
        // return;

        await submitResponse(res);

        currentSurvey.isCompleted = true;

        const nextIncompleteIndex = surveyList.findIndex(
          (survey) => !survey.isCompleted
        );

        if (nextIncompleteIndex !== -1) {
          setActiveIndex(nextIncompleteIndex);
          setSelectedOptions({});
          window.scrollTo(0, 0);
          setErrors(false);
        } else {
          setTimeout(() => {
            setQuestionsVisible(true);
          }, 1600);
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

  const submitResponse = async (data) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", `Bearer ${user.token}`);

    const { url } = config();

    const reqBody = JSON.stringify(data);
    const response = await fetch(`${url}/v1/surveys`, {
      method: "POST",
      headers: myHeaders,
      body: reqBody,
    });

    const result = await response.json();

    if (!response.ok) {
      if (result.error.message) {
        setSurveyError(result.error.message);
      } else {
        setSurveyError(result.message);
      }
    } else {
      setSurveySuccess("Category completed successfully");
    }
  };

  const call_multiple_nested = (q, qIndex) => {
    const nested = q.meta.conditions.respondToIfEquals;
    const nestedQuestion = nested?.question;

    // console.log(nested);
    if (
      (selectedOptions[qIndex].includes(nested.ifValueEquals) &&
        selectedOptions[qIndex].length > 1) ||
      !selectedOptions[qIndex].includes(nested.ifValueEquals)
    )
      return;
    return (
      <div className="px-2 py-2">
        <div className="my-2 text-gray-500 text-xs font-medium">
          {nestedQuestion.question}{" "}
          {nestedQuestion.isRequired == true ? (
            <span className="text-red-500 text-base font-bold"> *</span>
          ) : (
            <span className="text-green-500 text-xs font-bold">
              {" "}
              (optional)
            </span>
          )}
        </div>

        <div className="input-group px-2">
          {nestedQuestion.type === "multiple-choice" && (
            <div>
              {nestedQuestion.responseOptions.map((option, oIndex) => (
                <div key={oIndex} className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`q${nestedQuestion.slug}-o${oIndex}`}
                    value={option}
                    className="custom-checkbox mr-2"
                    checked={
                      (selectedOptions[nestedQuestion.slug] &&
                        selectedOptions[nestedQuestion.slug].includes(
                          option
                        )) ||
                      (selectedOptions[qIndex] &&
                      selectedOptions[qIndex].toLowerCase() ===
                        nested.ifValueEquals?.toLowerCase()
                        ? option === nestedQuestion.responseOptions[0]
                        : false)
                    }
                    onChange={() => {
                      if (
                        option ===
                        "Others…………………. Please specify (Text box - 50 Characters)"
                      ) {
                        if (
                          selectedOptions[nestedQuestion.slug].includes(option)
                        ) {
                          // Remove "Others" from the selected options
                          handleMultipleChoiceChange(
                            nestedQuestion.slug,
                            option,
                            false
                          );
                        } else {
                          // Add "Others" to the selected options
                          handleMultipleChoiceChange(
                            nestedQuestion.slug,
                            option,
                            true
                          );
                        }
                      } else {
                        handleMultipleChoiceChange(nestedQuestion.slug, option);
                      }
                    }}
                    // disabled={!!q.previousResponse}
                  />
                  <label htmlFor={`q${nestedQuestion.slug}-o${oIndex}`}>
                    {option}
                  </label>
                </div>
              ))}
            </div>
          )}

          {nestedQuestion.type === "single-choice" && (
            <div>
              {nestedQuestion.responseOptions.map((option, oIndex) => {
                // console.log(selectedOptions[nestedQuestion.slug]);

                return (
                  <div key={oIndex} className="flex items-center mb-2">
                    <input
                      type="radio"
                      id={`q${nestedQuestion.slug}-o${oIndex}`}
                      name={nestedQuestion.slug}
                      value={option.toLowerCase()}
                      className="custom-radio mr-2"
                      checked={
                        selectedOptions[nestedQuestion.slug] ===
                        option.toLowerCase()
                      }
                      onChange={(e) => {
                        // console.log(e.target.value);
                        if (
                          e.target.value.toLowerCase() ===
                          others_text.toLowerCase()
                        ) {
                          setSelectedOptions((prevOptions) => ({
                            ...prevOptions,
                            [nestedQuestion.slug]: e.target.value,
                            [`${nestedQuestion.slug}_other`]: "",
                          }));
                        } else {
                          handleSingleChoiceChange(
                            nestedQuestion.slug,
                            e.target.value
                          );
                        }
                      }}
                      // disabled={!!q.previousResponse}
                    />
                    <label htmlFor={`q${nestedQuestion.slug}-o${oIndex}`}>
                      {option}
                    </label>
                  </div>
                );
              })}
            </div>
          )}

          {nestedQuestion.type === "open-ended" && (
            <input
              type={
                nestedQuestion.meta && nestedQuestion.meta.formType
                  ? nestedQuestion.meta.formType === "date"
                    ? "date"
                    : nestedQuestion.meta.formType === "date-time"
                    ? "datetime-local"
                    : nestedQuestion.meta.formType === "number"
                    ? "number"
                    : "text"
                  : "text"
              }
              className="w-full p-2 border"
              placeholder="Your answer"
              {...(nestedQuestion.meta &&
              nestedQuestion.meta.formType === "number" &&
              nestedQuestion.meta.numberRange
                ? {
                    min: nestedQuestion.meta.numberRange?.min,
                    max: nestedQuestion.meta.numberRange?.max,
                  }
                : {})}
              {...(nestedQuestion.meta && nestedQuestion.meta.charLength
                ? {
                    maxLength: nestedQuestion.meta.charLength,
                  }
                : {})}
              value={
                nestedQuestion.meta && nestedQuestion.meta.formType === "date"
                  ? (selectedOptions[nestedQuestion.slug] || "").slice(0, 10)
                  : nestedQuestion.meta &&
                    nestedQuestion.meta?.formType === "date-time"
                  ? (selectedOptions[nestedQuestion.slug] || "").slice(0, 16)
                  : selectedOptions[nestedQuestion.slug] || ""
              }
              onChange={(e) => {
                handleInputChange(qIndex, e.target.value);
              }}
              onKeyUp={(e) => {
                if (
                  nestedQuestion?.meta &&
                  nestedQuestion?.meta?.numberRange &&
                  nestedQuestion?.meta?.numberRange?.min
                ) {
                  let min = nestedQuestion?.meta?.numberRange?.min;
                  let max = nestedQuestion?.meta?.numberRange?.max;
                  if (nestedQuestion?.meta?.numberRange) {
                    let value = parseInt(e.target.value);
                    if (value < min || value > max) {
                      e.target.value = value < min ? min : max;
                    }
                  }
                }
              }}
              {...((q.meta && q.meta.formType === "date") ||
              q.meta.formType === "date-time"
                ? {
                    max: new Date().toISOString().slice(0, 10),
                  }
                : {})}
              // disabled={!!q.previousResponse}
            />
          )}

          {nestedQuestion &&
            selectedOptions[nestedQuestion.slug] &&
            nestedQuestion?.meta?.conditions?.respondToIfEquals &&
            (() => {
              const inner = nestedQuestion?.meta?.conditions?.respondToIfEquals;
              const innerQ = inner.question;

              function callOpen(parentQ, nested, nestedQuestion) {
                return (
                  <input
                    type={
                      nestedQuestion.meta && nestedQuestion.meta.formType
                        ? nestedQuestion.meta.formType === "date"
                          ? "date"
                          : nestedQuestion.meta.formType === "date-time"
                          ? "datetime-local"
                          : nestedQuestion.meta.formType === "number"
                          ? "number"
                          : "text"
                        : "text"
                    }
                    className="w-full p-2 border"
                    placeholder="Your answer"
                    {...(nestedQuestion.meta &&
                    nestedQuestion.meta.formType === "number" &&
                    nestedQuestion.meta.numberRange
                      ? {
                          min: nestedQuestion.meta.numberRange?.min,
                          max: nestedQuestion.meta.numberRange?.max,
                        }
                      : {})}
                    {...(nestedQuestion.meta && nestedQuestion.meta.charLength
                      ? {
                          maxLength: nestedQuestion.meta.charLength,
                        }
                      : {})}
                    value={
                      nestedQuestion.meta &&
                      nestedQuestion.meta.formType === "date"
                        ? (selectedOptions[nestedQuestion.slug] || "").slice(
                            0,
                            10
                          )
                        : nestedQuestion.meta &&
                          nestedQuestion.meta?.formType === "date-time"
                        ? (selectedOptions[nestedQuestion.slug] || "").slice(
                            0,
                            16
                          )
                        : nested.ifValueEquals?.toLowerCase() ==
                          selectedOptions[parentQ.slug]?.toLowerCase()
                        ? nested?.defaultResponseIfValue
                        : selectedOptions[nestedQuestion.slug] || ""
                    }
                    onChange={(e) => {
                      handleInputChange(nestedQuestion.slug, e.target.value);
                    }}
                    onKeyUp={(e) => {
                      let min = nestedQuestion?.meta?.numberRange?.min;
                      let max = nestedQuestion?.meta?.numberRange?.max;

                      let value = parseInt(e.target.value);
                      if (value < min || value > max) {
                        e.target.value = value < min ? min : max;
                      }
                    }}
                    {...((q.meta && q.meta.formType === "date") ||
                    q.meta.formType === "date-time"
                      ? {
                          max: new Date().toISOString().slice(0, 10),
                        }
                      : {})}
                    // disabled={!!q.previousResponse}
                  />
                );
              }

              return (
                <div className="px-2 py-2">
                  <div className="my-2 text-gray-500 text-xs font-medium">
                    {innerQ.question}{" "}
                    {innerQ.isRequired == true ? (
                      <span className="text-red-500 text-base font-bold">
                        {" "}
                        *
                      </span>
                    ) : (
                      <span className="text-green-500 text-xs font-bold">
                        {" "}
                        (optional)
                      </span>
                    )}
                  </div>

                  {callOpen(nestedQuestion, inner, innerQ)}
                </div>
              );
            })()}
        </div>
      </div>
    );
  };

  const call_single_nested = (q, qIndex) => {
    const nested = q.meta.conditions.respondToIfEquals;
    const nestedQuestion = nested?.question;

    return (
      <div className="px-2 py-2">
        {(q.slug === "SQ300" || q.slug == "SQ407") &&
        selectedOptions[qIndex]?.toLowerCase() === "no" ? (
          <div>
            {q.slug === "SQ407" && (
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="radio"
                    id={`q${nestedQuestion.slug}-o1`}
                    value={nested.defaultResponseIfValue}
                    className="custom-radio mr-2"
                    onChange={() => {
                      handleSingleChoiceChange(
                        nestedQuestion.slug,
                        nested.defaultResponseIfValue
                      );
                    }}
                  />

                  <label htmlFor={`q${nestedQuestion.slug}-o1`}>
                    {nested.defaultResponseIfValue}{" "}
                    <span className="text-red-800">(*)</span>
                  </label>
                </div>
              </div>
            )}
            {q.slug === "SQ300" && (
              <div>
                <div className="flex items-center mb-2">
                  <input
                    type="checkbox"
                    id={`q${nestedQuestion.slug}-o1`}
                    value={nested.defaultResponseIfValue}
                    className="custom-checkbox mr-2"
                    // checked={nested.defaultResponseIfValue}
                    // disabled={!!nested.defaultResponseIfValue}
                    onChange={() => {
                      handleMultipleChoiceChange(
                        nestedQuestion.slug,
                        nested.defaultResponseIfValue
                      );
                    }}
                  />

                  <label htmlFor={`q${nestedQuestion.slug}-o1`}>
                    {nested.defaultResponseIfValue}{" "}
                    <span className="text-red-800">(*)</span>
                  </label>
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="my-2 text-gray-500 text-xs font-medium">
              {nestedQuestion.question}{" "}
              {nestedQuestion.isRequired == true ? (
                <span className="text-red-500 text-base font-bold"> *</span>
              ) : (
                <span className="text-green-500 text-xs font-bold">
                  {" "}
                  (optional)
                </span>
              )}
            </div>

            <div className="input-group px-2">
              {nestedQuestion.type === "multiple-choice" && (
                <div>
                  {nestedQuestion.responseOptions.map((option, oIndex) => (
                    <div key={oIndex} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        id={`q${nestedQuestion.slug}-o${oIndex}`}
                        value={option}
                        className="custom-checkbox mr-2"
                        checked={
                          (selectedOptions[nestedQuestion.slug] &&
                            selectedOptions[nestedQuestion.slug].includes(
                              option
                            )) ||
                          (selectedOptions[qIndex] &&
                          selectedOptions[qIndex].toLowerCase() ===
                            nested.ifValueEquals?.toLowerCase()
                            ? option === nestedQuestion.responseOptions[0]
                            : "")
                        }
                        onChange={() => {
                          if (option === others_text) {
                            if (
                              selectedOptions[nestedQuestion.slug].includes(
                                option
                              )
                            ) {
                              handleMultipleChoiceChange(
                                nestedQuestion.slug,
                                option,
                                false
                              );
                            } else {
                              handleMultipleChoiceChange(
                                nestedQuestion.slug,
                                option,
                                true
                              );
                            }
                          } else {
                            handleMultipleChoiceChange(
                              nestedQuestion.slug,
                              option
                            );
                          }
                        }}
                        // disabled={!!q.previousResponse}
                      />
                      <label htmlFor={`q${nestedQuestion.slug}-o${oIndex}`}>
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              )}

              {nestedQuestion.type === "single-choice" && (
                <div>
                  {nestedQuestion.responseOptions.map((option, oIndex) => {
                    // console.log(selectedOptions[nestedQuestion.slug]);

                    return (
                      <div key={oIndex} className="flex items-center mb-2">
                        <input
                          type="radio"
                          id={`q${nestedQuestion.slug}-o${oIndex}`}
                          name={nestedQuestion.slug}
                          value={option.toLowerCase()}
                          className="custom-radio mr-2"
                          checked={
                            selectedOptions[nestedQuestion.slug] ===
                            option.toLowerCase()
                          }
                          onChange={(e) => {
                            // console.log(e.target.value);
                            if (
                              e.target.value.toLowerCase() ===
                              others_text.toLowerCase()
                            ) {
                              setSelectedOptions((prevOptions) => ({
                                ...prevOptions,
                                [nestedQuestion.slug]: e.target.value,
                                [`${nestedQuestion.slug}_other`]: "",
                              }));
                            } else {
                              handleSingleChoiceChange(
                                nestedQuestion.slug,
                                e.target.value
                              );
                            }
                          }}
                          // disabled={!!q.previousResponse}
                        />
                        <label htmlFor={`q${nestedQuestion.slug}-o${oIndex}`}>
                          {option}
                        </label>
                      </div>
                    );
                  })}
                </div>
              )}

              {nestedQuestion.type === "open-ended" && (
                <input
                  type={
                    nestedQuestion.meta && nestedQuestion.meta.formType
                      ? nestedQuestion.meta.formType === "date"
                        ? "date"
                        : nestedQuestion.meta.formType === "date-time"
                        ? "datetime-local"
                        : nestedQuestion.meta.formType === "number"
                        ? "number"
                        : "text"
                      : "text"
                  }
                  className="w-full p-2 border"
                  placeholder="Your answer"
                  {...(nestedQuestion.meta &&
                  nestedQuestion.meta.formType === "number" &&
                  nestedQuestion.meta.numberRange
                    ? {
                        min: nestedQuestion.meta.numberRange?.min,
                        max: nestedQuestion.meta.numberRange?.max,
                      }
                    : {})}
                  {...(nestedQuestion.meta && nestedQuestion.meta.charLength
                    ? {
                        maxLength: nestedQuestion.meta.charLength,
                      }
                    : {})}
                  value={
                    nestedQuestion.meta &&
                    nestedQuestion.meta.formType === "date"
                      ? (selectedOptions[nestedQuestion.slug] || "").slice(
                          0,
                          10
                        )
                      : nestedQuestion.meta &&
                        nestedQuestion.meta?.formType === "date-time"
                      ? (selectedOptions[nestedQuestion.slug] || "").slice(
                          0,
                          16
                        )
                      : selectedOptions[nestedQuestion.slug] || ""
                  }
                  onChange={(e) => {
                    handleInputChange(qIndex, e.target.value);
                  }}
                  onKeyUp={(e) => {
                    if (
                      nestedQuestion?.meta &&
                      nestedQuestion?.meta?.numberRange &&
                      nestedQuestion?.meta?.numberRange?.min
                    ) {
                      let min = nestedQuestion?.meta?.numberRange?.min;
                      let max = nestedQuestion?.meta?.numberRange?.max;
                      if (nestedQuestion?.meta?.numberRange) {
                        let value = parseInt(e.target.value);
                        if (value < min || value > max) {
                          e.target.value = value < min ? min : max;
                        }
                      }
                    }
                  }}
                  {...((q.meta && q.meta.formType === "date") ||
                  q.meta.formType === "date-time"
                    ? {
                        max: new Date().toISOString().slice(0, 10),
                      }
                    : {})}
                  // disabled={!!q.previousResponse}
                />
              )}
            </div>
          </>
        )}
      </div>
    );
  };

  if (loadingQuestions) {
    return <Preloader isVisible={true} />;
  }

  if (!surveyList || surveyList.length === 0) return null;

  const currentSurvey = surveyList[activeIndex] || {};
  const questions = currentSurvey.questions || [];

  return (
    <>
      <ErrorToast isActive={isErrorActive} message={surveyError} />
      <SuccessToast isActive={isSuccessActive} message={surveySuccess} />
      <div hidden={questionsVisible}>
        <h1 className="text-3xl font-semibold text-center py-4 text-yellow-700">
          ONT Survey
        </h1>
        {/* <div className="survey-widgets-container w-1/2 p-6 flex flex-row justify-center mx-auto overflow-x-scroll gap-x-2 gap-y-1">
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
        </div> */}

        <div className="surveys-container sm:px-1 py-9 md:px-6">
          <div className="questions-container py-2">
            <h2 className="text-center text-2xl text-yellow-600 mb-6 font-extrabold">
              {currentSurvey.title}
            </h2>

            {questions.map((q, qIndex) => (
              <>
                <div key={qIndex} className="question mb-4 shadow-xl">
                  <p className="mb-2">
                    <span className="text-xl font-medium text-yellow-500">
                      {`${qIndex + 1}.`}
                    </span>{" "}
                    {q.content.question}
                    {q.isRequired == true ? (
                      <span className="text-red-500 text-base font-bold">
                        {" "}
                        *
                      </span>
                    ) : (
                      <span className="text-green-500 text-xs font-bold">
                        {" "}
                        (optional)
                      </span>
                    )}
                  </p>

                  <div className="input-group px-4 py-6">
                    {q.type === "open-ended" && (
                      <input
                        type={
                          q?.meta && q?.meta?.formType
                            ? q?.meta?.formType === "date"
                              ? "date"
                              : q?.meta?.formType === "date-time"
                              ? "datetime-local"
                              : q?.meta?.formType === "number"
                              ? "number"
                              : "text"
                            : "text"
                        }
                        className="w-full p-2 border"
                        placeholder="Your answer"
                        {...(q.meta &&
                        q.meta.formType === "number" &&
                        q.meta.numberRange
                          ? {
                              min: q.meta.numberRange.min,
                              max: q.meta.numberRange.max,
                            }
                          : {})}
                        {...(q.meta && q.meta?.formType === "number"
                          ? {
                              pattern:
                                `[${q.meta?.numberRange?.min}-${q.meta?.numberRange?.max}]{1}` ??
                                "[0-9]",
                            }
                          : {})}
                        {...(q.meta && q.meta.charLength
                          ? { maxLength: q.meta.charLength }
                          : {})}
                        value={
                          q?.meta && q.meta?.formType === "date"
                            ? (selectedOptions[qIndex] || "").slice(0, 10)
                            : q?.meta && q?.meta?.formType === "date-time"
                            ? (selectedOptions[qIndex] || "").slice(0, 16)
                            : selectedOptions[qIndex] || ""
                        }
                        onChange={(e) => {
                          handleInputChange(qIndex, e.target.value);
                        }}
                        onKeyUp={(e) => {
                          if (q.meta && q.meta.numberRange) {
                            let min = q.meta.numberRange.min;
                            let max = q.meta.numberRange.max;
                            let value = e.target.value;
                            if (!/^[0-5]$/.test(value)) {
                              e.target.value = "";
                            } else {
                              let numValue = parseInt(value);
                              if (numValue < min || numValue > max) {
                                e.target.value = numValue < min ? min : max;
                              }
                            }
                          }
                        }}
                        {...((q?.meta && q?.meta?.formType === "date") ||
                        q?.meta?.formType === "date-time"
                          ? { max: new Date().toISOString().slice(0, 10) }
                          : {})}
                        disabled={!!q.previousResponse}
                      />
                    )}

                    {q.type === "single-choice" && (
                      <div>
                        {q.content.responseOptions.map((option, oIndex) => {
                          return (
                            <div
                              key={oIndex}
                              className="flex items-center mb-2"
                            >
                              <input
                                type="radio"
                                id={`q${qIndex}-o${oIndex}`}
                                name={q._id}
                                value={option.toLowerCase()}
                                className="custom-radio mr-2"
                                checked={
                                  selectedOptions[qIndex] !== undefined &&
                                  (selectedOptions[qIndex]?.toLowerCase() ===
                                    option?.toLowerCase() ||
                                    (option?.toLowerCase() ===
                                      others_text?.toLowerCase() &&
                                      selectedOptions[`${qIndex}_other`] !==
                                        undefined &&
                                      selectedOptions[
                                        `${qIndex}_other`
                                      ].toLowerCase()))
                                }
                                onChange={(e) => {
                                  if (
                                    e.target.value.toLowerCase() ===
                                    others_text.toLowerCase()
                                  ) {
                                    setSelectedOptions((prevOptions) => ({
                                      ...prevOptions,
                                      [qIndex]: e.target.value,
                                      [`${qIndex}_other`]: "",
                                    }));
                                  } else {
                                    handleSingleChoiceChange(
                                      qIndex,
                                      e.target.value
                                    );
                                  }
                                }}
                                disabled={!!q.previousResponse}
                              />
                              <label htmlFor={`q${qIndex}-o${oIndex}`}>
                                {option}
                              </label>
                            </div>
                          );
                        })}
                        {selectedOptions[qIndex] &&
                          selectedOptions[qIndex].includes(
                            others_text?.toLowerCase()
                          ) && (
                            <input
                              type="text"
                              className="w-full p-2 border"
                              placeholder="Please specify"
                              value={selectedOptions[`${qIndex}_other`]}
                              onChange={(e) =>
                                handleOtherOptionChange(qIndex, e.target.value)
                              }
                              maxLength={50}
                              // disabled={!!q.previousResponse}
                            />
                          )}

                        {selectedOptions[qIndex] &&
                          q?.meta?.conditions?.respondToIfEquals &&
                          call_single_nested(q, qIndex)}
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
                              onChange={() => {
                                if (
                                  option.toLowerCase() ===
                                  others_text.toLowerCase()
                                ) {
                                  if (
                                    selectedOptions[qIndex].includes(option)
                                  ) {
                                    // Remove "Others" from the selected options
                                    handleMultipleChoiceChange(
                                      qIndex,
                                      option,
                                      false
                                    );
                                  } else {
                                    // Add "Others" to the selected options
                                    handleMultipleChoiceChange(
                                      qIndex,
                                      option,
                                      true
                                    );
                                  }
                                } else {
                                  handleMultipleChoiceChange(qIndex, option);
                                }
                              }}
                              disabled={!!q.previousResponse}
                            />
                            <label htmlFor={`q${qIndex}-o${oIndex}`}>
                              {option}
                            </label>
                          </div>
                        ))}
                        {selectedOptions[qIndex] &&
                          selectedOptions[qIndex].includes(
                            "Others…………………. Please specify (Text box - 50 Characters)"
                          ) && (
                            <input
                              type="text"
                              className="w-full p-2 border"
                              placeholder="Please specify"
                              value={selectedOptions[`${qIndex}_other`]}
                              onChange={(e) =>
                                handleOtherOptionChange(qIndex, e.target.value)
                              }
                              maxLength={50}
                              // disabled={!!q.previousResponse}
                            />
                          )}

                        {selectedOptions[qIndex] &&
                          selectedOptions[qIndex].length > 0 &&
                          !selectedOptions[qIndex].includes(
                            "Others…………………. Please specify (Text box - 50 Characters)"
                          ) &&
                          q?.meta?.conditions?.respondToIfEquals &&
                          call_multiple_nested(q, qIndex)}
                      </div>
                    )}
                  </div>

                  {/* {openVisible == true && (
                    <div className="question mb-4 shadow-xl">Here here</div>
                  )} */}
                </div>
              </>
            ))}
          </div>

          {errors && (
            <p className="text-red-500 text-center">
              Please answer all required questions (*) in this current category.
            </p>
          )}

          <div className="actions-container flex justify-center py-6 gap-3">
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                navigate("/admin/dashboard");
              }}
            >
              Back To Dashboard
            </Button>

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

      <div
        className={`w-full h-screen place-items-center justify-center ${
          questionsVisible ? "flex" : "hidden"
        } flex-col gap-y-5`}
      >
        <h1 className="text-3xl font-semibold text-center py-4 text-yellow-700 flex flex-row gap-x-2">
          Survey Completed{" "}
          <span className="text-green-600 text-4xl">
            <TiInputCheckedOutline />
          </span>
        </h1>

        <div className="message-container bg-slate-600 text-white py-4 px-2">
          {goodbye[getLanguageFromUrl()]}
        </div>
        <div className="text-center">
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              navigate("/admin/survey/completed");
            }}
          >
            Go to completed surveys
          </Button>
        </div>
      </div>
    </>
  );
};

export default Survey;
