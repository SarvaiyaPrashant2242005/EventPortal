import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PackageForm = () => {
  const navigate = useNavigate();
  const [packageData, setPackageData] = useState({
    name: '',
    durationMonths: '',
    maxEvents: '',
    maxEmployees: '',
    price: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPackageData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      const dataToSend = {
        ...packageData,
        durationMonths: Number(packageData.durationMonths),
        maxEvents: Number(packageData.maxEvents),
        maxEmployees: Number(packageData.maxEmployees),
        price: Number(packageData.price)
      };

      const response = await axios.post('http://localhost:3000/api/packages', dataToSend);
      if (response.data.success) {
        navigate('/packages');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create package');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <h2>Create New Package</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Package Name </label>
          <input
            type="text"
            name="name"
            value={packageData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Duration (months) </label>
          <input
            type="number"
            name="durationMonths"
            value={packageData.durationMonths}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Maximum Events </label>
          <input
            type="number"
            name="maxEvents"
            value={packageData.maxEvents}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Maximum Employees </label>
          <input
            type="number"
            name="maxEmployees"
            value={packageData.maxEmployees}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Price ($) </label>
          <input
            type="number"
            name="price"
            value={packageData.price}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <button type="button" onClick={() => navigate('/packages')}>
            Cancel
          </button>
          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Creating...' : 'Create Package'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PackageForm;
