import React from "react";
import Navbar from "../components/Navbar";
import "../styles/home.css";

export default function Home({ onShowLogin, onShowSignup }) {
  return (
    <div className="home-container">
      <Navbar onShowLogin={onShowLogin} onShowSignup={onShowSignup} />

      <section className="hero-section">
        <h2 className="hero-title">Welcome to Placement Portal</h2>
        <p className="hero-text">
          Your gateway to successful career opportunities. Connect with top companies,
          showcase your skills, and land your dream job with our comprehensive placement platform.
        </p>
      </section>

      <section className="info-section">
        <div className="info-card">
          <h3>For Students</h3>
          <p>
            Create your profile, upload resumes, and apply to multiple job opportunities. 
            Track your application status in real-time.
          </p>
        </div>
        <div className="info-card">
          <h3>For Companies</h3>
          <p>
            Post job openings, review candidate profiles, and schedule interviews. 
            Find the perfect talent for your organization.
          </p>
        </div>
        <div className="info-card">
          <h3>Easy Management</h3>
          <p>
            Streamlined placement process with automated notifications, interview scheduling,
            and comprehensive analytics.
          </p>
        </div>
      </section>
    </div>
  );
}