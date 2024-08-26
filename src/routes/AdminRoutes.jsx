import { Routes, Route } from "react-router-dom";
import { Admin } from "../components";
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

function AdminRoutes() {
  return (
    <Routes>
      <Route path="" element={<Admin />} />
      <Route path="/login" element={<Login />} />
      <Route path="/agents" element={<Agents />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/agents/new" element={<Add />} />
      <Route path="/survey/completed" element={<Completed />} />
      <Route path="/survey/pending" element={<Pending />} />
      <Route path="/survey/rejected" element={<Rejected />} />
      <Route path="/survey/pending/complete" element={<CompletePending />} />
      <Route path="/survey/all" element={<List />} />
    </Routes>
  );
}

export default AdminRoutes;
