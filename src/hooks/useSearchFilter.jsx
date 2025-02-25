import { config } from "../../config/config";

export const useSearchFilter = async (type, page = null) => {
  const { url } = config();
  const baseUrl = `${url}/v1/respondents`;

  if (type === "all") {
    return `${baseUrl}${page ? `?page=${page}` : ""}`;
  } else {
    return `${baseUrl}?status=${type}${page ? `&page=${page}` : ""}`;
  }
};
