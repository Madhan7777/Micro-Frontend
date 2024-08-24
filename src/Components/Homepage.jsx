import React from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';

function Homepage() {
  return (
    <div className="hero-section">
      <div className="container d-flex align-items-center justify-content-center fs-1 text-white flex-column">
        <h1>FOOD & BEVERAGE'S</h1>
        <h2>MANUFACTURER</h2>
      </div>
      <nav className="navbar navbar-expand-lg fixed-top">
        <div className="container">
          <a className="navbar-brand me-auto" href="#">Logo</a>
          
          <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="offcanvas offcanvas-end" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel">
            <div className="offcanvas-header">
              <h5 className="offcanvas-title" id="offcanvasNavbarLabel">Menu</h5>
              <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
              <ul className="navbar-nav justify-content-center flex-grow-1 pe-3">
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" aria-current="page" to="/">Home</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/about">About</Link>
                </li>
                
                <li className="nav-item">
                  <Link className="nav-link mx-lg-2" to="/contact">Contact Us</Link>
                </li>
                <div>
            <Link to="/userlogin" className="login-button">User Login</Link>
            <Link to="/userregister" className="login-button">User Register</Link>

            <Link to="/login" className="login-button">Admin Login</Link>
            <Link to="/register" className="login-button">Admin Register</Link>
          </div>
              </ul>
            </div>
          </div>

        
        </div>
      </nav>
    </div>
  );
}

export default Homepage;
