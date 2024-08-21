import { Routes, Route } from "react-router-dom";
import { Admin } from "../components";
// import AdminLogin from './AdminLogin';
// import AdminRegister from './AdminRegister';
// import AdminLogout from './AdminLogout';
// import AdminEditSurvey from './AdminEditSurvey';

function AdminRoutes() {
  return (
    <Routes>
      {/* <Route path='/admin/login' element={<AdminLogin />} />
      <Route path='/admin/register' element={<AdminRegister />} />
      <Route path='/admin/logout' element={<AdminLogout />} />
      <Route path='/admin/edit/survey/:id' element={<AdminEditSurvey />} /> */}
      <Route path="/" element={<Admin />} />
    </Routes>
  );
}

export default AdminRoutes;
