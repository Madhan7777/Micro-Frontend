import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./Adminregister.css";

function Adminregister() {
  const [admin, setAdmin] = useState({
    email: '',
    password: '',
    phoneno: '',
    adminName: ''
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8090/registerAdmin', admin)
      .then(response => {
        alert('Registration successful. Please log in.');
        navigate('/login');  // Redirect to login page after successful registration
      })
      .catch(err => {
        setError(err.response.data || 'Registration failed');
      });
  };

  return (
    <div className="container">
      <h1>Register Admin</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="adminName">Admin Name:</label>
          <input
            type="text"
            id="adminName"
            name="adminName"
            className="form-control"
            value={admin.adminName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            className="form-control"
            value={admin.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            className="form-control"
            value={admin.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phoneno">Phone Number:</label>
          <input
            type="text"
            id="phoneno"
            name="phoneno"
            className="form-control"
            value={admin.phoneno}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">Register</button>
        {error && <p className="text-danger">{error}</p>}
      </form>
    </div>
  );
}

export default Adminregister;
