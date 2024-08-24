import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Alert } from 'react-bootstrap';

const AdminApproval = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRequests();
  }, []);

  const fetchRequests = async () => {
    try {
      const response = await axios.get('http://localhost:8090/userCart/pendingRequests');
      setRequests(response.data);
    } catch (err) {
      setError('Failed to fetch requests');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (requestId) => {
    try {
      await axios.post(`http://localhost:8090/userCart/approveRequest/${requestId}`);
      alert('Request approved');
      fetchRequests(); // Refresh the list
    } catch (err) {
      setError('Failed to approve request');
    }
  };

  const handleReject = async (requestId) => {
    try {
      await axios.post(`http://localhost:8090/userCart/rejectRequest/${requestId}`);
      alert('Request rejected');
      fetchRequests(); // Refresh the list
    } catch (err) {
      setError('Failed to reject request');
    }
  };

  return (
    <div className="admin-view-requests p-4">
      <h1>Pending Requests</h1>
      {loading && <p>Loading...</p>}
      {error && <Alert variant="danger">{error}</Alert>}
      {!loading && !error && (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Total Amount</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request.requestId}>
                <td>{request.requestId}</td>
                <td>${request.totalAmount.toFixed(2)}</td>
                <td>{request.status}</td>
                <td>
                  <Button variant="success" onClick={() => handleApprove(request.requestId)}>Approve</Button>
                  <Button variant="danger" onClick={() => handleReject(request.requestId)} className="ml-2">Reject</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default AdminApproval;
