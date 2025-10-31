import React from "react";
import "../styles/login.css";

export default function Login({ onClose }) {
  const handleLoginSubmit = (e) => {
    e.preventDefault();
    alert("Login functionality will be implemented");
    onClose();
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <div className="form-group">
            <label>Email</label>
            <input type="email" required />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input type="password" required />
          </div>
          <button type="submit" className="submit-btn">Login</button>
          <button type="button" className="close-btn" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
}
