import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

function Editordertracking() {
  const { id } = useParams();  // Get the order tracking ID from the URL parameters
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`http://localhost:8090/order-tracking/${id}`)
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Error fetching order tracking details');
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post('http://localhost:8090/order-tracking', data)
      .then(() => {
        alert('Order tracking updated successfully');
        navigate('/view-order-trackings');
      })
      .catch((err) => {
        console.error('Error updating order tracking:', err);
        alert('Failed to update order tracking');
      });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1>Edit Order Tracking</h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="orderId" className="form-label">Order ID:</label>
                  <input
                    type="text"
                    id="orderId"
                    name="orderId"
                    className="form-control"
                    value={data.orderId || ''}
                    onChange={handleChange}
                    disabled
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="status" className="form-label">Status:</label>
                  <input
                    type="text"
                    id="status"
                    name="status"
                    className="form-control"
                    value={data.status || ''}
                    onChange={handleChange}
                  />
                </div>
                <button type="submit" className="btn btn-primary">Update</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Editordertracking;
