

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


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

const CartItem = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0); 
  const navigate = useNavigate();
  const userId = 1; 

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/cart-items?userId=${userId}`);
        setCartItems(response.data || []);
        calculateTotalAmount(response.data || []);
      } catch (err) {
        setError(`Error fetching cart items: ${err.response?.data?.message || err.message}`);
      }
    };

    fetchCartItems();
  }, [userId]);

  const calculateTotalPrice = (quantity, price) => {
    return quantity * price;
  };

  const calculateTotalAmount = (items) => {
    let amount = 0;
    items.forEach(item => {
      amount += calculateTotalPrice(item.quantity, item.product.price);
    });
    setTotalAmount(amount);
  };

  const handleSendRequest = async () => {
    try {
      
      const cartId = 1; 
      await axios.post(`http://localhost:8090/userCart/sendRequest/${cartId}`, { totalAmount });
      navigate('/requestConfirmation'); 
    } catch (err) {
      setError(`Failed to send request: ${err.response?.data?.message || err.message}`);
    }
  };

  const handleBuyNow = async () => {
    try {
      
      const cartId = 1; 
      await axios.post(`http://localhost:8090/userCart/buyNow/${cartId}`, { totalAmount });
      navigate('/orderSuccess'); 
    } catch (err) {
      setError(`Failed to complete purchase: ${err.response?.data?.message || err.message}`);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={headingStyle}>Cart Items</h2>

      <div style={listStyle}>
        {error && <p style={{ color: '#dc3545', textAlign: 'center' }}>{error}</p>}

        {cartItems.length > 0 ? (
          <>
            <div style={{ marginBottom: '20px' }}>
              <p style={{ fontSize: '1.2rem' }}>Total Amount: ${totalAmount.toFixed(2)}</p>
            </div>
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
            </ul>
          </>
        ) : (
          <p>Your cart is empty.</p>
        )}
      </div>

      <button
        onClick={handleSendRequest}
        style={buttonStyle}
        onMouseOver={e => e.target.style = buttonHoverStyle}
        onMouseOut={e => e.target.style = buttonStyle}
        onMouseDown={e => e.target.style = buttonActiveStyle}
        onMouseUp={e => e.target.style = buttonHoverStyle}
      >
        Send Request
      </button>
      <button
        onClick={handleBuyNow}
        style={buttonStyle}
        onMouseOver={e => e.target.style = buttonHoverStyle}
        onMouseOut={e => e.target.style = buttonStyle}
        onMouseDown={e => e.target.style = buttonActiveStyle}
        onMouseUp={e => e.target.style = buttonHoverStyle}
      >
        Buy Now
      </button>
    </div>
  );
};

export default CartItem;
