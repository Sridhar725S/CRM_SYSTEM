import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ComplaintStatus from './components/ComplaintStatus';
import QueryProductFeatures from './components/QueryProductFeatures';
import QueryCompanyOutlets from './components/QueryCompanyOutlets';
import PricingDetails from './components/PricingDetails';
import ComplaintForm from './components/ComplaintForm';
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
      </Routes>
    </Router>
  );
}

export default App;
