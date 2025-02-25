import React, { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { config } from "../../../../config/config";

export const useGetRespondentByPhone = (phone, page = "all") => {
  const [loadingPhoneRespondents, setLoadingPhoneRespondents] = useState(false);
  const [errorPhone, setErrorPhone] = useState(null);
  const { user } = useAuthContext();

  const getPhoneRespondent = async () => {
    setErrorPhone(null);
    setLoadingPhoneRespondents(true);
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${user.token}`);

    const { url } = config();

    try {
      const response = await fetch(`${url}/v1/respondents/id/${phone}`, {
        method: "GET",
        headers: myHeaders,
      });

      let filteredRespondents = null;
      let pagination = null;

      if (!response.ok) {
        const errorData = await response.json();
        setErrorPhone(errorData.message || "Error fetching data");
        setLoadingPhoneRespondents(false);
        return { pagination, filteredRespondents };
      }

      const data = await response.json();

      if (page === "all") {
        filteredRespondents = data.data.respondents || [];
      } else {
        if (data.data && data.data.respondents) {
          filteredRespondents = data.data.respondents;
          filteredRespondents = filteredRespondents.filter((respondent) => {
            return respondent.survey.status == page;
          });
        } else {
          filteredRespondents = null;
        }
      }

      const currentPage = data.data.page;
      const totalPages = data.data.totalPages;

      pagination = {
        page: currentPage,
        totalPages,
        totalResults: filteredRespondents.length,
        nextPage: currentPage < totalPages ? `?page=${currentPage + 1}` : null,
        prevPage: currentPage > 1 ? `?page=${currentPage - 1}` : null,
        next: currentPage + 1,
        prev: currentPage - 1,
      };

      setLoadingPhoneRespondents(false);

      return { pagination, filteredRespondents };
    } catch (error) {
      setErrorPhone(error.message || "Unexpected error");
      setLoadingPhoneRespondents(false);
      return { pagination: null, filteredRespondents: null };
    }
  };

  return { loadingPhoneRespondents, errorPhone, getPhoneRespondent };
};

export default useGetRespondentByPhone;
