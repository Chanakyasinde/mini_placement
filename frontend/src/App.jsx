import React, { useState } from "react";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

export default function App() {
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
