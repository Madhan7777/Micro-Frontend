import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Grid, CircularProgress, Snackbar, Typography } from '@mui/material';
import { FaShoppingCart } from 'react-icons/fa';
import MuiAlert from '@mui/material/Alert';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import UserHeader from './UserHeader';

const backgroundImageStyle = {
  backgroundImage: 'url("https://example.com/background.jpg")', // Replace with your image URL
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  minHeight: '100vh',
  padding: '20px',
};

const Container = styled('div')({
  backgroundColor: '#f5f5f5',
  minHeight: '100vh',
  padding: '20px',
});

const Header = styled('header')({
  padding: '20px',
  backgroundColor: '#3f51b5',
  color: 'white',
  textAlign: 'center',
  marginBottom: '20px',
});

const TotalAmount = styled('div')({
  backgroundColor: 'white',
  padding: '15px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  marginBottom: '20px',
});

const ProductCard = styled(Card)({
  boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  borderRadius: '8px',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
});

const ProductImage = styled('img')({
  width: '100%',
  height: '200px',
  objectFit: 'cover',
});

const ProductTitle = styled(Typography)({
  fontWeight: 'bold',
  color: '#333',
});

const ProductPrice = styled(Typography)({
  fontWeight: 'bold',
  color: '#d32f2f',
});

const ProductDetails = styled('div')({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginTop: '10px',
});

const ViewUserproduct = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [quantities, setQuantities] = useState({});
  const [loading, setLoading] = useState(true);
  const [totalAmount, setTotalAmount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    calculateTotalAmount();
  }, [quantities, products]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get('http://localhost:8090/AdminProduct/findAllProduct');
      setProducts(response.data);
    } catch (err) {
      setError('Failed to fetch products');
    } finally {
      setLoading(false);
    }
  };

  const handleQuantityChange = (productId, delta) => {
    setQuantities(prevQuantities => ({
      ...prevQuantities,
      [productId]: Math.max(0, (prevQuantities[productId] || 0) + delta)
    }));
  };

  const handleAddToCart = async (productId) => {
    const quantity = quantities[productId] || 0;

    if (quantity > 0) {
      // Collect all items and quantities to send to the order page
      const cartItems = products.map(product => ({
        productId: product.productId,
        quantity: quantities[product.productId] || 0
      })).filter(item => item.quantity > 0);

      navigate('/productorder', { state: { cartItems, totalAmount } });
    }
  };

  const calculateTotalAmount = () => {
    let amount = 0;
    products.forEach(product => {
      const quantity = quantities[product.productId] || 0;
      amount += product.price * quantity;
    });
    setTotalAmount(amount);
  };

  return (
    <Container>
          <UserHeader/>

      <Header>
        <Typography variant="h4">Food & Beverages</Typography>
      </Header>
    
      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '60vh' }}>
          <CircularProgress />
        </div>
      )}

      {error && (
        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <MuiAlert elevation={6} variant="filled" severity="error" onClose={() => setError('')}>
            {error}
          </MuiAlert>
        </Snackbar>
      )}

      {!loading && !error && (
        <>
          <TotalAmount>
            <Typography variant="h5">Total Amount: ₹{totalAmount.toFixed(2)}</Typography>
          </TotalAmount>

          <Grid container spacing={4}>
            {products.map(product => (
              <Grid item xs={12} sm={6} md={4} key={product.productId}>
                <ProductCard>
                  {product.imageName && (
                    <ProductImage
                      src={`http://localhost:8090/AdminProduct/findProdImage/${product.productId}`}
                      alt={product.productName}
                    />
                  )}
                  <div style={{ padding: '16px' }}>
                    <ProductTitle variant="h6">{product.productName}</ProductTitle>
                    <Typography variant="subtitle2" color="textSecondary">Category: {product.category}</Typography>
                    <ProductPrice variant="h6">Price: ₹{product.price.toFixed(2)}</ProductPrice>
                    <Typography variant="caption">Product ID: {product.productId}</Typography>

                    <ProductDetails>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleQuantityChange(product.productId, -1)}
                          disabled={(quantities[product.productId] || 0) <= 0}
                        >
                          -
                        </Button>
                        <Typography variant="h6" style={{ margin: '0 10px' }}>
                          {quantities[product.productId] || 0}
                        </Typography>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleQuantityChange(product.productId, 1)}
                        >
                          +
                        </Button>
                      </div>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={() => handleAddToCart(product.productId)}
                        style={{ marginLeft: 'auto' }}
                      >
                        <FaShoppingCart style={{ marginRight: '8px' }} />
                        Add to Cart
                      </Button>
                    </ProductDetails>
                  </div>
                </ProductCard>
              </Grid>
            ))}
          </Grid>

          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => navigate('/productorder')}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              <FaShoppingCart style={{ marginRight: '8px' }} />
              Buy Now
            </Button>
          </div>
        </>
      )}
    </Container>
  );
};

export default ViewUserproduct;
