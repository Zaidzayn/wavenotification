import React from "react";
import "./navbarr.css";

const NavBar = () => {
    return (
      <header className="navbar">
        {/* Upper Section */}
        <div className="navbar-upper">
          {/* Logo */}
          <div className="logo">
            <img
              src={process.env.PUBLIC_URL + "/images/WAVES.png"}
              alt="Waves Logo"
            />
          </div>
          {/* Menu Icon */}
        
          <nav className="nav-menu">
            <button className="menu-icon"> ☰ </button>
          </nav>
        </div>
  
        {/* Lower Section */}
        <div className="navbar-lower">
          <img
            src={process.env.PUBLIC_URL + "/images/WelcometoWaves2024.png"}
            alt="Welcome to Waves 2024"
            className="welcome-image"
          />
          
        </div>
      </header>
    );
  };
  
  export default NavBar;