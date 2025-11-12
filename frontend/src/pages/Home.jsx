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
      <Navigation/>
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
        </div>
      </section>
    </div>
  );
}