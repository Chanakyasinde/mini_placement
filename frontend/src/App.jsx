import React, { useState } from "react";
import Home from "./pages/Home";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  return (
    <>
      <Home onShowLogin={() => setShowLogin(true)} onShowSignup={() => setShowSignup(true)} />
      {showLogin && <Login onClose={() => setShowLogin(false)} />}
      {showSignup && <Signup onClose={() => setShowSignup(false)} />}
    </>
  );
}
