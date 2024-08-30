import React from "react";
import { useAuthContext } from "../../../hooks/useAuthContext";

const useGetRespondents = (type = "all") => {
  const { user } = useAuthContext();

  const getRespondents = async () => {
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
      return data.data.respondents;
    } else {
      return null;
    }
  };

  return getRespondents;
};

export default useGetRespondents;
