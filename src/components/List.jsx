import React, { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { config } from "../../config/config";

export const useRespondentList = (id, code) => {
  const [loadingQuestions, setLoadingQuestion] = useState(false);
  const { user } = useAuthContext();

  const getQuestions = async (id) => {
    setLoadingQuestion(true);
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${user.token}`);
    const { url } = config();

    const response = await fetch(`${url}/v1/questions/categories/${id}`, {
      method: "GET",
      headers: myHeaders,
    });

    const data = await response.json();

    const surveyList = data.data.categories;

    const respondent = data.data.respondent;

    if (response.ok) {
      setLoadingQuestion(false);

      return { loadingQuestions, surveyList, respondent };
    } else {
      setLoadingQuestion(false);
      return null;
    }
  };

  getQuestions(id);
};

export default useRespondentList;
