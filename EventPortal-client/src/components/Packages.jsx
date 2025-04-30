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
 }
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
        <button onClick={handleAddPackage}>Add Package</button>
        <button onClick={handleRequests}>Requests</button>
      </div>

      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Duration (months)</th>
            <th>Max Events</th>
            <th>Max Employees</th>
            <th>Price</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg._id}>
              <td>{pkg.name}</td>
              <td>{pkg.durationMonths}</td>
              <td>{pkg.maxEvents}</td>
              <td>{pkg.maxEmployees}</td>
              <td>{pkg.price}</td>
              <td>
                <button onClick={() => handleDelete(pkg._id)} style={{ backgroundColor: 'red', color: 'white' }}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Packages;
