import { Navigate } from "react-router-dom";

export default function CompanyProtectedRoute({ children }) {
  const isCompanyLoggedIn = localStorage.getItem('companyToken');

  if (!isCompanyLoggedIn) {
    return <Navigate to="/login" replace />;
  }
  console.log(isCompanyLoggedIn);

  return children;
}
