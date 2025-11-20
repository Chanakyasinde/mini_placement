import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const [selected, setSelected] = useState("student");

  fetch("http://localhost:3000/company/signup", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify({
    companyName: "Tech Innovators Inc.",
    email: "test1@gmail.com",
    password: "securepassword",
    websiteURL: "https://techinnovators.com",
    companyType: "Startup",
    industry: "Technology",
    location: "San Francisco, CA",
  })
})
  .then((response) => response.json())
  .then((data) => console.log("Response:", data))
  .catch((err) => console.error(err));

  
  return (
    <div className="select your role">
      {/* Left Section */}
      <div className="background">
        <h1 className="text">What describes you best?</h1>

        <div className="button-group">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected("student")}
            className={`choice-button ${
              selected === "student"
                ? "black-border"
                : "gray-border"
            }`}
          >
            Student
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setSelected("company")}
            className={`choice-button ${
              selected === "company"
                ? "black-border"
                : "gray-border"
            }`}
          >
            Company
          </motion.button>
        </div>
      </div>

      {/* Right Section (Dynamic Form) */}
      <div className="form-section">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.4 }}
          className="form-css"
        >
          <h2 className="signuptitle">
            {selected === "student" ? "Student Signup" : "Company Signup"}
          </h2>

          <form className="form-container">
            {selected === "student" ? (
              <>
                <div>
                  <label className="button-type">Name</label>
                  <input
                    type="text"
                    placeholder="Enter your name"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Email</label>
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Password</label>
                  <input
                    type="password"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">College</label>
                  <input
                    type="text"
                    placeholder="Enter your college name"
                    className="button-css"
                  />
                </div>
              </>
            ) : (
              <>
                <div>
                  <label className="button-type">Company Name</label>
                  <input
                    type="text"
                    placeholder="Enter company name"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Email</label>
                  <input
                    type="email"
                    placeholder="Enter company email"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Password</label>
                  <input
                    type="password"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Website URL</label>
                  <input
                    type="url"
                    placeholder="https://example.com"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Company Type</label>
                  <input
                    type="text"
                    placeholder="Startup / MNC / Agency"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Industry</label>
                  <input
                    type="text"
                    placeholder="e.g., Finance, Tech, Manufacturing"
                    className="button-css"
                  />
                </div>
                <div>
                  <label className="button-type">Location</label>
                  <input
                    type="text"
                    placeholder="Enter location"
                    className="button-css"
                  />
                </div>
              </>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              className="submit-button"
            >
              Submit
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  );
}

export default Signup
