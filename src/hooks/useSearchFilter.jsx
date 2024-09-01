export const useSearchFilter = async (type, respondents) => {
  if (type === "all") {
    return respondents;
  } else {
    return respondents.filter((respondent) => {
      if (respondent === null) return false;
      return respondent.survey.status === type;
    });
  }
};
