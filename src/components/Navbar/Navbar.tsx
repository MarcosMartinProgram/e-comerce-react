import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import './Navbar.css';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { isAuthenticated, logout } = useContext(AuthContext);

  const handleClick = () => {
    setIsMobile(!isMobile);
  };

  const handleLogout = () => {
    
    logout();
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">
        <Link to="/">Ecomerce</Link>
      </h1>

      <div className={`navbar-menu ${isMobile ? 'active' : ''}`}>
        <ul className="navbar-links">
          <li className="navbar-item">
            <Link to="/categories">Categories</Link>
          </li>
          <li className="navbar-item">
            <Link to="/products">Products</Link>
          </li>
          <li className="navbar-item">
            <Link to="/">Home</Link>
          </li>
          {isAuthenticated ? (
            <li className="navbar-item">
              <button onClick={handleLogout}>Logout</button>
            </li>
          ) : (
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>

      <button className="navbar-toggle" onClick={handleClick}>
        <div className={`navbar-toggle-icon ${isMobile ? 'open' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </button>
    </nav>
  );
};

export default Navbar;

