import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Adminlogin.css";

function Adminlogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [adminId, setAdminId] = useState(null);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    return specialCharRegex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!validatePassword(password)) {
      setError('Password must contain at least one special character.');
      return;
    }

    axios.post('http://localhost:8090/loginAdmin', { email, password })
      .then(response => {
        setAdminId(response.data.adminId);  
        setError('');
        navigate('/adminnavbar');  
      })
      .catch(err => {
        setError(err.response.data || 'Login failed');
      });
  };

  return (
    <div className="container1">
      <div className="login-box">
        <img src="https://minicoy.utl.gov.in/public/assets/images/admin_login.png" alt="Admin" className="login-image" />
        <h1>Admin Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              className="form-control"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">Login</button>
          {error && <p className="text-danger">{error}</p>}
        </form>
      </div>
    </div>
  );
}

export default Adminlogin;
