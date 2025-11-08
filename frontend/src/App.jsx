import React, { useState } from "react";
import Navigation from "./components/Navigation";
import MainSection from "./components/Mainsection";
import "./components/styles/global.css";
import "./App.css";

// Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Navbar from "./components/Navbar"; // if used in your UI


function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Navbar onShowLogin={() => setShowLogin(true)} onShowSignup={() => setShowSignup(true)} />
      <Home onShowLogin={() => setShowLogin(true)} onShowSignup={() => setShowSignup(true)} />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </>
  );
}

export default App;
