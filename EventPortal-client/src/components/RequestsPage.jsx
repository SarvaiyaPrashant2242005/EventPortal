import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RequestsPage = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        setError('');
        
        const response = await axios.get('http://localhost:3000/api/companies?status=pending');
        

        if (Array.isArray(response.data?.data)) {
          setRequests(response.data.data);
        } else if (Array.isArray(response.data)) {
          setRequests(response.data);
        } else {
          throw new Error('Invalid data format received from server');
        }
      } catch (err) {
        setError(err.response?.data?.message || err.message || 'Failed to fetch requests');
        setRequests([]); 
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleRequestAction = async (companyId, action) => {
    try {
      await axios.patch(`http://localhost:3000/api/companies/${companyId}/status`, {
        status: action
      });
      
      const response = await axios.get('http://localhost:3000/api/companies?status=pending');
      setRequests(Array.isArray(response.data?.data) ? response.data.data : response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  if (loading) return <div>Loading requests...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <h2>Company Registration Requests</h2>
      {requests.length === 0 ? (
        <p>No pending requests found</p>
      ) : (
        <table style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr style={{ backgroundColor: '#f2f2f2' }}>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Company Name</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Email</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Package</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Registration Date</th>
              <th style={{ padding: '10px', border: '1px solid #ddd' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {requests.map(request => (
              <tr key={request._id} style={{ border: '1px solid #ddd' }}>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.name}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>{request.email}</td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {request.packageId?.name || 'N/A'}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  {new Date(request.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: '10px', border: '1px solid #ddd' }}>
                  <button 
                    onClick={() => handleRequestAction(request._id, 'approved')}
                    style={{ 
                      marginRight: '5px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Approve
                  </button>
                  <button 
                    onClick={() => handleRequestAction(request._id, 'rejected')}
                    style={{ 
                      backgroundColor: '#f44336',
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer'
                    }}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestsPage;