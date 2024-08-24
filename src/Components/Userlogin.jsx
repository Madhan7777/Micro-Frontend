import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Container, Typography, Box, Alert, InputAdornment } from '@mui/material';
import { Email as EmailIcon, Lock as LockIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledContainer = styled(Container)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: theme.palette.background.paper,
}));

const LoginBox = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: '400px',
  padding: theme.spacing(3),
  boxShadow: theme.shadows[5],
  backgroundColor: theme.palette.background.default,
  borderRadius: '8px',
  textAlign: 'center',
}));

function UserLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigate = useNavigate();

  const specialCharPattern = /[!@#$%^&*(),.?":{}|<>]/;
  const emailPattern = /@/;

  const validateEmail = (email) => {
    return emailPattern.test(email);
  };

  const validatePassword = (password) => {
    return specialCharPattern.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setEmailError('');
    setPasswordError('');

    if (!validateEmail(email)) {
      setEmailError('Email must contain an @ symbol.');
      return;
    }

    if (!validatePassword(password)) {
      setPasswordError('Password must contain at least one special character.');
      return;
    }

    const userData = { email, password };

    axios.post('http://localhost:8090/loginUser', userData)
      .then(response => {
        alert('Login successful!');
        navigate('/usernavbar');
      })
      .catch(err => {
        setError(err.response?.data || 'Login failed');
      });
  };

  return (
    <StyledContainer>
      <LoginBox>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          User Login
        </Typography>
        <form onSubmit={handleSubmit}>
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
              sx={{ marginBottom: 2 }}
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
              sx={{ marginBottom: 2 }}
            />
          </Box>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Login
          </Button>
          {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}
        </form>
      </LoginBox>
    </StyledContainer>
  );
}

export default UserLogin;
