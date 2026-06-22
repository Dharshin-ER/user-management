import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route path="/dashboard" element={<h1>Dashboard</h1>} />
    </Routes>
  );
};

export default AppRoutes;
