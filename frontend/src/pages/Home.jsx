import React, { useState } from "react";
import Navigation from "../components/storage/Navigation";
import "../components/styles/home.css";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);

  };

  return (
    <div className="app-container">
      <Navigation />
      <section className="main-section">
        <div className="main-container">

          <h1 className="main-title">
            Your Gateway to <span className="highlight">Dream Career</span>
          </h1>


          <p className="main-subtitle">
            Connect with top companies, explore exciting opportunities, and kickstart your professional journey with
            PlacementHub.
          </p>


          <div className="search-container">
            <div className="search-box">
              <span className="search-icon">🔍</span>
              <input
                type="text"
                placeholder="Search jobs, companies, or roles..."
                className="search-input"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
            </div>
            <button className="btn-search" onClick={handleSearch}>
              Search Jobs →
            </button>
          </div>

          <div className="trending-searches">
            <span className="trending-label">Trending Searches:</span>
            <div className="trending-tags">
              {["Software Engineer", "Data Scientist", "Product Manager", "Data Analyst", "Marketing"].map((tag, index) => (
                <span key={index} className="trending-tag" onClick={() => setSearchQuery(tag)}>
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="stats-section">

        <div className="stat-group universities-section">
          <h3 className="section-title">Trusted By Students From</h3>
          <div className="uni-grid">
            <div className="uni-item">
              <div className="uni-logo-round">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/1/1d/Indian_Institute_of_Technology_Bombay_Logo.svg/200px-Indian_Institute_of_Technology_Bombay_Logo.svg.png" alt="IIT Bombay" />
              </div>
              <div className="uni-info">
                <h4>IIT Bombay</h4>
                <p>Premier technical institute known for excellence in engineering.</p>
              </div>
            </div>
            <div className="uni-item">
              <div className="uni-logo-round">
                <img src="https://upload.wikimedia.org/wikipedia/en/thumb/d/d3/BITS_Pilani-Logo.svg/200px-BITS_Pilani-Logo.svg.png" alt="BITS Pilani" />
              </div>
              <div className="uni-info">
                <h4>BITS Pilani</h4>
                <p>Leading private university fostering innovation and leadership.</p>
              </div>
            </div>
            <div className="uni-item">
              <div className="uni-logo-round">
                <img src="https://www.wonderskool.com//uploads/1520578197_IISc_Bangalore_Recruitment_2018_14_System_Administrator_Trainee_Posts.png" alt="IISc Bangalore" />
              </div>
              <div className="uni-info">
                <h4>IISc Bangalore</h4>
                <p>India's premier institute for advanced scientific research and education.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="stat-group companies-section">
          <h3 className="section-title">800+ Active Hiring Partners</h3>
          <div className="logos-grid">
            <img src="https://logo.clearbit.com/google.com" alt="Google" className="company-logo" />
            <img src="https://logo.clearbit.com/amazon.com" alt="Amazon" className="company-logo" />
            <img src="https://logo.clearbit.com/microsoft.com" alt="Microsoft" className="company-logo" />
            <img src="https://logo.clearbit.com/swiggy.com" alt="Swiggy" className="company-logo" />
            <img src="https://logo.clearbit.com/zomato.com" alt="Zomato" className="company-logo" />
            <img src="https://logo.clearbit.com/uber.com" alt="Uber" className="company-logo" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/b/bd/Indian_Space_Research_Organisation_Logo.svg" alt="ISRO" className="company-logo" />
            <img src="https://logo.clearbit.com/cred.club" alt="Cred" className="company-logo" />
            <img src="https://logo.clearbit.com/zeptonow.com" alt="Zepto" className="company-logo" />
            <img src="https://logo.clearbit.com/netflix.com" alt="Netflix" className="company-logo" />
            <img src="https://logo.clearbit.com/flipkart.com" alt="Flipkart" className="company-logo" />
          </div>
          <p className="section-desc">Join the league of top-tier professionals.</p>
        </div>

        <div className="stat-group metrics-section">
          <h3 className="section-title">Our Impact</h3>
          <div className="metrics-row">
            <div className="metric-item">
              <span className="metric-value">95%</span>
              <span className="metric-label">Placement Rate</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">10k+</span>
              <span className="metric-label">Students Placed</span>
            </div>
            <div className="metric-item">
              <span className="metric-value">₹20L</span>
              <span className="metric-label">Avg Salary</span>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
}