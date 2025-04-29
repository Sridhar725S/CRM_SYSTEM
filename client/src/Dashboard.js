import React, { useState } from 'react';
import Products from './Products';
import Outlets from './Outlets';
import Complaints from './Complaints';
import axios from 'axios';

const Dashboard = () => {
  const [section, setSection] = useState('products');

  const navStyle = {
    display: 'flex',
    justifyContent: 'center',
    gap: '20px',
    backgroundColor: '#333',
    padding: '10px',
    color: '#fff',
  };

  const navItemStyle = {
    cursor: 'pointer',
  };
  const logout = async () => {
    try {
      await axios.post('https://crm-system-8gxs.onrender.com/logout', {}, { withCredentials: true });
      alert('Logged out');
      window.location.href = '/';  // Redirect to login page after logout
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <div>
      <nav style={navStyle}>
        <div style={navItemStyle} onClick={() => setSection('products')}>Products</div>
        <div style={navItemStyle} onClick={() => setSection('outlets')}>Outlets</div>
        <div style={navItemStyle} onClick={() => setSection('complaints')}>Complaints</div>
      </nav>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <button onClick={logout} style={{
      backgroundColor: 'red',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '5px',
      cursor: 'pointer'
    }}>Logout</button></div>
      <div style={{ padding: '20px' }}>
        {section === 'products' && <Products />}
        {section === 'outlets' && <Outlets />}
        {section === 'complaints' && <Complaints />}
      </div>
    </div>
  );
};

export default Dashboard;
