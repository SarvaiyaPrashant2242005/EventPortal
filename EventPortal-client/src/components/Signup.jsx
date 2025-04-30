import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CompanySignup = () => {
  const [formData, setFormData] = useState({
    companyName: '',
    companyEmail: '',
    phone: '',
    street: '',
    city: '',
    state: '',
    zipCode: '',
    country: '',
    packageId: '',
    name: '',
    email: '',
    password: ''
  });

  const [packages, setPackages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingPackages, setIsLoadingPackages] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/packages');
        
        if (Array.isArray(response.data)) {
          setPackages(response.data);
        } else if (Array.isArray(response.data?.data)) {
          setPackages(response.data.data);
        } else {
          throw new Error('Invalid packages data format');
        }
      } catch (err) {
        setError(`Failed to load packages: ${err.message}`);
        console.error('Package fetch error:', err);
      } finally {
        setIsLoadingPackages(false);
      }
    };

    fetchPackages();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      const companyData = {
        name: formData.companyName,
        email: formData.companyEmail,
        phone: formData.phone,
        address: {
          street: formData.street,
          city: formData.city,
          state: formData.state,
          zipCode: formData.zipCode,
          country: formData.country
        },
        packageId: formData.packageId,
        admins: [{
          name: formData.name,
          email: formData.email,
          password: formData.password
        }]
      };

      const response = await axios.post('http://localhost:3000/api/companies', companyData);
      
      setSuccess('Company registered successfully!');
      console.log('Registration response:', response.data);
      
      setFormData({
        companyName: '',
        companyEmail: '',
        phone: '',
        street: '',
        city: '',
        state: '',
        zipCode: '',
        country: '',
        packageId: '',
        name: '',
        email: '',
        password: ''
      });
    } catch (err) {
      const errorMessage = err.response?.data?.message || 
                         err.message || 
                         'Registration failed. Please try again.';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      <h1 style={{ textAlign: 'center' }}>Company Registration</h1>
      
      {error && (
        <div style={{ 
          color: 'white', 
          backgroundColor: '#ff4444', 
          padding: '10px', 
          margin: '10px 0',
          borderRadius: '4px'
        }}>
          {error}
        </div>
      )}
      
      {success && (
        <div style={{ 
          color: 'white', 
          backgroundColor: '#00C851', 
          padding: '10px', 
          margin: '10px 0',
          borderRadius: '4px'
        }}>
          {success}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <h2>Company Information</h2>
        
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Company Name:</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Company Email:</label>
          <input
            type="email"
            name="companyEmail"
            value={formData.companyEmail}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Phone:</label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <h3>Address</h3>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Street:</label>
          <input
            type="text"
            name="street"
            value={formData.street}
            onChange={handleChange}
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>City:</label>
            <input
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>State:</label>
            <input
              type="text"
              name="state"
              value={formData.state}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '15px', marginBottom: '15px' }}>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Zip Code:</label>
            <input
              type="text"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', marginBottom: '5px' }}>Country:</label>
            <input
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
              style={{ width: '100%', padding: '8px' }}
            />
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Select Package:</label>
          {isLoadingPackages ? (
            <p>Loading packages...</p>
          ) : packages.length > 0 ? (
            <select
              name="packageId"
              value={formData.packageId}
              onChange={handleChange}
              required
              style={{ width: '100%', padding: '8px' }}
            >
              <option value="">Select a package</option>
              {packages.map(pkg => (
                <option key={pkg._id} value={pkg._id}>
                  {pkg.name} - ${pkg.price} ({pkg.durationMonths} months, {pkg.maxEvents} events, {pkg.maxEmployees} employees)
                </option>
              ))}
            </select>
          ) : (
            <p>No packages available for registration</p>
          )}
        </div>

        <h2>Admin Account</h2>
        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Admin Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Admin Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', marginBottom: '5px' }}>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <button
          type="submit"
          disabled={isLoading || isLoadingPackages || packages.length === 0}
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: isLoading ? '#cccccc' : '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          {isLoading ? 'Processing...' : 'Register Company'}
        </button>
      </form>
    </div>
  );
};

export default CompanySignup;