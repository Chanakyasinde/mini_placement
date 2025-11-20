import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./components/styles/global.css";
import Home from "./pages/Home"
import LoginStudent from "./pages/LoginStudent";
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/LoginStudent" element={<LoginStudent />} />
        <Route path="/Signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
