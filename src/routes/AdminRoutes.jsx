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
  Profile,
  Unfinished,
} from "../components/Admin/index";

import { useAuthContext } from "../hooks/useAuthContext";

function AdminRoutes() {
  const { user, dispatch } = useAuthContext();
  if (user === null) return;
  return (
    <Routes>
      <Route
        path="/"
        element={user ? <Admin /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/agents"
        element={user ? <Agents /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/settings"
        element={user ? <Settings /> : <Navigate to="/admin/login" replace />}
      />

      <Route
        path="/profile"
        element={user ? <Profile /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/agents/new"
        element={user ? <Add /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/survey/completed"
        element={user ? <Completed /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/survey/pending"
        element={user ? <Pending /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/survey/rejected"
        element={user ? <Rejected /> : <Navigate to="/admin/login" replace />}
      />

      <Route
        path="/survey/unfinished"
        element={user ? <Unfinished /> : <Navigate to="/admin/login" replace />}
      />
      <Route
        path="/survey/pending/complete"
        element={
          user ? <CompletePending /> : <Navigate to="/admin/login" replace />
        }
      />
      <Route
        path="/survey/all"
        element={user ? <List /> : <Navigate to="/admin/login" replace />}
      />
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
}

export default AdminRoutes;
