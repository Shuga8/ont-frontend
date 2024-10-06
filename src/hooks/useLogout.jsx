import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { user, dispatch } = useAuthContext();

  const logout = async () => {
    sessionStorage.removeItem("user");
    dispatch({ type: "LOGOUT" });
    localStorage.setItem("justLoggedIn", false);
    localStorage.removeItem("loginTime");
  };

  return { logout };
};
