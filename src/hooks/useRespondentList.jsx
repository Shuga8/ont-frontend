import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useRespondentList = (id, language) => {
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
        `https://ont-survey-tracker-development.up.railway.app/v1/questions/categories/${id}?language=${language}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      if (response.ok) {
        await response.json().then((data) => {
          const categories = data.data.categories;
          let details = data.data.surveyDetails;

          setSurveyList(categories.slice(1));

          // if (details.status == "in-progress") {
          //   setSurveyList(
          //     categories.filter((category, index) => {
          //       return category._id != details.completedSurveyCategories[index];
          //     })
          //   );
          // } else {
          //   setSurveyList(categories.slice(1));
          // }
          setRespondent(data.data.respondent);
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
