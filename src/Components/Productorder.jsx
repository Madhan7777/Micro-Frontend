import React, { useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Snackbar,
  Alert,
  Box,
  InputAdornment,
  FormControl,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@mui/material';
import {
  AccountCircle,
  Home,
  Phone,
  CreditCard,
  CalendarToday,
  Lock,
  AccountBalance
} from '@mui/icons-material';
import { styled } from '@mui/system';

// Styling for background image
const backgroundImageStyle = {
  backgroundImage: 'url("https://example.com/background.jpg")', // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '20px',
};

// Styled component for form layout
const FormGrid = styled('div')(() => ({
  display: 'flex',
  flexDirection: 'column',
}));

const ProductOrder = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  const totalAmount = location.state?.totalAmount || 0;

  const [order, setOrder] = useState({
    userName: '',
    plotNumber: '',
    streetName: '',
    cityName: '',
    stateName: '',
    contactNumber: '',
    cardNum: '',
    exp: '',
    cvv: '',
    paymentType: 'creditCard', // Default to credit card
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  // Handle form input changes
  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  // Handle payment type change
  const handlePaymentTypeChange = (event) => {
    setOrder({ ...order, paymentType: event.target.value });
  };

  // Validate order fields
  const validateOrder = () => {
    const { userName, plotNumber, streetName, cityName, stateName, contactNumber, cardNum, exp, cvv } = order;
    const errors = [];

    if (!userName) errors.push('User Name is required.');
    if (!plotNumber) errors.push('Plot Number is required.');
    if (!streetName) errors.push('Street Name is required.');
    if (!cityName) errors.push('City Name is required.');
    if (!stateName) errors.push('State Name is required.');
    if (!contactNumber || !/^\d{10}$/.test(contactNumber)) errors.push('Contact Number must be a 10-digit number.');
    if (order.paymentType === 'creditCard') {
      if (!cardNum || !/^\d{16}$/.test(cardNum.replace(/\s/g, ''))) errors.push('Card Number must be a 16-digit number.');
      if (!exp || !/^\d{4}$/.test(exp)) errors.push('Expiration Year must be a 4-digit year.');
      if (!cvv || !/^\d{3}$/.test(cvv)) errors.push('CVV must be a 3-digit number.');
    }

    if (errors.length > 0) {
      setError(errors.join(' '));
      return false;
    }
    return true;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateOrder()) return;

    axios.post('http://localhost:8090/ProductOrder/insertFoodOrder', {
      ...order,
      orderDate: new Date().toISOString().split('T')[0], // Set current date as orderDate
      cartItems,
      totalAmount
    })
      .then(response => {
        setSuccessMessage('Order placed successfully');
        setError('');
        setOrder({
          userName: '',
          plotNumber: '',
          streetName: '',
          cityName: '',
          stateName: '',
          contactNumber: '',
          cardNum: '',
          exp: '',
          cvv: '',
          paymentType: 'creditCard'
        });
      })
      .catch(err => {
        setError('Failed to place order');
        console.error(err);
      });
  };

  const handleCancel = () => {
    navigate('/viewuserproduct');
  };

  return (
    <Container maxWidth="sm" style={backgroundImageStyle}>
      <Typography variant="h4" gutterBottom align="center" style={{ color: 'black' }}>
        Order Summary
      </Typography>

      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="User Name"
              name="userName"
              value={order.userName}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Plot Number"
              name="plotNumber"
              value={order.plotNumber}
              onChange={handleChange}
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Home />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Street Name"
              name="streetName"
              value={order.streetName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="City Name"
              name="cityName"
              value={order.cityName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="State Name"
              name="stateName"
              value={order.stateName}
              onChange={handleChange}
              required
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Contact Number"
              name="contactNumber"
              value={order.contactNumber}
              onChange={handleChange}
              required
              type="tel"
              pattern="\d{10}"
              helperText="Contact Number must be a 10-digit number."
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />
          </Grid>

          <Grid item xs={12}>
            <FormControl component="fieldset" fullWidth>
              <RadioGroup
                aria-label="Payment options"
                name="paymentType"
                value={order.paymentType}
                onChange={handlePaymentTypeChange}
                row
              >
                <FormControlLabel
                  value="creditCard"
                  control={<Radio />}
                  label="Credit Card"
                />
                <FormControlLabel
                  value="bankTransfer"
                  control={<Radio />}
                  label="Bank Transfer"
                />
              </RadioGroup>
            </FormControl>
          </Grid>

          {order.paymentType === 'creditCard' && (
            <Grid item xs={12}>
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 2,
                  padding: 3,
                  borderRadius: '10px',
                  border: '1px solid',
                  borderColor: 'divider',
                  backgroundColor: 'background.paper',
                  boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)',
                }}
              >
                <Typography variant="h6">Credit Card Details</Typography>
                <TextField
                  fullWidth
                  label="Card Number"
                  name="cardNum"
                  value={order.cardNum}
                  onChange={handleChange}
                  required
                  placeholder="0000 0000 0000 0000"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <CreditCard />
                      </InputAdornment>
                    ),
                  }}
                />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="Expiration Date"
                      name="exp"
                      value={order.exp}
                      onChange={handleChange}
                      required
                      placeholder="MM/YY"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <CalendarToday />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      fullWidth
                      label="CVV"
                      name="cvv"
                      value={order.cvv}
                      onChange={handleChange}
                      required
                      placeholder="123"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          )}

          {/* Bank Transfer Details */}
          {order.paymentType === 'bankTransfer' && (
            <Grid item xs={12}>
              <Card variant="outlined" style={{ padding: '20px', backgroundColor: '#fff' }}>
                <CardHeader title="Bank Transfer Details" />
                <CardContent>
                  <Alert severity="warning">
                    Not Available at Current Moment.
                  </Alert>
                  {/* <Box mt={2}>
                    <Typography variant="body1" color="text.secondary">
                      Bank: <strong>Mastercredit</strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Account Number: <strong>123456789</strong>
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Routing Number: <strong>987654321</strong>
                    </Typography>
                  </Box> */}
                </CardContent>
              </Card>
            </Grid>
          )}

          {/* Buttons */}
          <Grid item xs={12} style={{ textAlign: 'center' }}>
            <Button type="submit" variant="contained" color="primary" style={{ margin: '0 10px' }}>
              Place Order
            </Button>
            <Button variant="outlined" color="secondary" onClick={handleCancel} style={{ margin: '0 10px' }}>
              Cancel Order
            </Button>
          </Grid>
          {error && (
            <Grid item xs={12}>
              <Alert severity="error">{error}</Alert>
            </Grid>
          )}
          {successMessage && (
            <Grid item xs={12}>
              <Alert severity="success">{successMessage}</Alert>
            </Grid>
          )}
        </Grid>
      </form>

      {/* Cart Items */}
      <Card variant="outlined" style={{ marginTop: '20px', backgroundColor: '#fff' }}>
        <CardHeader title="Cart Items" />
        <CardContent>
          {cartItems.length > 0 ? (
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              {cartItems.map((item) => (
                <li key={item.productId}>
                  <Typography variant="body1">
                    Product ID: {item.productId}, Quantity: {item.quantity}
                  </Typography>
                </li>
              ))}
            </ul>
          ) : (
            <Typography variant="body2">No items in the cart.</Typography>
          )}
        </CardContent>
      </Card>

      {/* Total Amount */}
      <Box mt={2} textAlign="center">
        <Typography variant="h6">Total Amount: ₹{totalAmount.toFixed(2)}</Typography>
      </Box>
    </Container>
  );
};

export default ProductOrder;
