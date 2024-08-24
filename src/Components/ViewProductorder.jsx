import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Snackbar, Alert, Box } from '@mui/material';
import { Info as InfoIcon, Person as PersonIcon, Phone as PhoneIcon, CalendarToday as CalendarTodayIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const ViewProductOrder = () => {
  const [orders, setOrders] = useState([]);
  const [error, setError] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = () => {
    axios.get('http://localhost:8090/ProductOrder/findAllOrder')
      .then(response => {
        setOrders(response.data);
      })
      .catch(err => {
        setError('Failed to fetch orders');
        setOpenSnackbar(true);
      });
  };

  const handleViewDetails = (orderId) => {
    axios.get(`http://localhost:8090/ProductOrder/findOrderById/${orderId}`)
      .then(response => {
        setSnackbarMessage(JSON.stringify(response.data, null, 2));
        setOpenSnackbar(true);
      })
      .catch(err => {
        setError('Failed to fetch order details');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleGoBack = () => {
    navigate('/adminnavbar');  
  };

  const containerStyle = {
    padding: '20px',
    marginTop: '20px',
    backgroundImage: 'url()', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh'
  };

  return (
    <Container component={Paper} maxWidth="lg" sx={{ padding: 4, marginTop: 4 }} style={containerStyle}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" align="center" gutterBottom sx={{ flexGrow: 1 }}>
          Product Orders
        </Typography>
      </Box>
      {error && <Alert severity="error" sx={{ marginBottom: 2 }}>{error}</Alert>}
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell><PersonIcon /></TableCell>
              <TableCell><PhoneIcon /></TableCell>
              <TableCell><CalendarTodayIcon /></TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map(order => (
              <TableRow key={order.orderId}>
                <TableCell>{order.userName}</TableCell>
                <TableCell>{order.contactNumber}</TableCell>
                <TableCell>{order.orderDate}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleViewDetails(order.orderId)}
                    sx={{ marginRight: 1 }}
                  >
                    <InfoIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        message={snackbarMessage}
      >
        <Alert onClose={handleCloseSnackbar} severity={error ? 'error' : 'info'} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default ViewProductOrder;
