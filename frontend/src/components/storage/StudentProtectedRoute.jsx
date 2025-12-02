import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function StudentProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("studentToken");
      if (!token) return setIsValid(false);

      try {
        const res = await fetch("http://localhost:3000/student/verify", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.ok) setIsValid(true);
        else {
          localStorage.removeItem("companyToken");
          setIsValid(false);
        }
      } catch {
        setIsValid(false);
      }
    };

    verify();
  }, []);

  if (isValid === null) return null;

  return isValid ? children : <Navigate to="/login" replace />;
}
