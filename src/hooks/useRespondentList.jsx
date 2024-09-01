import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRespondentList = (id) => {
  const [loadingQuestions, setLoadingQuestion] = useState(false);
  const [surveyList, setSurveyList] = useState([]);
  const [respondent, setRespondent] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    const getQuestions = async () => {
      setLoadingQuestion(true);
      const myHeaders = new Headers();
      myHeaders.append("authorization", `Bearer ${user.token}`);

      const response = await fetch(
        `https://ont-survey-tracker-development.up.railway.app/v1/questions/categories/${id}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      if (response.ok) {
        await response.json().then((data) => {
          setSurveyList(data.data.categories);
          setRespondent(data.data.respondent);
          console.log(surveyList);
        });
      } else {
        console.error("Failed to fetch data");
      }
      setLoadingQuestion(false);
    };

    getQuestions();
  }, [id, user.token]);

  return { loadingQuestions, surveyList, respondent };
};

export default useRespondentList;
