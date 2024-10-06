import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { Survey, ErrorPage, Admin, Unauthorized } from "./components";
import { AdminRoutes } from "./routes";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { ForgotPassword, Login, ResetPassword } from "./components/Admin/index";
import { useEffect } from "react";
import { useLogout } from "./hooks/useLogout";

function App() {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    const handleAuthTimeout = async () => {
      const loginTime = localStorage.getItem("loginTime");
      if (loginTime) {
        const currentTime = new Date();
        const loginTimeDate = new Date(loginTime);
        const timeDiff = currentTime - loginTimeDate;
        const oneDay = 24 * 60 * 60 * 1000;
        if (timeDiff > oneDay) {
          await logout();
        }
      }
    };

    handleAuthTimeout();

    const polling = () => {
      if (
        !user &&
        window.location.pathname !== "/admin/login" &&
        window.location.pathname !== "/admin/forgot-password" &&
        !window.location.pathname.includes("/admin/reset-password")
      ) {
        window.location.href = "/admin/login";
      }
    };

    polling();

    const intervalId = setInterval(handleAuthTimeout, 1000 * 60);
    return () => {
      clearInterval(intervalId);
    };
  }, [logout, user]);

  return (
    <>
      <div className="App">
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route
              path="/admin/login"
              element={
                !user ? <Login /> : <Navigate to="/admin/dashboard" replace />
              }
            />

            <Route
              path="/admin/forgot-password"
              element={
                !user ? (
                  <ForgotPassword />
                ) : (
                  <Navigate to="/admin/dashboard" replace />
                )
              }
            />

            <Route
              path="/admin/reset-password"
              element={
                !user ? (
                  <ResetPassword />
                ) : (
                  <Navigate to="/admin/dashboard" replace />
                )
              }
            />
            {/* Protected Routes */}
            <Route
              path="/admin/*"
              element={
                user ? <AdminRoutes /> : <Navigate to="/admin/login" replace />
              }
            />
            {/* Default Route */}
            <Route
              path="/"
              element={
                user ? (
                  <Navigate to="/admin/dashboard" replace />
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            <Route
              path="/survey"
              element={
                user ? (
                  user.user.type !== "admin" ? (
                    <Survey />
                  ) : (
                    <Navigate to={"/401"} replace />
                  )
                ) : (
                  <Navigate to="/admin/login" replace />
                )
              }
            />

            <Route
              path="/401"
              element={
                user ? <Unauthorized /> : <Navigate to="/admin/login" replace />
              }
            />

            {/* Catch-All Route */}
            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
