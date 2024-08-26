import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Survey, ErrorPage } from "./components";
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
            <Route
              path="/"
              element={user ? <Survey /> : <Navigate to={"/admin/login"} />}
            />
            <Route
              path="/survey"
              element={!user ? <Navigate to={"/survey"} /> : <Survey />}
            />
            <Route path="/admin/*" element={<AdminRoutes />} />

            <Route path="*" element={<ErrorPage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
