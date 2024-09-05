import React, { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

export const useGetRespondentByPhone = (phone, page = "all") => {
  const [loadingPhoneRespondents, setLoadingPhoneRespondents] = useState(false);
  const [errorPhone, setErrorPhone] = useState(null);
  const { user } = useAuthContext();

  const getPhoneRespondent = async () => {
    setErrorPhone(null);
    setLoadingPhoneRespondents(true);
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${user.token}`);

    try {
      const response = await fetch(
        `https://ont-survey-tracker-development.up.railway.app/v1/respondents/id/${phone}`,
        {
          method: "GET",
          headers: myHeaders,
        }
      );

      if (!response.ok) {
        const errorData = await response.json();
        setErrorPhone(errorData.message || "Error fetching data");
        setLoadingPhoneRespondents(false);
        return { pagination: null, filteredRespondents: null };
      }

      const data = await response.json();

      let filteredRespondents = null;
      let pagination = null;

      if (page === "all") {
        filteredRespondents = data.data || [];
      } else {
        // Check if data structure is valid
        if (data.data && data.data.survey && data.data.survey.status === page) {
          filteredRespondents = data.data;
        } else {
          filteredRespondents = null;
        }
      }

      pagination = {
        page: 1,
        totalPages: 1,
        totalResults: 1,
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
