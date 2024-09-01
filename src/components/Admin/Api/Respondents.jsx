import React, { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useSearchFilter } from "../../../hooks/useSearchFilter";

export const useGetRespondents = () => {
  const [loadingGetRespondents, setLoadingRespondents] = useState(false);
  const { user } = useAuthContext();

  const getRespondents = async (type = "all") => {
    setLoadingRespondents(true);
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${user.token}`);

    const response = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/respondents",
      {
        method: "GET",
        headers: myHeaders,
      }
    );

    const data = await response.json();

    if (response.ok) {
      const filteredRespondents = await useSearchFilter(
        type,
        data.data.respondents
      );
      setLoadingRespondents(false);
      let pagination = {
        page: data.page,
        totalPages: data.totalPages,
        totalResults: data.totalResults,
      };

      // console.log(filteredRespondents);
      return { pagination, filteredRespondents };
    } else {
      setLoadingRespondents(false);
      return null;
    }
  };

  return { loadingGetRespondents, getRespondents };
};

export default useGetRespondents;
