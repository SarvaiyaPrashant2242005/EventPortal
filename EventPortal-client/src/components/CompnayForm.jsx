import React, { useState } from 'react';
import axios from 'axios';

const CompanyForm = () => {
  const [formData, setFormData] = useState({
    cmp_name: '',
    cmp_email: '',
    owner_name: '',
    owner_email: '',
    owner_password: '',
    district: '',
    state: '',
    packageId: '', // You can populate this with a dropdown or dynamic fetch later
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/companies', formData);
      alert('Company registered successfully!');
      console.log(res.data);
    } catch (err) {
      console.error(err);
      alert('Error registering company');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="cmp_name">Company Name</label>
      <input type="text" id="cmp_name" name="cmp_name" placeholder="Company Name" value={formData.cmp_name} onChange={handleChange} />
      <br /><br />

      <label htmlFor="cmp_email">Company Email</label>
      <input type="email" id="cmp_email" name="cmp_email" placeholder="Company Email" value={formData.cmp_email} onChange={handleChange} />
      <br /><br />

      <label htmlFor="owner_name">Company Owner Name</label>
      <input type="text" id="owner_name" name="owner_name" placeholder="Owner Name" value={formData.owner_name} onChange={handleChange} />
      <br /><br />

      <label htmlFor="owner_email">Company Owner Email</label>
      <input type="email" id="owner_email" name="owner_email" placeholder="Owner Email" value={formData.owner_email} onChange={handleChange} />
      <br /><br />

      <label htmlFor="owner_password">Company Owner Password</label>
      <input type="password" id="owner_password" name="owner_password" placeholder="Owner Password" value={formData.owner_password} onChange={handleChange} />
      <br /><br />

      <label htmlFor="district">Company District</label>
      <input type="text" id="district" name="district" placeholder="District" value={formData.district} onChange={handleChange} />
      <br /><br />

      <label htmlFor="state">Company State</label>
      <input type="text" id="state" name="state" placeholder="State" value={formData.state} onChange={handleChange} />
      <br /><br />

      <label htmlFor="packageId">Package ID</label>
      <input type="text" id="packageId" name="packageId" placeholder="Package ID" value={formData.packageId} onChange={handleChange} />
      <br /><br />

      <button type="submit">Submit</button>
    </form>
  );
};

export default CompanyForm;
