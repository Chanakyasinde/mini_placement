import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/styles/global.css";
import Home from "./pages/Home"
import LoginStudent from "./pages/Login";
import Signup from "./pages/Signup";
import CompanyDashboard from "./pages/CompanyDashboard";
import StudentDashboard from "./pages/StudentDashboard";
import StudentProfile from "./pages/StudentProfile";
import StudentProtectedRoute from "./components/storage/StudentProtectedRoute";
import CompanyProtectedRoute from "./components/storage/CompanyProtectedRoute";
import CompanyProfile from "./pages/CompanyProfile";


import JobCard from "./pages/JobCard";
import JobApplicants from "./pages/JobApplicants";
import JobDetails from "./pages/JobDetails";
import AppliedJobs from "./pages/AppliedJobs";
import TotalJobs from "./pages/TotalJobs";
import TotalCompanies from "./pages/TotalCompanies";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/total-jobs" element={<TotalJobs />} />
                <Route path="/total-companies" element={<TotalCompanies />} />
                <Route path="/login" element={<LoginStudent />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/student/dashboard" element={
                    <StudentProtectedRoute>
                        <StudentDashboard />
                    </StudentProtectedRoute>
                } />
                <Route path="/student/profile" element={
                    <StudentProtectedRoute>
                        <StudentProfile />
                    </StudentProtectedRoute>
                } />
                <Route path="/student/job/:jobId" element={
                    <StudentProtectedRoute>
                        <JobDetails />
                    </StudentProtectedRoute>
                } />
                <Route path="/student/applied-jobs" element={
                    <StudentProtectedRoute>
                        <AppliedJobs />
                    </StudentProtectedRoute>
                } />
                <Route path="/company/dashboard" element={
                    <CompanyProtectedRoute>
                        <CompanyDashboard />
                    </CompanyProtectedRoute>
                } />
                <Route path="/company/profile" element={
                    <CompanyProtectedRoute>
                        <CompanyProfile />
                    </CompanyProtectedRoute>
                } />

                {/* New Routes for Job Management */}
                <Route path="/dashboard/job/new" element={
                    <CompanyProtectedRoute>
                        <JobCard />
                    </CompanyProtectedRoute>
                } />
                <Route path="/dashboard/job/:id" element={
                    <CompanyProtectedRoute>
                        <JobCard />
                    </CompanyProtectedRoute>
                } />
                <Route path="/dashboard/job/:jobId/applicants" element={
                    <CompanyProtectedRoute>
                        <JobApplicants />
                    </CompanyProtectedRoute>
                } />
            </Routes>
        </BrowserRouter>
    );
}

export default App;

