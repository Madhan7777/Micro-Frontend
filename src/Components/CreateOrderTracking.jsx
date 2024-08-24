import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Container, Typography, TextField, Button, CircularProgress, List, ListItem, ListItemText, IconButton, Box, InputAdornment } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { styled } from '@mui/material/styles';

// Styled components for consistent styling
const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(1),
  borderRadius: '6px',
  padding: theme.spacing(1, 2),
  textTransform: 'none',
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.1)',
  backdropFilter: 'blur(8px)',
  borderRadius: '10px',
  margin: theme.spacing(1, 0),
  color: theme.palette.common.black,
  transition: 'box-shadow 0.3s ease',
  '&:hover': {
    boxShadow: theme.shadows[5],
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '6px',
  '& .MuiInputBase-input': {
    color: theme.palette.common.black,
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'rgba(255, 255, 255, 0.3)',
    },
    '&:hover fieldset': {
      borderColor: theme.palette.primary.main,
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const CreateOrderTracking = () => {
  const [orderTrackings, setOrderTrackings] = useState([]);
  const [newTracking, setNewTracking] = useState({ orderId: '', status: '' });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrderTrackings = async () => {
      try {
        const response = await axios.get('http://localhost:8090/order-tracking');
        setOrderTrackings(response.data || []);
      } catch (err) {
        setError(`Error fetching order trackings: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderTrackings();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewTracking({ ...newTracking, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8090/order-tracking', newTracking);
      setOrderTrackings([...orderTrackings, response.data]);
      setNewTracking({ orderId: '', status: '' });
    } catch (err) {
      setError(`Error creating order tracking: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/order-tracking/${id}`);
      setOrderTrackings(orderTrackings.filter(tracking => tracking.id !== id));
    } catch (err) {
      setError(`Error deleting order tracking: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleEdit = (id) => {
    navigate(`/edittracking/${id}`);
  };

  const handleGoBack = () => {
    navigate('/adminnavbar');  
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm" sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.1)', borderRadius: 2, backdropFilter: 'blur(10px)', boxShadow: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
        <IconButton onClick={handleGoBack} color="primary">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h4" align="center" color="black" sx={{ flexGrow: 1, textAlign: 'center' }} gutterBottom>
          Order Tracking
        </Typography>
      </Box>
      
      <Box sx={{ marginBottom: 4, padding: 2, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 2 }}>
        <Typography variant="h6" color="black" gutterBottom>
          Add New Order Tracking
        </Typography>
        <StyledTextField
          label="Order ID"
          name="orderId"
          value={newTracking.orderId}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditIcon />
              </InputAdornment>
            ),
          }}
        />
        <StyledTextField
          label="Status"
          name="status"
          value={newTracking.status}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <EditIcon />
              </InputAdornment>
            ),
          }}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleCreate}
        >
          Add Tracking
        </StyledButton>
      </Box>

      <List>
        {orderTrackings.length > 0 ? (
          orderTrackings.map(tracking => (
            <StyledListItem key={tracking.id}>
              <ListItemText primary={`Order ID: ${tracking.orderId || 'N/A'}`} secondary={`Status: ${tracking.status || 'N/A'}`} />
              <IconButton onClick={() => handleEdit(tracking.id)} color="success">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(tracking.id)} color="error">
                <DeleteIcon />
              </IconButton>
            </StyledListItem>
          ))
        ) : (
          <Typography>No order trackings available.</Typography>
        )}
      </List>
    </Container>
  );
};

export default CreateOrderTracking;
