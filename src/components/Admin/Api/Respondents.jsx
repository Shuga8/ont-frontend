import React, { useState } from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";
import { useSearchFilter } from "../../../hooks/useSearchFilter";

export const useGetRespondents = () => {
  const [loadingGetRespondents, setLoadingRespondents] = useState(false);
  const { user } = useAuthContext();

  const getRespondents = async (type = "all", page = null) => {
    setLoadingRespondents(true);
    const myHeaders = new Headers();
    myHeaders.append("authorization", `Bearer ${user.token}`);

    const response = await fetch(await useSearchFilter(type, page), {
      method: "GET",
      headers: myHeaders,
    });

    const data = await response.json();

    if (response.ok) {
      const filteredRespondents = data.data.respondents;
      setLoadingRespondents(false);
      const currentPage = data.data.page;
      const totalPages = data.data.totalPages;

      let pagination = {
        page: currentPage,
        totalPages,
        totalResults: data.data.totalResults,
        nextPage: currentPage < totalPages ? `?page=${currentPage + 1}` : null,
        prevPage: currentPage > 1 ? `?page=${currentPage - 1}` : null,
        next: currentPage + 1 ?? 1,
        prev: currentPage - 1 ?? 1,
      };

      return { pagination, filteredRespondents };
    } else {
      setLoadingRespondents(false);
      return null;
    }
  };

  return { loadingGetRespondents, getRespondents };
};

export default useGetRespondents;
