import React, { useState, useEffect } from "react";
import { User, Briefcase, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("student");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isLoading, setIsLoading] = useState(false);

  const [studentLogin, setStudentLogin] = useState({
    email: "",
    password: "",
  });


  const [companyLogin, setCompanyLogin] = useState({
    email: "",
    password: "",
  });
  useEffect(() => {
    const resizeHandler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const formState = selected === "student" ? studentLogin : companyLogin;
  const setFormState =
    selected === "student" ? setStudentLogin : setCompanyLogin;

  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    localStorage.clear()
    if (selected === "student") {
      if (!studentLogin.email && !studentLogin.phoneNumber) {
        return alert("Enter either Email or Phone Number");
      }
    }

    const endpoint =
      selected === "student" ? "/student/login" : "/company/login";

    try {
      setIsLoading(true);
      const res = await fetch(`${import.meta.env.VITE_API_URL}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || data.error || "Login failed");
      }

      localStorage.setItem(`${selected}Token`, data.token);
      navigate(selected === "student" ? '/student/dashboard' : "/company/dashboard")

    } catch (error) {
      console.error("Login Error:", error);
      alert(error.message || "An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };
  const handleClick = () => {
    setStudentLogin({
      email: "batman@gmail.com",
      password: "batman"
    })

  }
  const handleClicks = () => {
    setCompanyLogin({
      email: "mysocial@gmail.com",
      password: "123456"
    })

  }

  return (
    <div style={styles.page}>
      <div style={{ ...styles.leftPane, width: isMobile ? "100%" : "40%" }}>
        <h1 style={styles.heading}>
          Who is <span style={styles.highlight}>logging in?</span>
        </h1>

        <div
          style={{
            ...styles.roleCard,
            ...(selected === "student"
              ? styles.activeCard
              : styles.inactiveCard),
          }}
          onClick={() => setSelected("student")}
        >
          <div style={styles.roleContent}>
            <User style={styles.icon} />
            <span>Student</span>
          </div>
          {selected === "student" ? <Check /> : <ChevronRight style={styles.arrow} />}
        </div>

        <div
          style={{
            ...styles.roleCard,
            ...(selected === "company"
              ? styles.activeCard
              : styles.inactiveCard),
          }}
          onClick={() => setSelected("company")}
        >
          <div style={styles.roleContent}>
            <Briefcase style={styles.icon} />
            <span>Company</span>
          </div>
          {selected === "company" ? <Check /> : <ChevronRight style={styles.arrow} />}
        </div>

        <p style={styles.helperText}>
          Choose your role to log in and access your dashboard.
        </p>

        <div style={styles.credentialBox}>
          <p style={styles.credentialText}>
            For website checking please login with following {selected} info:
          </p>
          <p style={styles.credentialText}>
            Email: <strong>{selected === "student" ? "batman@gmail.com" : "mysocial@gmail.com"}</strong>
          </p>
          <p style={styles.credentialText}>
            Password: <strong>{selected === "student" ? "batman" : "123456"}</strong>
          </p>
          <button onClick={selected == "student" ? handleClick : handleClicks}>Autofill</button>
        </div>

        <div style={styles.trustSignals}>
          <h3 style={styles.projectTitle}>MiniPlacer</h3>
          <p style={styles.studentNames}>Built by <strong>team of CAL4s</strong></p>
          <div style={styles.disclaimerBox}>
            <p style={styles.disclaimerText}>
              Student Project - For Educational Purposes Only. Please provide only the fake information.
            </p>
          </div>
        </div>
      </div>

      <div style={styles.rightPane}>
        <div style={styles.formContainer}>
          <h2 style={styles.formHeading}>
            {selected === "student" ? "Student Login" : "Company Login"}
          </h2>

          <form onSubmit={handleSubmit}>
            {Object.entries(formState).map(([key, value]) => (
              <div key={key} style={styles.inputGroup}>
                <label style={styles.label}>{key}</label>
                <input
                  type={
                    key === "password"
                      ? "password"
                      : "email"
                  }

                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            ))}

            <button type="submit" style={{ ...styles.button, opacity: isLoading ? 0.7 : 1 }} disabled={isLoading}>
              {isLoading ? "Loading... Please wait" : (selected === "student" ? "Login as Student" : "Login as Company")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

const styles = {
  page: { backgroundColor: "#000", minHeight: "100vh", color: "#fff", display: "flex", fontFamily: "'Inter', sans-serif" },

  leftPane: {
    padding: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#000000",
  },

  heading: {
    fontSize: 40,
    fontWeight: 800,
    marginBottom: 32,
  },

  highlight: { color: "#fff" },

  roleCard: {
    padding: "16px 24px",
    borderRadius: 16,
    cursor: "pointer",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
    transition: "0.2s",
  },

  activeCard: {
    backgroundColor: "#fff",
    color: "#000",
    border: "4px solid #fff",
  },

  inactiveCard: {
    backgroundColor: "#1a1a1a",
    border: "2px solid #333333",
  },

  roleContent: {
    display: "flex",
    alignItems: "center",
    fontWeight: 700,
  },

  icon: {
    marginRight: 12,
  },

  arrow: {
    opacity: 0.5,
  },

  helperText: {
    marginTop: 12,
    opacity: 0.6,
  },

  trustSignals: {
    marginTop: "auto",
    paddingTop: 40,
    borderTop: "1px solid #333",
  },

  projectTitle: {
    fontSize: 20,
    fontWeight: 700,
    marginBottom: 8,
    color: "#fff",
  },

  studentNames: {
    fontSize: 14,
    color: "#a3a3a3",
    marginBottom: 16,
  },

  disclaimerBox: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    padding: "8px 12px",
    borderRadius: 8,
    border: "1px solid rgba(255, 255, 255, 0.2)",
  },

  disclaimerText: {
    fontSize: 12,
    color: "#d4d4d4",
    fontWeight: 500,
    margin: 0,
  },

  rightPane: {
    width: "60%",
    display: "flex",
    justifyContent: "center",
    padding: 48,
    backgroundColor: "#0a0a0a",
  },

  formContainer: {
    width: "90%",
    maxWidth: 600,
    backgroundColor: "#121212",
    padding: 40,
    borderRadius: 20,
    border: "1px solid #333333",
  },

  formHeading: {
    textAlign: "center",
    fontWeight: 800,
    marginBottom: 25,
  },

  inputGroup: {
    marginBottom: 20,
  },

  label: {
    marginBottom: 6,
    display: "block",
    fontWeight: 500,
    color: "#a3a3a3",
  },

  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#262626",
    color: "#fff",
    border: "1px solid #404040",
    outline: "none",
  },

  button: {
    width: "100%",
    padding: 14,
    marginTop: 20,
    backgroundColor: "#fff",
    color: "#000",
    borderRadius: 10,
    fontWeight: 800,
    cursor: "pointer",
  },

  credentialBox: {
    marginTop: 20,
    padding: 16,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: 12,
    border: "1px solid rgba(255, 255, 255, 0.2)",
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  credentialText: {
    fontSize: 13,
    color: "#d4d4d4",
    lineHeight: "1.5",
    margin: 0,
  },
};
