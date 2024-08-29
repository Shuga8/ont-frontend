import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Survey, ErrorPage, Admin } from "./components";
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
                user ? <Survey /> : <Navigate to="/admin/login" replace />
              }
            />

            <Route
              path="/survey"
              element={
                user ? <Survey /> : <Navigate to="/admin/login" replace />
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
