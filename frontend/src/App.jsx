import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/styles/global.css";
import Home from "./pages/Home"
import LoginStudent from "./pages/Login";
import Signup from "./pages/Signup";
import CompnayDashboard from "./pages/CompnayDashboard"
import StudentDashboard from "./pages/StudentDashboard";
import StudentProtectedRoute from "./components/storage/StudentProtectedRoute";
import CompanyProtectedRoute from "./components/storage/CompanyProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginStudent />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/student/dashboard" element={
          <StudentProtectedRoute>
            <StudentDashboard/>
          </StudentProtectedRoute>
          }/>
        <Route path="/company/dashboard" element={
          <CompanyProtectedRoute>
            <CompnayDashboard/>
          </CompanyProtectedRoute>
          }/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
