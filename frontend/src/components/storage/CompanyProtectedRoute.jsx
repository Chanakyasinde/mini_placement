import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CompanyProtectedRoute({ children }) {
  const [isValid, setIsValid] = useState(null);

  useEffect(() => {
    const verify = async () => {
      const token = localStorage.getItem("companyToken");
      if (!token) return setIsValid(false);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/company/verify`, {
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

  if (isValid === null) return null; // loading

  return isValid ? children : <Navigate to="/login" replace />;
}
