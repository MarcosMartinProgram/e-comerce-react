import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

import './Navbar.css';

const Navbar = () => {
  const { isAuthenticated, userData, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <h1 className="navbar-logo">
        <Link to="/">Ecomerce</Link>
      </h1>

      <div className="navbar-menu">
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
          {isAuthenticated && (
            <>
              {userData?.role === 'admin' && (
                <>
                  <li className="navbar-item">
                    <Link to="/products/create">Create Product</Link>
                  </li>
                  
                  <li className="navbar-item">
                    <Link to="/categories/create">Create Category</Link>
                  </li>
                  

                </>
              )}
              <li className="navbar-item">
                <button onClick={handleLogout}>Logout</button>
              </li>
              <li className="navbar-item">
                <p className="navbar-welcome">Bienvenido {userData?.name}</p>
              </li>
            </>
          )}
          {!isAuthenticated && (
            <li className="navbar-item">
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;







