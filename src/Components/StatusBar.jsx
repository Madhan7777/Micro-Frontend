
import React from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import { styled } from '@mui/material/styles';

const StatusBarContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: theme.spacing(2),
  padding: theme.spacing(1),
  marginTop: theme.spacing(2),
}));

const StatusText = styled(Typography)(({ theme }) => ({
  textAlign: 'center',
  color: theme.palette.common.white,
  marginBottom: theme.spacing(1),
}));

const StatusBar = ({ stage }) => {
  let progress = 0;
  let statusText = '';

  switch (stage) {
    case 'Preparing to fetch data...':
      progress = 10;
      statusText = 'Preparing...';
      break;
    case 'Fetching data from server...':
      progress = 50;
      statusText = 'Fetching...';
      break;
    case 'Data fetched successfully!':
      progress = 100;
      statusText = 'Completed';
      break;
    case 'Error fetching data. Please try again.':
      progress = 0;
      statusText = 'Error';
      break;
    default:
      progress = 0;
      statusText = 'Idle';
  }

  return (
    <StatusBarContainer>
      <StatusText variant="body2">{statusText}</StatusText>
      <LinearProgress variant="determinate" value={progress} />
    </StatusBarContainer>
  );
};

export default StatusBar;
