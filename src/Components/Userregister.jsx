import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, InputAdornment } from '@mui/material';
import { Person as PersonIcon, Email as EmailIcon, Lock as LockIcon, Phone as PhoneIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
}));

const RegisterBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  textAlign: 'center',
}));

function UserRegister() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const navigate = useNavigate();

  
  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const emailPattern = /^[a-zA-Z][\w.-]*@[a-zA-Z]+\.[a-zA-Z]{2,}$/;
  const phonePattern = /^\d{10}$/;
  const namePattern = /^[A-Za-z\s]+$/;

  const validateName = (name) => namePattern.test(name);
  const validateEmail = (email) => emailPattern.test(email);
  const validatePassword = (password) => specialCharPattern.test(password);
  const validatePhone = (phone) => phonePattern.test(phone);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Reset errors
    setError('');
    setNameError('');
    setEmailError('');
    setPasswordError('');
    setPhoneError('');

    // Validate input fields
    if (!validateName(name)) {
      setNameError('Name must contain only alphabetic characters and spaces.');
      return;
    }

    if (!validateEmail(email)) {
      setEmailError('Email must start with an alphabet and contain an @ symbol.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one special character.');
      return;
    }

    if (!validatePhone(phone)) {
      setPhoneError('Phone number must contain exactly 10 digits.');
      return;
    }

    // Construct user data object
    const userData = {
      userName: name,
      email: email,
      password: password,
      phoneNo: phone
    };

    // Make the POST request
    axios.post('http://localhost:8090/registerUser', userData)
      .then(response => {
        alert('User registered successfully');
        navigate('/usernavbar'); // Redirect to user login page
      })
      .catch(err => {
        console.error('Registration failed:', err);
        setError(err.response?.data || 'Failed to register user');
      });
  };

  return (
    <StyledContainer>
      <RegisterBox>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          User Registration
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={Boolean(nameError)}
              helperText={nameError}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={Boolean(emailError)}
              helperText={emailError}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={Boolean(passwordError)}
              helperText={passwordError}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Box mb={2}>
            <TextField
              fullWidth
              label="Phone Number"
              variant="outlined"
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              error={Boolean(phoneError)}
              helperText={phoneError}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PhoneIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
          >
            Register
          </Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      </RegisterBox>
    </StyledContainer>
  );
}

export default UserRegister;
