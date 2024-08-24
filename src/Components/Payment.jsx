import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Payment.css';

const Payment = () => {
  const [payments, setPayments] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [newPayment, setNewPayment] = useState({
    order: '',
    amount: '',
    paymentMethod: '',
    paymentStatus: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const response = await axios.get('http://localhost:8090/payments');
        setPayments(response.data);
      } catch (err) {
        setError(err.message || 'Error fetching payments');
      } finally {
        setLoading(false);
      }
    };

    fetchPayments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewPayment({ ...newPayment, [name]: value });
  };

  const handleCreate = async () => {
    try {
      const response = await axios.post('http://localhost:8090/payments', newPayment);
      setPayments([...payments, response.data]);
      setNewPayment({ order: '', amount: '', paymentMethod: '', paymentStatus: '' });
    } catch (err) {
      setError(err.message || 'Error creating payment');
    }
  };

  const handleSelect = (payment) => {
    setSelectedPayment(payment);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8090/payments/${selectedPayment.id}`, selectedPayment);
      setPayments(payments.map(p => (p.id === selectedPayment.id ? selectedPayment : p)));
      setSelectedPayment(null);
    } catch (err) {
      setError(err.message || 'Error updating payment');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8090/payments/${id}`);
      setPayments(payments.filter(p => p.id !== id));
    } catch (err) {
      setError(err.message || 'Error deleting payment');
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <div className="payment-container">
      <h2>Payments</h2>
      <div className="payment-form">
        <h3>Add New Payment</h3>
        <input
          type="text"
          name="order"
          placeholder="Order ID"
          value={newPayment.order}
          onChange={handleInputChange}
        />
        <input
          type="number"
          step="0.01"
          name="amount"
          placeholder="Amount"
          value={newPayment.amount}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="paymentMethod"
          placeholder="Payment Method"
          value={newPayment.paymentMethod}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="paymentStatus"
          placeholder="Payment Status"
          value={newPayment.paymentStatus}
          onChange={handleInputChange}
        />
        <button onClick={handleCreate}>Add Payment</button>
      </div>

      <div>
        {selectedPayment && (
          <div className="payment-form">
            <h3>Edit Payment</h3>
            <input
              type="text"
              name="order"
              value={selectedPayment.order}
              onChange={e => setSelectedPayment({ ...selectedPayment, order: e.target.value })}
            />
            <input
              type="number"
              step="0.01"
              name="amount"
              value={selectedPayment.amount}
              onChange={e => setSelectedPayment({ ...selectedPayment, amount: e.target.value })}
            />
            <input
              type="text"
              name="paymentMethod"
              value={selectedPayment.paymentMethod}
              onChange={e => setSelectedPayment({ ...selectedPayment, paymentMethod: e.target.value })}
            />
            <input
              type="text"
              name="paymentStatus"
              value={selectedPayment.paymentStatus}
              onChange={e => setSelectedPayment({ ...selectedPayment, paymentStatus: e.target.value })}
            />
            <button onClick={handleUpdate}>Save Changes</button>
            <button onClick={() => setSelectedPayment(null)}>Cancel</button>
          </div>
        )}
      </div>

      <ul>
        {payments.map(payment => (
          <li key={payment.id}>
            <p>Order ID: {payment.order.id}</p>
            <p>Amount: ${payment.amount.toFixed(2)}</p>
            <p>Payment Method: {payment.paymentMethod}</p>
            <p>Payment Status: {payment.paymentStatus}</p>
            <button onClick={() => handleSelect(payment)}>Edit</button>
            <button onClick={() => handleDelete(payment.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Payment;
