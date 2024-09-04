export const useSearchFilter = async (type) => {
  if (type === "all") {
    return "https://ont-survey-tracker-development.up.railway.app/v1/respondents";
  } else {
    return `https://ont-survey-tracker-development.up.railway.app/v1/respondents?status=${type}`;
  }
};
