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
import { Login } from "./components/Admin/index";
import { useEffect } from "react";
import { useLogout } from "./hooks/useLogout";

function App() {
  const { user, dispatch } = useAuthContext();
  const { logout } = useLogout();

  useEffect(() => {
    const handleBeforeUnload = (event) => {
      // Check if the page is being refreshed
      const isRefresh = performance.navigation.type === 1 || event.persisted;

      if (!isRefresh) {
        event.preventDefault();
        logout();
      }
    };

    const polling = () => {
      if (!user && window.location.pathname != "/admin/login") {
        window.location.href = "/admin/login";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
      polling();
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
              element={!user ? <Login /> : <Navigate to="/admin/" replace />}
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
