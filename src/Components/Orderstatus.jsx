// import React, { useState } from 'react';
// import axios from 'axios';
// import { Container, Typography, TextField, Button, CircularProgress, Box, InputAdornment } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import SearchIcon from '@mui/icons-material/Search';
// import InfoIcon from '@mui/icons-material/Info';

// // Styled components for consistent styling
// const StyledTextField = styled(TextField)(({ theme }) => ({
//   marginBottom: theme.spacing(2),
//   background: 'rgba(255, 255, 255, 0.2)',
//   borderRadius: '6px',
//   '& .MuiInputBase-input': {
//     color: theme.palette.common.black,
//   },
//   '& .MuiOutlinedInput-root': {
//     '& fieldset': {
//       borderColor: 'rgba(255, 255, 255, 0.3)',
//     },
//     '&:hover fieldset': {
//       borderColor: theme.palette.primary.main,
//     },
//     '&.Mui-focused fieldset': {
//       borderColor: theme.palette.primary.main,
//     },
//   },
// }));

// const StyledButton = styled(Button)(({ theme }) => ({
//   marginTop: theme.spacing(2),
//   borderRadius: '6px',
//   padding: theme.spacing(1, 2),
//   textTransform: 'none',
// }));

// const StatusContainer = styled(Container)(({ theme }) => ({
//   padding: theme.spacing(4),
//   maxWidth: '600px',
//   margin: 'auto',
//   background: 'rgba(255, 255, 255, 0.1)',
//   borderRadius: theme.spacing(2),
//   backdropFilter: 'blur(10px)',
//   boxShadow: theme.shadows[3],
//   backgroundImage: 'url("path-to-your-background-image.jpg")',
//   backgroundSize: 'cover',
//   backgroundPosition: 'center',
// }));

// const Orderstatus = () => {
//   const [orderId, setOrderId] = useState('');
//   const [tracking, setTracking] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);

//   const handleInputChange = (e) => {
//     setOrderId(e.target.value);
//   };

//   const handleFetchStatus = async () => {
//     setLoading(true);
//     try {
//       const response = await axios.get(`http://localhost:8090/order-tracking/${orderId}`);
//       setTracking(response.data);
//       setError(null);
//     } catch (err) {
//       setError(`Error fetching tracking details: ${err.response?.data?.message || err.message}`);
//       setTracking(null);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <StatusContainer>
//       <Typography variant="h4" align="center" color="black" gutterBottom>
//         Check Order Status
//       </Typography>

//       <Box sx={{ marginBottom: 4, padding: 2, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 2 }}>
//         <StyledTextField
//           label="Enter Order ID"
//           value={orderId}
//           onChange={handleInputChange}
//           fullWidth
//           InputProps={{
//             startAdornment: (
//               <InputAdornment position="start">
//                 <SearchIcon />
//               </InputAdornment>
//             ),
//           }}
//         />
//         <StyledButton
//           variant="contained"
//           color="primary"
//           onClick={handleFetchStatus}
//           disabled={loading}
//         >
//           {loading ? <CircularProgress size={24} color="inherit" /> : 'Fetch Status'}
//         </StyledButton>
//       </Box>

//       {error && <Typography color="error" align="center">{error}</Typography>}
//       {tracking && !loading && (
//         <Box sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 2 }}>
//           <Typography variant="h6" gutterBottom>
//             Order Tracking Details
//           </Typography>
//           <Typography><strong>Order ID:</strong> {tracking.orderId}</Typography>
//           <Typography><strong>Status:</strong> {tracking.status}</Typography>
//           <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
//             <InfoIcon sx={{ marginRight: 1, color: 'info.main' }} />
//             <Typography variant="body2">For more details, contact support.</Typography>
//           </Box>
//         </Box>
//       )}
//     </StatusContainer>
//   );
// };

// export default Orderstatus;





import React, { useState } from 'react';
import axios from 'axios';
import { Container, Typography, TextField, Button, CircularProgress, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';
import InfoIcon from '@mui/icons-material/Info';
import ArrowBack from '@mui/icons-material/ArrowBack';
import InputAdornment from '@mui/material/InputAdornment';
import StatusBar from './StatusBar'; // Import the StatusBar component
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';

// Styled components for consistent styling
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

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  borderRadius: '6px',
  padding: theme.spacing(1, 2),
  textTransform: 'none',
}));

const StatusContainer = styled(Container)(({ theme }) => ({
  padding: theme.spacing(4),
  maxWidth: '600px',
  margin: 'auto',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: theme.spacing(2),
  backdropFilter: 'blur(10px)',
  boxShadow: theme.shadows[3],
  backgroundImage: 'url("path-to-your-background-image.jpg")',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));

const Orderstatus = () => {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [stage, setStage] = useState('Preparing to fetch data...'); // Initial stage

  const navigate = useNavigate(); // Hook to handle navigation

  const handleInputChange = (e) => {
    setOrderId(e.target.value);
  };

  const handleFetchStatus = async () => {
    setLoading(true);
    setStage('Fetching data from server...');
    try {
      const response = await axios.get(`http://localhost:8090/order-tracking/${orderId}`);
      setTracking(response.data);
      setError(null);
      setStage('Data fetched successfully!');
    } catch (err) {
      setError(`Error fetching tracking details: ${err.response?.data?.message || err.message}`);
      setTracking(null);
      setStage('Error fetching data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StatusContainer>
      <Typography variant="h4" align="center" color="black" gutterBottom>
        Check Order Status
      </Typography>

      {/* Go Back Button */}
      <Button
        variant="outlined"
        color="primary"
        onClick={() => navigate('/usernavbar')} // Navigate to the desired page
        startIcon={<ArrowBack />}
        style={{ marginBottom: '20px' }}
      >
        Go Back
      </Button>

      <Box sx={{ marginBottom: 4, padding: 2, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 2 }}>
        <StyledTextField
          label="Enter Order ID"
          value={orderId}
          onChange={handleInputChange}
          fullWidth
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
        <StyledButton
          variant="contained"
          color="primary"
          onClick={handleFetchStatus}
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} color="inherit" /> : 'Fetch Status'}
        </StyledButton>
      </Box>

      <StatusBar stage={stage} /> {/* Display status bar */}

      {error && <Typography color="error" align="center">{error}</Typography>}
      {tracking && !loading && (
        <Box sx={{ padding: 2, background: 'rgba(255, 255, 255, 0.2)', borderRadius: 2 }}>
          <Typography variant="h6" gutterBottom>
            Order Tracking Details
          </Typography>
          <Typography><strong>Order ID:</strong> {tracking.orderId}</Typography>
          <Typography><strong>Status:</strong> {tracking.status}</Typography>
          <Box sx={{ marginTop: 2, display: 'flex', alignItems: 'center' }}>
            <InfoIcon sx={{ marginRight: 1, color: 'info.main' }} />
            <Typography variant="body2">For more details, contact support.</Typography>
          </Box>
        </Box>
      )}
    </StatusContainer>
  );
};

export default Orderstatus;



