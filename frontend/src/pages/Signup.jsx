import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, Briefcase, ChevronRight, Check } from 'lucide-react';

const PRIMARY_BG = '#000000'; 
const CARD_BG = '#1f2937';    
const ACCENT_COLOR = '#fff';   
const ACCENT_HOVER = '#ccc';  
const BOX_BORDER_COLOR = 'rgba(255, 255, 255, 0.2)'; 

const initialStudentState = {
  name: "",
  email: "",
  password: "",
  college: "",
};

const initialCompanyState = {
  companyName: "",
  email: "",
  password: "",
  websiteURL: "",
  industry: "",
  location: "",
};

const useIsMobile = (breakpoint = 768) => {
  const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [breakpoint]);

  return isMobile;
};


const RoleSelector = ({ selected, setSelected }) => {
  const isStudent = selected === "student";
  const isCompany = selected === "company";

  const baseCardStyle = {
    padding: '16px 24px',
    marginBottom: '16px',
    borderRadius: '16px', 
    cursor: 'pointer',
    transition: 'all 0.3s ease-in-out',
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)' 
  };

  const activeStyle = {
    backgroundColor: ACCENT_COLOR, 
    color: PRIMARY_BG,            
    border: '4px solid ' + ACCENT_COLOR,
  };

  const inactiveStyle = {
    backgroundColor: CARD_BG,
    color: '#fff',
    border: '2px solid #4b5563', 
  };

  const StudentCard = () => (
    <motion.div
      whileHover={{ scale: isStudent ? 1.01 : 1.05 }}
      whileTap={{ scale: isStudent ? 1 : 0.98 }}
      onClick={() => setSelected("student")}
      style={{
        ...baseCardStyle,
        ...(isStudent ? activeStyle : inactiveStyle),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <User style={{ width: '24px', height: '24px', marginRight: '12px' }} />
          <span style={{ fontWeight: '700', fontSize: '18px' }}>Student</span>
      </div>
      {isStudent ? (
          <Check style={{ width: '20px', height: '20px', color: PRIMARY_BG }} />
      ) : (
          <ChevronRight style={{ width: '20px', height: '20px', opacity: '0.5' }} />
      )}
    </motion.div>
  );

  const CompanyCard = () => (
    <motion.div
      whileHover={{ scale: isCompany ? 1.01 : 1.05 }}
      whileTap={{ scale: isCompany ? 1 : 0.98 }}
      onClick={() => setSelected("company")}
      style={{
        ...baseCardStyle,
        ...(isCompany ? activeStyle : inactiveStyle),
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
          <Briefcase style={{ width: '24px', height: '24px', marginRight: '12px' }} />
          <span style={{ fontWeight: '700', fontSize: '18px' }}>Company</span>
      </div>
      {isCompany ? (
          <Check style={{ width: '20px', height: '20px', color: PRIMARY_BG }} />
      ) : (
          <ChevronRight style={{ width: '20px', height: '20px', opacity: '0.5' }} />
      )}
    </motion.div>
  );

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '100%', maxWidth: '400px' }}>
      <StudentCard />
      <CompanyCard />

      <p style={{ color: '#9ca3af', fontSize: '14px', marginTop: '24px', lineHeight: '1.6' }}>
        Choose your role to get started with the appropriate signup process. Students join to find opportunities, companies join to find talent.
      </p>
    </div>
  );
};

const FormInput = ({ label, type = "text", placeholder, name, value, onChange }) => (
  <div style={{ marginBottom: '20px' }}> 
    <label style={{ display: 'block', fontSize: '15px', fontWeight: '700', color: '#d1d5db', marginBottom: '6px' }}>{label}</label> {/* Bolder label */}
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required
      style={{ 
        width: '100%', 
        padding: '14px 18px', 
        backgroundColor: CARD_BG, 
        color: '#fff', 
        border: '1px solid #4b5563',
        borderRadius: '10px', 
        fontSize: '16px',
        outline: 'none',
        transition: 'border-color 0.2s, box-shadow 0.2s',
        boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.6)', 
      }}
      onFocus={(e) => {
        e.target.style.borderColor = ACCENT_COLOR;
        e.target.style.boxShadow = `inset 0 1px 3px rgba(0, 0, 0, 0.6), 0 0 8px rgba(255, 255, 255, 0.2)`;
      }}
      onBlur={(e) => {
        e.target.style.borderColor = '#4b5563';
        e.target.style.boxShadow = 'inset 0 1px 3px rgba(0, 0, 0, 0.6)';
      }}
    />
  </div>
);


const StudentForm = ({ formState, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <FormInput
      label="Name"
      name="name"
      placeholder="e.g., Jane Doe"
      value={formState.name}
      onChange={handleChange}
    />
    <FormInput
      label="Email"
      name="email"
      type="email"
      placeholder="contact@college.edu"
      value={formState.email}
      onChange={handleChange}
    />
    <FormInput
      label="Password"
      name="password"
      type="password"
      placeholder="********"
      value={formState.password}
      onChange={handleChange}
    />
    <FormInput
      label="College/University"
      name="college"
      placeholder="e.g., Stanford University"
      value={formState.college}
      onChange={handleChange}
    />
    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: '100%',
        backgroundColor: ACCENT_COLOR,
        color: PRIMARY_BG,           
        fontWeight: '800', 
        padding: '14px 0',
        borderRadius: '16px', 
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        marginTop: '32px', 
        boxShadow: '0 12px 20px -5px rgba(255, 255, 255, 0.3)', 
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = ACCENT_HOVER}
      onMouseOut={(e) => e.target.style.backgroundColor = ACCENT_COLOR}
    >
      Sign Up as Student
    </motion.button>
  </form>
);

const CompanyForm = ({ formState, handleChange, handleSubmit }) => (
  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
    <FormInput
      label="Company Name"
      name="companyName"
      placeholder="e.g., Nebula Corp"
      value={formState.companyName}
      onChange={handleChange}
    />
    <FormInput
      label="Email"
      name="email"
      type="email"
      placeholder="contact@nebula.com"
      value={formState.email}
      onChange={handleChange}
    />
    <FormInput
      label="Password"
      name="password"
      type="password"
      placeholder="********"
      value={formState.password}
      onChange={handleChange}
    />
    <FormInput
      label="Website URL"
      name="websiteURL"
      type="url"
      placeholder="https://nebula.com"
      value={formState.websiteURL}
      onChange={handleChange}
    />
    <FormInput
      label="Industry"
      name="industry"
      placeholder="e.g., Fintech, AI, Gaming"
      value={formState.industry}
      onChange={handleChange}
    />
    <FormInput
      label="Location"
      name="location"
      placeholder="City, State/Country"
      value={formState.location}
      onChange={handleChange}
    />
    
    <motion.button
      type="submit"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      style={{
        width: '100%',
        backgroundColor: ACCENT_COLOR, 
        color: PRIMARY_BG,           
        fontWeight: '800', 
        padding: '14px 0',
        borderRadius: '16px', 
        border: 'none',
        cursor: 'pointer',
        transition: 'background-color 0.2s',
        marginTop: '32px', 
        boxShadow: '0 12px 20px -5px rgba(255, 255, 255, 0.3)', 
      }}
      onMouseOver={(e) => e.target.style.backgroundColor = ACCENT_HOVER}
      onMouseOut={(e) => e.target.style.backgroundColor = ACCENT_COLOR}
    >
      Sign Up as Company
    </motion.button>
  </form>
);


const Signup = () => {
  const [selected, setSelected] = useState("student");
  const [studentForm, setStudentForm] = useState(initialStudentState);
  const [companyForm, setCompanyForm] = useState(initialCompanyState);
  const isMobile = useIsMobile(); 

  const currentFormState = selected === 'student' ? studentForm : companyForm;
  const setCurrentFormState = selected === 'student' ? setStudentForm : setCompanyForm;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentFormState(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = selected === 'student' ? currentFormState : companyForm;
    const endpoint = selected === 'student' ? "/student/signup" : "/company/signup";
    
    console.log(`Submitting ${selected} data to ${endpoint}:`, data);
    
    // Placeholder for actual fetch logic (keeping the intent)
    /*
    fetch(`http://localhost:3000${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(result => {
        console.log("Success:", result);
    })
    .catch(error => {
        console.error("Error:", error);
    });
    */
  };
  
  const formJustification = selected === 'student' ? 'center' : 'flex-start';


  return (
    <div style={{ backgroundColor: PRIMARY_BG, minHeight: '100vh', width: '100vw', color: '#fff', padding: 0, margin: 0, fontFamily: 'Inter, sans-serif', display: 'flex' }}>
      
      {/* Main Container - Fills the entire viewport */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        overflow: 'auto',
        backgroundColor: PRIMARY_BG,
      }}>
        
        {/* Left Section (Role Selector - 40%) */}
        <div style={{
          width: isMobile ? '100%' : '40%', 
          height: isMobile ? 'auto' : '100vh', 
          padding: '48px',
          backgroundColor: PRIMARY_BG, 
          borderRight: isMobile ? 'none' : '1px solid #374151', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center', 
          alignItems: 'flex-start',
        }}>
          <h1 style={{ fontSize: '40px', fontWeight: '800', marginBottom: '32px', lineHeight: '1.2' }}>
            What <span style={{ color: ACCENT_COLOR }}>describes</span> you best?
          </h1>
          
          <RoleSelector selected={selected} setSelected={setSelected} />
          
        </div>

        {/* Right Section (Dynamic Form - 60%) */}
        <div style={{ 
          width: isMobile ? '100%' : '60%',
          height: isMobile ? 'auto' : '100vh', 
          backgroundColor: CARD_BG, 
          overflowY: 'auto', 
          display: 'flex',
          flexDirection: 'column',
          justifyContent: formJustification, 
          alignItems: 'center',   
        }}>
          {/* Form Box Container */}
          <div style={{
              width: '90%', 
              maxWidth: '600px', 
              backgroundColor: CARD_BG, 
              padding: '40px',
              borderRadius: '24px', 
              border: `1px solid ${BOX_BORDER_COLOR}`, 
              boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5)',
              marginTop: formJustification === 'flex-start' ? '48px' : '0', 
              marginBottom: formJustification === 'flex-start' ? '48px' : '0', 
          }}>
              <AnimatePresence mode="wait">
                <motion.div
                  key={selected}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <h2 style={{ fontSize: '30px', fontWeight: '800', marginBottom: '36px', color: '#fff', textAlign: 'center' }}>
                    {selected === "student" ? "Register as a Student" : "Register Your Company"}
                  </h2>

                  {selected === "student" ? (
                    <StudentForm
                      formState={studentForm}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                    />
                  ) : (
                    <CompanyForm
                      formState={companyForm}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit}
                    />
                  )}
                </motion.div>
              </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup