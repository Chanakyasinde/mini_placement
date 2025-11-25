import { Navigate } from "react-router-dom";

export default function CompanyProtectedRoute({ children }) {
  const isCompanyLoggedIn = localStorage.getItem("comapanyauth");

  if (!isCompanyLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
