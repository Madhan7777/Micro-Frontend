
import React from 'react';
import './Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h4>About Us</h4>
          <p>We are dedicated to providing delicious and high-quality food experiences. Join us in our culinary journey!</p>
        </div>
        <div className="footer-section">
          <h4>Contact</h4>
          <p>Email: info@fbss.com</p>
          <p>Phone: +1-234-567-8901</p>
        </div>
        <div className="footer-section">
          <h4>Follow Us</h4>
          <a href="#">Facebook</a>
          <a href="#">Twitter</a>
          <a href="#">Instagram</a>
        </div>
      </div>
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} F&BSS. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
