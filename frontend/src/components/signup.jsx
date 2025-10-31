import React from "react";
import "../styles/signup.css";

export default function Signup({ onClose }) {
  const handleSignupSubmit = (e) => {
    e.preventDefault();
    alert("Signup functionality will be implemented");
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Sign Up</h2>
        <form onSubmit={handleSignupSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input type="text" required />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          <div className="form-group">
            <label>Confirm Password</label>
            <input type="password" required />
          </div>
          <button type="submit" className="submit-btn">Sign Up</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}
