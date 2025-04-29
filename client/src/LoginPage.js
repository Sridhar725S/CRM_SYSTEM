import React, { useState } from 'react';
import axios from 'axios';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle login
  const login = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://crm-system-8gxs.onrender.com/login', { email, password }, { withCredentials: true });
      alert(res.data.message);
      window.location.href = '/dashboard';  // Redirect to dashboard after successful login
    } catch (err) {
      alert(err.response.data.message || 'Login failed');
    }
  };

  // Verify Session (to check if logged in)
  const verify = async () => {
    try {
      const res = await axios.get('https://crm-system-8gxs.onrender.com/verify', { withCredentials: true });
      alert(res.data.message);
    } catch (err) {
      alert('Not authenticated');
    }
  };

  // Handle logout
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
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px' }}>
      <h2>Admin Login</h2>
      <form onSubmit={login} style={{ display: 'flex', flexDirection: 'column', width: '300px' }}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ padding: '10px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ padding: '10px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px' }}>Login</button>
      </form>

      <div style={{ marginTop: '20px' }}>
        <button onClick={verify} style={{ marginRight: '10px', padding: '10px' }}>Verify Session</button>
        <button onClick={logout} style={{ padding: '10px' }}>Logout</button>
      </div>
    </div>
  );
}

export default LoginPage;
