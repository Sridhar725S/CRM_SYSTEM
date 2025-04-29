import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Outlets = () => {
  const [outlets, setOutlets] = useState([]);
  const [formData, setFormData] = useState({
    Outlet_number: '',
    Address1: '',
    Address2: '',
    City: '',
    Contact_Number: '',
    Outlet_type: 'Sales'
  });

  useEffect(() => {
    fetchOutlets();
  }, []);

  const fetchOutlets = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/admin_outlets');
      setOutlets(res.data);
    } catch (error) {
      console.error("Error fetching outlets:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addOutlet = async () => {
    try {
      await axios.post('http://localhost:5000/api/admin_outlets', formData);
      fetchOutlets();
      setFormData({
        Outlet_number: '',
        Address1: '',
        Address2: '',
        City: '',
        Contact_Number: '',
        Outlet_type: 'Sales'
      });
    } catch (error) {
      console.error("Error adding outlet:", error);
    }
  };

  const updateOutlet = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/admin_outlets/${id}`, formData);
      fetchOutlets();
    } catch (error) {
      console.error("Error updating outlet:", error);
    }
  };

  const deleteOutlet = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/admin_outlets/${id}`);
      fetchOutlets();
    } catch (error) {
      console.error("Error deleting outlet:", error);
    }
  };

  return (
    <div>
      <h2>🏬 Outlets Management</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Outlet Number" name="Outlet_number" value={formData.Outlet_number} onChange={handleChange} />
        <input placeholder="Address 1" name="Address1" value={formData.Address1} onChange={handleChange} />
        <input placeholder="Address 2" name="Address2" value={formData.Address2} onChange={handleChange} />
        <input placeholder="City" name="City" value={formData.City} onChange={handleChange} />
        <input placeholder="Contact Number" name="Contact_Number" value={formData.Contact_Number} onChange={handleChange} />
        <select name="Outlet_type" value={formData.Outlet_type} onChange={handleChange}>
          <option value="Sales">Sales</option>
          <option value="Service">Service</option>
        </select>
        <button onClick={addOutlet}>Add Outlet</button>
      </div>

      <ul>
        {outlets.map(outlet => (
          <li key={outlet._id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <p><strong>Outlet No:</strong> {outlet.Outlet_number}</p>
            <p><strong>Address 1:</strong> {outlet.Address1}</p>
            <p><strong>Address 2:</strong> {outlet.Address2}</p>
            <p><strong>City:</strong> {outlet.City}</p>
            <p><strong>Contact:</strong> {outlet.Contact_Number}</p>
            <p><strong>Type:</strong> {outlet.Outlet_type}</p>

            <button onClick={() => updateOutlet(outlet._id)}>Update</button>
            <button style={{ marginLeft: '10px' }} onClick={() => deleteOutlet(outlet._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Outlets;
