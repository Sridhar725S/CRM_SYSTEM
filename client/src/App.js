import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ComplaintStatus from './components/ComplaintStatus';
import QueryProductFeatures from './components/QueryProductFeatures';
import QueryCompanyOutlets from './components/QueryCompanyOutlets';
import PricingDetails from './components/PricingDetails';
import ComplaintForm from './components/ComplaintForm';
import Complaints from './Complaints';
import LoginPage from './LoginPage';
import Outlets from './Outlets';
import Products from './Products';
import Dashboard from './Dashboard';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/features" element={<QueryProductFeatures />} />
        <Route path="/outlets" element={<QueryCompanyOutlets />} />
        <Route path="/price" element={<PricingDetails />} />
        <Route path="/complaints_form" element={<ComplaintForm />} />
        <Route path="/complaints_status" element={<ComplaintStatus />} />
        <Route path="/admin_products" element={<Products/>} />
        <Route path="/admin_outlets" element={<Outlets />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/admin_complaints" element={<Complaints />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
