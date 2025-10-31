import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">Placement Portal</div>
      <div className="navbar-buttons">
        <button className="btn login-btn">Login</button>
        <button className="btn signup-btn">Signup</button>
      </div>
    </nav>
  );
};

export default Navbar;
