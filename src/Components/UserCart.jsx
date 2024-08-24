import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Styles for the component (adjust as needed)
const containerStyle = {
  padding: '20px',
  maxWidth: '900px',
  margin: 'auto',
  background: 'rgba(255, 255, 255, 0.1)',
  borderRadius: '12px',
  backdropFilter: 'blur(10px)',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  color: '#fff'
};

const headingStyle = {
  textAlign: 'center',
  marginBottom: '30px',
  fontSize: '2rem',
  color: '#fff'
};

const listStyle = {
  marginBottom: '25px',
  padding: '20px',
  background: 'rgba(255, 255, 255, 0.2)',
  borderRadius: '10px',
  backdropFilter: 'blur(8px)',
  boxShadow: '0 3px 6px rgba(0, 0, 0, 0.1)',
  color: '#fff'
};

const buttonStyle = {
  padding: '12px 18px',
  border: 'none',
  borderRadius: '6px',
  backgroundColor: '#007bff',
  color: '#fff',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'background-color 0.3s ease, transform 0.2s ease',
  marginTop: '10px'
};

const buttonHoverStyle = {
  backgroundColor: '#0056b3',
  transform: 'translateY(-2px)'
};

const buttonActiveStyle = {
  backgroundColor: '#004494',
  transform: 'translateY(0)'
};

const UserCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const userId = 1; // Adjust to fetch dynamically

  useEffect(() => {
    const fetchCartItems = async () => {
      setLoading(true); // Set loading to true when starting to fetch data
      try {
        const response = await axios.get(`http://localhost:8090/userCart/findUserCartById/${userId}`);
        console.log('API Response:', response.data); // Log the response data
        if (response.data && response.data.cartItems) {
          setCartItems(response.data.cartItems);
          setTotalAmount(response.data.totalAmount);
        } else {
          setError('Unexpected data format received.');
        }
      } catch (err) {
        console.error('Error fetching cart items:', err); // Log the error
        setError(`Error fetching cart items: ${err.response?.data?.message || err.message}`);
      } finally {
        setLoading(false); // Set loading to false when data fetch completes
      }
    };

    fetchCartItems();
  }, [userId]);

  const calculateTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  const handleCheckout = () => {
    // Redirect to the checkout page
    navigate('/cartitem');
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>User Cart</h2>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div style={listStyle}>
          {error && <p style={{ color: '#dc3545', textAlign: 'center' }}>{error}</p>}

          {cartItems.length > 0 ? (
            <ul>
              {cartItems.map(item => (
                <li key={item.id}>
                  <p>Cart ID: {item.cart.id}</p>
                  <p>Product ID: {item.product.id}</p>
                  <p>Product Name: {item.product.productName}</p>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price per Unit: ${item.product.price.toFixed(2)}</p>
                  <p>Total Price: ${calculateTotalPrice(item.quantity, item.product.price).toFixed(2)}</p>
                  <hr />
                </li>
              ))}
              <li>
                <strong>Total Amount: ${totalAmount.toFixed(2)}</strong>
              </li>
            </ul>
          ) : (
            <p>Your cart is empty.</p>
          )}
        </div>
      )}

      <button
        onClick={handleCheckout}
        style={buttonStyle}
        onMouseOver={e => e.target.style = buttonHoverStyle}
        onMouseOut={e => e.target.style = buttonStyle}
        onMouseDown={e => e.target.style = buttonActiveStyle}
        onMouseUp={e => e.target.style = buttonHoverStyle}
      >
        Checkout
      </button>
    </div>
  );
};

export default UserCart;
