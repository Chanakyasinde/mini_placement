import React, { useState, useEffect } from "react";
import { User, Briefcase, ChevronRight, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate()
  const [selected, setSelected] = useState("student");
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const [studentForm, setStudentForm] = useState({
    studentName: "",
    password: "",
    phoneNumber:"",
    email: "",
    college: "",
    resume_link:"",
  });

  const [companyForm, setCompanyForm] = useState({
    companyName: "",
    email: "",
    password: "",
    websiteUrl: "",
    companyType:"",
    industry: "",
    location: "",
  });

  useEffect(() => {
    const resizeHandler = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", resizeHandler);
    return () => window.removeEventListener("resize", resizeHandler);
  }, []);

  const formState = selected === "student" ? studentForm : companyForm;
  const setFormState = selected === "student" ? setStudentForm : setCompanyForm;


  const handleChange = (e) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = selected === "student" ? "/student/signup" : "/company/signup";
    try {
    const res = await fetch(`http://localhost:3000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formState),
    });

    const data = await res.json();
    if(res.status===200){
      localStorage.setItem(`${selected}auth`, "true");
      navigate(selected === "student" ? '/student/dashboard' : "/company/dashboard")
    }
    console.log("Response from server:", data);

  } catch (error) {
    console.error("Error sending request:", error);
  }
    console.log("Submitting:", selected, formState);
  };

  return (
    <div style={styles.page}>
      {/* Left Column Data */}
      <div style={{ ...styles.leftPane, width: isMobile ? "100%" : "40%" }}>
        <h1 style={styles.heading}>
          What <span style={styles.highlight}>describes</span> you?
        </h1>

        {/* Student Selecting Options */}
        <div
          style={{ 
            ...styles.roleCard, 
            ...(selected === "student" ? styles.activeCard : styles.inactiveCard) 
          }}
          onClick={() => setSelected("student")}
        >
          <div style={styles.roleContent}>
            <User style={styles.icon} />
            <span>Student</span>
          </div>
          {selected === "student" ? <Check /> : <ChevronRight style={styles.arrow} />} {/* THis is for the Tick Sign */}
        </div>

        {/* Company Selector */}
        <div
          style={{ 
            ...styles.roleCard, 
            ...(selected === "company" ? styles.activeCard : styles.inactiveCard) 
          }}
          onClick={() => setSelected("company")}
        >
          <div style={styles.roleContent}>
            <Briefcase style={styles.icon} />
            <span>Company</span>
          </div>
          {selected === "company" ? <Check /> : <ChevronRight style={styles.arrow} />} {/* THis is for the Tick Sign */}
        </div>

        <p style={styles.helperText}>Choose your role to get started to the appropriate signup process. Students join tot find opportunities,companies join to find talent.</p>
      </div>

      {/* ---------------- Right Column Data accordingly ---------------- */}
      <div style={styles.rightPane}>
        <div style={styles.formContainer}>
          <h2 style={styles.formHeading}>
            {selected === "student" ? "Register as Student" : "Register Your Company"}
          </h2>

          <form onSubmit={handleSubmit}>
            {Object.entries(formState).map(([key, value]) => (
              <div key={key} style={styles.inputGroup}>
                <label style={styles.label}>{key.replace(/([A-Z])/g, " $1")}</label>
                <input
                  type={key.includes("password") ? "password" : "text"}
                  name={key}
                  value={value}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            ))}

            <button type="submit" style={styles.button}>
              {selected === "student" ? "Sign Up as Student" : "Register Company"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}


const styles = {
  page: { backgroundColor: "#000", minHeight: "100vh", color: "#fff", display: "flex" },

  leftPane: {
    padding: 48,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    height: "100vh",
  },

  heading: {
    fontSize: 40,
    fontWeight: 800,
    marginBottom: 32
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
    border: "4px solid #fff"
  },

  inactiveCard: {
    backgroundColor: "#1f2937",
    border: "2px solid #4b5563"
  },

  roleContent: {
    display: "flex",
    alignItems: "center",
    fontWeight: 700 },

  icon: {
    marginRight: 12
  },

  arrow: {
    opacity: 0.5
  },

  helperText: {
    marginTop: 12,
    opacity: 0.6
  },

  rightPane: {
    width: "60%",
    display: "flex",
    justifyContent: "center",
    padding: 48,
    backgroundColor: "#1f2937",
  },

  formContainer: {
    width: "90%",
    maxWidth: 600,
    backgroundColor: "#111827",
    padding: 40,
    borderRadius: 20,
  },

  formHeading: {
    textAlign: "center",
    fontWeight: 800,
    marginBottom: 25,
    color: "#fff"
  },

  inputGroup: {
    marginBottom: 20
  },

  label: {
    marginBottom: 6,
    display: "block",
    fontWeight: 500,
    color: "#e5e7eb"
  },

  input: {
    width: "100%",
    padding: 10,
    borderRadius: 8,
    backgroundColor: "#374151",
    color: "#fff",
    border: "1px solid #4b5563",
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
};