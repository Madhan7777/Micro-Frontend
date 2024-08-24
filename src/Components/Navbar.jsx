import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Typography, Button, Menu, MenuItem, Container, Card, CardMedia, CardContent, CardActions } from '@mui/material';
import { Menu as MenuIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import { styled } from '@mui/material/styles';
import Footer from './Footer';
import { navItems } from './Navitems';


const StyledAppBar = styled(AppBar)({
  backgroundColor: '#007bff', 
});

const StyledLink = styled(Link)({
  color: 'white',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: '500',
  padding: '0.5rem 1rem',
  borderRadius: '4px',
  '&:hover': {
    backgroundColor: '#0056b3', // Darker shade on hover
    color: 'white',
  },
});

const StyledCarouselImage = styled(CardMedia)({
  height: '60vh',
  objectFit: 'cover',
});

const StyledCard = styled(Card)({
  backgroundColor: 'white',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  margin: '1rem',
  width: '30%',
  overflow: 'hidden',
});

const StyledCardImage = styled(CardMedia)({
  height: '200px',
  objectFit: 'cover',
});

const StyledCardContent = styled(CardContent)({
  padding: '1rem',
});

function Navbar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextButton = document.querySelector('.carousel-control-next');
      if (nextButton) {
        nextButton.click();
      }
    }, 5000);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <StyledAppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to="/" style={{ textDecoration: 'none', color: 'white', display: 'flex', alignItems: 'center' }}>
              F&BSS <MenuIcon />
            </Link>
          </Typography>
          <div>
            {navItems.map((item) => (
              item.title === 'Login' ? (
                <Button
                  key={item.id}
                  onClick={handleMenuClick}
                  color="inherit"
                >
                  {item.title}
                </Button>
              ) : (
                <StyledLink to={item.path} key={item.id}>
                  {item.title}
                </StyledLink>
              )
            ))}
          </div>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleMenuClose}
          >
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
            {/* Add more menu items if needed */}
          </Menu>
        </Toolbar>
      </StyledAppBar>

      <Carousel interval={5000} fade>
        <Carousel.Item>
          <StyledCarouselImage image="https://www.ge.com/digital/sites/default/files/2020-06/food-beverage-manufacturing-operations-3200x1404.jpg" title="Manufacturing Process" />
          <Carousel.Caption>
            <p style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '1rem', borderRadius: '4px' }}>
              Food and beverage manufacturing plants transform raw food commodities into products for intermediate or final consumption by applying labor, machinery, energy, and scientific knowledge.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <StyledCarouselImage image="https://www.foodnavigator.com/var/wrbm_gb_food_pharma/storage/images/_aliases/wrbm_large/publications/food-beverage-nutrition/foodnavigator.com/article/2021/07/01/decarbonising-food-and-beverage-manufacturing-in-europe/12613401-1-eng-GB/Decarbonising-food-and-beverage-manufacturing-in-Europe.jpg" title="Spaghetti" />
          <Carousel.Caption>
            <p style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '1rem', borderRadius: '4px' }}>
              Food and beverage manufacturing plants transform raw food commodities into products for intermediate or final consumption by applying labor, machinery, energy, and scientific knowledge.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <StyledCarouselImage image="https://lancersglobal.com/storage/images/blogs/featured-images/digital-transformation-revolutionizing-the-food-and-beverage-manufacturing-industry.png" title="Noodles" />
          <Carousel.Caption>
            <p style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)', color: 'white', padding: '1rem', borderRadius: '4px' }}>
              Food and beverage manufacturing plants transform raw food commodities into products for intermediate or final consumption by applying labor, machinery, energy, and scientific knowledge.
            </p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>

      <section style={{ padding: '2rem', backgroundColor: '#f8f9fa' }}>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <StyledCard>
              <StyledCardImage image="https://assets.epicurious.com/photos/57d70c8ade27564257b657c6/master/pass/perfect-steamed-rice.jpg" />
              <StyledCardContent>
                <Typography variant="h5">Rice</Typography>
                <Typography variant="body2">
                  Rice is a cereal grain and in its domesticated form is the staple food of over half of the world's population, particularly in Asia and Africa.
                </Typography>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/details" style={{ textDecoration: 'none', color: 'inherit' }}>Learn More</Link>
                  </Button>
                </CardActions>
              </StyledCardContent>
            </StyledCard>
            <StyledCard>
              <StyledCardImage image="https://i0.wp.com/post.healthline.com/wp-content/uploads/2022/10/2555753-Nonalcoholic-Drinks-and-Mixers-Best-Ones-1296x728-header.jpg?w=1155&h=1528" />
              <StyledCardContent>
                <Typography variant="h5">Beverages</Typography>
                <Typography variant="body2">
                  It's something you might offer a guest in your house; it's also the favorite moniker of companies that manufacture both soda and juice — they call themselves beverage companies. One of the most popular beverages in history is Coca-Cola, developed in 1886.
                </Typography>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/details" style={{ textDecoration: 'none', color: 'inherit' }}>Learn More</Link>
                  </Button>
                </CardActions>
              </StyledCardContent>
            </StyledCard>
            <StyledCard>
              <StyledCardImage image="https://assets.gqindia.com/photos/60dc53c0f957deba6aa1e839/master/w_1600%2Cc_limit/Naagin_Kashvi%2520Gidwani%2520%255BApril%25202021%255D-10.jpg" />
              <StyledCardContent>
                <Typography variant="h5">Sauce</Typography>
                <Typography variant="body2">
                  Sauces are liquids, or semisolid liquids with a thickening agent, such as flour or cornstarch and seasonings. Sauces may also be prepared by reduction. Sauces can be used to moisten food and add flavor.
                </Typography>
                <CardActions>
                  <Button size="small" color="primary">
                    <Link to="/details" style={{ textDecoration: 'none', color: 'inherit' }}>Learn More</Link>
                  </Button>
                </CardActions>
              </StyledCardContent>
            </StyledCard>
          </div>
        </Container>
      </section>

      <Footer />
    </>
  );
}

export default Navbar;
