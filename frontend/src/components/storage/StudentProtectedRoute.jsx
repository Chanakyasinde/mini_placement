import { Navigate } from "react-router-dom";

export default function StudentProtectedRoute({ children }) {
  const isStudentLoggedIn = localStorage.getItem("studentToken");

  if (!isStudentLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
