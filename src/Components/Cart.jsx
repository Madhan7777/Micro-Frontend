import React, { useEffect, useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8090/Cart'; 

const Cart = () => {
  const [carts, setCarts] = useState([]);
  const [newCart, setNewCart] = useState({
    user: { name: '' },
    ordertracking: { status: '' },
    adminProduct: { name: '' },
    totalPrice: 0,
    quantity: 0
  });
  const [message, setMessage] = useState('');

  // Fetch all cart items
  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await axios.get(`${API_URL}/findAllCart`);
        setCarts(response.data);
      } catch (error) {
        setMessage('Error fetching carts');
      }
    };
    fetchCarts();
  }, []);

 
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewCart(prevCart => ({
      ...prevCart,
      [name]: value
    }));
  };

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/addCart`, newCart);
      setMessage(response.data);
     
      const updatedCarts = await axios.get(`${API_URL}/findAllCart`);
      setCarts(updatedCarts.data);
    } catch (error) {
      setMessage('Error adding cart');
    }
  };

  
  const handleDelete = async (cartId) => {
    try {
      const response = await axios.delete(`${API_URL}/deleteCart/${cartId}`);
      setMessage(response.data);
      
      const updatedCarts = await axios.get(`${API_URL}/findAllCart`);
      setCarts(updatedCarts.data);
    } catch (error) {
      setMessage('Error deleting cart');
    }
  };

  return (
    <div>
      <h1>Shopping Cart</h1>

      <h2>Add New Cart Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User Name:</label>
          <input
            type="text"
            name="user.name"
            value={newCart.user.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Order Tracking Status:</label>
          <input
            type="text"
            name="ordertracking.status"
            value={newCart.ordertracking.status}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Product Name:</label>
          <input
            type="text"
            name="adminProduct.name"
            value={newCart.adminProduct.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Total Price:</label>
          <input
            type="number"
            name="totalPrice"
            value={newCart.totalPrice}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={newCart.quantity}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Add Cart Item</button>
      </form>

      {message && <p>{message}</p>}

      <h2>Cart Items</h2>
      <ul>
        {carts.map(cart => (
          <li key={cart.CartId}>
            <span>{cart.adminProduct ? cart.adminProduct.name : 'Unknown Product'}</span>
            <span> - ${cart.totalPrice}</span>
            <span> - Quantity: {cart.quantity}</span>
            <button onClick={() => handleDelete(cart.CartId)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Cart;
