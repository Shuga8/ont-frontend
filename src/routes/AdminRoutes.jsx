import { Routes, Route } from "react-router-dom";
import { Admin } from "../components";
import {
  Completed,
  Pending,
  Rejected,
  List,
  CompletePending,
} from "../components/Admin/index";

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Admin />} />
      <Route path="/survey/completed" element={<Completed />} />
      <Route path="/survey/pending" element={<Pending />} />
      <Route path="/survey/rejected" element={<Rejected />} />
      <Route path="/survey/pending/complete" element={<CompletePending />} />
      <Route path="/survey/all" element={<List />} />
    </Routes>
  );
}

export default AdminRoutes;
