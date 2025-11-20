import "../styles/navigation.css";
import { Link } from "react-router-dom";
export default function Navigation() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <span className="logo-icon">🏢</span>
          <span className="logo-text">PlacementHub</span>
        </div>

        <div className="navbar-menu">
          <a href="#home" className="nav-link">
            Home
          </a>
          <a href="#jobs" className="nav-link">
            Jobs
          </a>
          <a href="#companies" className="nav-link">
            Companies
          </a>
          <a href="#about" className="nav-link">
            About
          </a>
        </div>


        <div className="navbar-auth">
          <Link to={'/LoginStudent'}>
            <button className="btn-login">Login</button>
          </Link>
          <Link to={'/Signup'}>   
            <button className="btn-signup">Sign Up</button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
