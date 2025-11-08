import React from "react";
import Navigation from "./components/Navigation";
import MainSection from "./components/Mainsection";
import "./components/styles/global.css";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <Navigation />
      <MainSection />

    </div>
  );
}

export default App;
