import { Routes, Route } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import UploadPage from "../pages/UploadPage";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/upload" element={<UploadPage />} />
    </Routes>
  );
}

export default AppRoutes;