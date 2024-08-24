import React from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Card, CardContent, CardMedia, Container, Grid, Menu, MenuItem, Box, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Carousel from 'react-material-ui-carousel'; // Install this package using `npm install react-material-ui-carousel`

// Styled components for custom styling
const Navbar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  position: 'sticky',  // Make the navbar sticky
  top: 0,              // Stick to the top
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

const CustomCard = styled(Card)(({ theme }) => ({
  boxShadow: theme.shadows[3],
  borderRadius: theme.shape.borderRadius,
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
}));

const cardStyle = {
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const carouselImages = [
  "https://axil-is.com/wp-content/uploads/2022/08/Reducing-Food-Waste-Image-1.jpeg",
  "https://www.verdict.co.uk/wp-content/uploads/2022/08/shutterstock_643298734-scaled-e1659110097824-8d85920dbf8f3d9549c8c6e571158049.jpg",
  "https://images.surferseo.art/349916e8-7cee-4765-b9ee-e19c0c21b9e6.png",
  
];

const UserNavbar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {/* Sticky Navbar */}
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

      {/* Carousel Section */}
      <Carousel autoPlay interval={5000} indicators={false} navButtonsAlwaysVisible>
        {carouselImages.map((image, index) => (
          <img key={index} src={image} alt={`Slide ${index}`} style={{ width: '100%', height: 'auto' }} />
        ))}
      </Carousel>

      {/* Card Section */}
      <Container maxWidth="lg" style={{ marginTop: '20px' }}>
        <Grid container spacing={4}>
          {/* Card 1 */}
          <Grid item xs={12} md={4}>
            <CustomCard style={cardStyle}>
              <CardMedia
                component="img"
                height="140"
                image="https://axil-is.com/wp-content/uploads/2022/08/Reducing-Food-Waste-Image-1.jpeg"
                alt="Delicious Burger"
              />
              <CardContent>
                <Typography variant="h5" component="div">Benefits of Food Manufacturing</Typography>
                <Typography variant="body2" color="text.secondary">
                  The food manufacturing industry also plays a vital role in food preservation and safety. Through advanced technologies and processes, the industry can extend the shelf life of perishable foods, reducing food waste and ensuring that food reaches consumers in a safe and consumable condition.
                </Typography>
                <Button variant="contained" color="primary" component={NavLinkStyled} to="/usernavbar" style={{ marginTop: '10px' }}>
                  Explore Now
                </Button>
              </CardContent>
            </CustomCard>
          </Grid>
          {/* Card 2 */}
          <Grid item xs={12} md={4}>
            <CustomCard style={cardStyle}>
              <CardMedia
                component="img"
                height="140"
                image="https://www.verdict.co.uk/wp-content/uploads/2022/08/shutterstock_643298734-scaled-e1659110097824-8d85920dbf8f3d9549c8c6e571158049.jpg"
                alt="Plate of Food"
              />
              <CardContent>
                <Typography variant="h5" component="div">Objective of Food Factory</Typography>
                <Typography variant="body2" color="text.secondary">
                  Food manufacturing aims to create safe, healthy, and nutritious food products that meet the needs and preferences of consumers. Food manufacturing is a complex and highly regulated industry that requires strict adherence to food safety and quality standards.
                </Typography>
                <Button variant="contained" color="primary" component={NavLinkStyled} to="/usernavbar" style={{ marginTop: '10px' }}>
                  Explore Now
                </Button>
              </CardContent>
            </CustomCard>
          </Grid>
          {/* Card 3 */}
          <Grid item xs={12} md={4}>
            <CustomCard style={cardStyle}>
              <CardMedia
                component="img"
                height="140"
                image="https://images.surferseo.art/349916e8-7cee-4765-b9ee-e19c0c21b9e6.png"
                alt="Delicious Meal"
              />
              <CardContent>
                <Typography variant="h5" component="div">Advantages of Food Production</Typography>
                <Typography variant="body2" color="text.secondary">
                  Food manufacturing allows for consistent and controlled production of food products. This ensures that the quality of the food products is standardized. The use of advanced technology and equipment in food manufacturing also eliminates human error, resulting in a more consistent quality product.
                </Typography>
                <Button variant="contained" color="primary" component={NavLinkStyled} to="/usernavbar" style={{ marginTop: '10px' }}>
                  Explore Now
                </Button>
              </CardContent>
            </CustomCard>
          </Grid>
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box component="footer" style={{ padding: '20px', backgroundColor: '#f1f1f1', textAlign: 'center' }}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} F&bss. All rights reserved.
        </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <Typography variant="body2" color="textSecondary">
          Contact us at: info@fbss.com
        </Typography>
      </Box>
    </div>
  );
};

export default UserNavbar;
