import { useState } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [isLoading, setIsloading] = useState(false);

  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setSuccess(null);
    setIsloading(true);

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const data = JSON.stringify({ email, password });

    const loginUser = await fetch(
      "https://ont-survey-tracker-development.up.railway.app/v1/auth/login",
      {
        method: "POST",
        headers: myHeaders,
        body: data,
      }
    );

    const response = await loginUser.json();

    if (!loginUser.ok) {
      setError(response.message);
    } else {
      setSuccess("login successfull");

      setTimeout(() => {
        localStorage.setItem("user", JSON.stringify(response.data));
        dispatch({ type: "LOGIN", payload: response.data });
        localStorage.setItem("justLoggedIn", true);
      }, 1500);
    }

    setIsloading(false);
  };

  return { login, isLoading, error, success };
};
