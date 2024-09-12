export const useSearchFilter = async (type, page = null) => {
  const baseUrl = `https://ont-survey-tracker-development.up.railway.app/v1/respondents`;

  if (type === "all") {
    return `${baseUrl}${page ? `?page=${page}` : ""}`;
  } else {
    return `${baseUrl}?status=${type}${page ? `&page=${page}` : ""}`;
  }
};
