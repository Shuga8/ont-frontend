import { Routes, Route, Navigate } from "react-router-dom";
import { Admin, ErrorPage } from "../components";
import {
  Completed,
  Pending,
  Rejected,
  List,
  CompletePending,
  Login,
  Add,
  Agents,
  Settings,
} from "../components/Admin/index";

import { useAuthContext } from "../hooks/useAuthContext";

function AdminRoutes() {
  const { user, dispatch } = useAuthContext();
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Admin /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/login"
        element={!user ? <Login /> : <Navigate to="/admin/" replace />}
      />
      <Route path="/agents" element={<Agents />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/agents/new" element={<Add />} />
      <Route path="/survey/completed" element={<Completed />} />
      <Route path="/survey/pending" element={<Pending />} />
      <Route path="/survey/rejected" element={<Rejected />} />
      <Route path="/survey/pending/complete" element={<CompletePending />} />
      <Route path="/survey/all" element={<List />} />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AdminRoutes;
