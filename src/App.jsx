import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Survey, ErrorPage, Admin, Unauthorized } from "./components";
import { AdminRoutes } from "./routes";
import "./App.css";
import { useAuthContext } from "./hooks/useAuthContext";
import { Login } from "./components/Admin/index";

function App() {
  const { user, dispatch } = useAuthContext();
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
                  <Navigate to="/admin/" replace />
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
