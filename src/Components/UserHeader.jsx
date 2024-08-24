// Header.jsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Menu, MenuItem } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';

const Navbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'sticky',
  top: 0,
  zIndex: theme.zIndex.appBar,
}));

const NavLinkStyled = styled(NavLink)(({ theme }) => ({
  color: theme.palette.common.white,
  textDecoration: 'none',
  padding: theme.spacing(1, 2),
  '&.active': {
    borderBottom: `2px solid ${theme.palette.secondary.main}`,
  },
}));

const UserHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Navbar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          <NavLinkStyled to="/">Food and beverages supply system</NavLinkStyled>
        </Typography>
        <NavLinkStyled to="/usernavbar" exact>Home</NavLinkStyled>
        <NavLinkStyled to="/viewuserproduct">View Products</NavLinkStyled>
        <NavLinkStyled to="/orderstatus">Order Status</NavLinkStyled>
        <NavLinkStyled to="/">Logout</NavLinkStyled>

        <Button color="inherit" onClick={() => alert('Logging out...')}>Logout</Button>
        <Button
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleMenuClick}
          color="inherit"
        >
          <AccountCircle />
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          <MenuItem onClick={handleMenuClose}>My Account</MenuItem>
          <MenuItem onClick={() => alert('Logging out...')}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </Navbar>
  );
};

export default UserHeader;
