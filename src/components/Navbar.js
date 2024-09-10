import React, { useState } from 'react';
import { PiPathBold } from "react-icons/pi";
import { FaUser } from 'react-icons/fa'; // Updated to a common user icon
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import your custom CSS

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-start">
          <PiPathBold className="text-2xl mr-2" />
          <span className="text-2xl font-bold">Dreamroute</span>
        </div>
        <div className="navbar-center">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/about" className="nav-link">About</Link>
          <Link to="/services" className="nav-link">Features</Link>
        </div>
        <div className="navbar-end">
          <div className="dropdown">
            <button className="user-icon-button" onClick={toggleDropdown}>
              <FaUser className="w-6 h-6 text-black" />
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              <Link to="/signin" className="dropdown-item">Sign In</Link>
              <Link to="/register" className="dropdown-item">Register</Link>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
