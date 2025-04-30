import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Packages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPackages();
  }, []);

  const fetchPackages = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/packages');
      setPackages(response.data.data || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAddPackage = () => {
    navigate('/packages/new');
  };

  const handleRequests = () => {
    navigate('/requests');
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this package?');
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:3000/api/packages/${id}`);
      setPackages(packages.filter(pkg => pkg._id !== id));
      alert('Package deleted successfully.');
    } catch (err) {
      alert('Failed to delete package: ' + err.message);
    }
  };

  if (loading) return <div>Loading packages...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>Packages</h1>
        <div>
          <button onClick={handleAddPackage} style={{ marginRight: '10px' }}>Add Package</button>
          <button onClick={handleRequests}>Requests</button>
        </div>
      </div>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {packages.map((pkg) => (
          <div key={pkg._id} style={{
            border: '1px solid #ccc',
            borderRadius: '10px',
            padding: '20px',
            width: '300px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            backgroundColor: '#f9f9f9'
          }}>
            <h2>{pkg.name}</h2>
            <p><strong>Duration:</strong> {pkg.durationMonths} months</p>
            <p><strong>Max Events:</strong> {pkg.maxEvents}</p>
            <p><strong>Max Employees:</strong> {pkg.maxEmployees}</p>
            <p><strong>Price:</strong> ₹{pkg.price}</p>
            <button onClick={() => handleDelete(pkg._id)} style={{
              backgroundColor: 'red',
              color: 'white',
              border: 'none',
              padding: '8px 12px',
              borderRadius: '5px',
              cursor: 'pointer'
            }}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
