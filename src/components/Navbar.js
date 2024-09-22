import React, { useState, useEffect } from 'react';
import { PiPathBold } from "react-icons/pi";
import { Dialog, DialogTitle, DialogContent, Button } from '@mui/material';
import SignInPage from '../pages/SigninPage'; // Import the SignInPage dialog
import { auth, signOut } from '../firebase';
import { FaUser } from 'react-icons/fa'; // Updated to a common user icon
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; // Import your custom CSS

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ token }); // User is considered signed in if a token exists
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignInClick = () => {
    setIsDialogOpen(true);
    setIsDropdownOpen(false); // Close dropdown when dialog opens
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove token from localStorage on sign out
    setUser(null); // Reset user state
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  const handleUserUpdate = (userData) => {
    setUser(userData); // Update user state with user data
  };

  const handleScrollToFeatures = () => {
    const featuresSection = document.querySelector('.features-section');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    }
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
          <Link to="/blogs" className="nav-link">Blogs</Link>
          <button className="nav-link" onClick={handleScrollToFeatures}>More Features</button>
        </div>
       
        <div className="navbar-end">
          <div className="dropdown">
            <button className="user-icon-button" onClick={toggleDropdown}>
              <FaUser className="w-6 h-6 text-black" />
            </button>
            <div className={`dropdown-menu ${isDropdownOpen ? 'show' : ''}`}>
              {!user ? (
                <button onClick={handleSignInClick} className="dropdown-item">Sign In</button>
              ) : (
                <button onClick={handleSignOut} className="dropdown-item">Sign Out</button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dialog for Sign In */}
      <Dialog open={isDialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Sign In</DialogTitle>
        <DialogContent>
          <SignInPage onSuccess={handleCloseDialog} onUserUpdate={handleUserUpdate} /> {/* Pass the update handler */}
        </DialogContent>
        <Button onClick={handleCloseDialog}>Close</Button>
      </Dialog>
    </nav>
  );
};

export default Navbar;
