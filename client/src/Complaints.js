import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [statusUpdates, setStatusUpdates] = useState({}); // Storing individual complaint status

  useEffect(() => {
    fetchComplaints();
  }, []);

  const fetchComplaints = async () => {
    try {
      const res = await axios.get('https://crm-system-8gxs.onrender.com/api/admin_complaints');
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prev) => ({
      ...prev,
      [id]: newStatus,
    }));
  };

  const updateStatus = async (id) => {
    if (!statusUpdates[id]) return;
    try {
      await axios.put(`https://crm-system-8gxs.onrender.com/api/admin_complaints/${id}/status`, {
        Complaint_status: statusUpdates[id],
      });
      fetchComplaints();
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  return (
    <div>
      <h2>🛠️ Complaints Management</h2>
      <ul>
        {complaints.map(complaint => (
          <li key={complaint._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '8px' }}>
            <p><strong>Complaint No:</strong> {complaint.Complaint_Number}</p>
            <p><strong>Customer:</strong> {complaint.Customer_Name}</p>
            <p><strong>Contact:</strong> {complaint.Contact_Number}</p>
            <p><strong>Product Code:</strong> {complaint.Product_code}</p>
            <p><strong>Details:</strong> {complaint.Complaint_details}</p>
            <p><strong>Complaint Type:</strong> {complaint.Complaint_type}</p>
            <p><strong>Complaint Date:</strong> {new Date(complaint.Complaint_date).toLocaleDateString()}</p>
            <p><strong>Status:</strong> {complaint.Complaint_status}</p>

            <select
              value={statusUpdates[complaint._id] || ''}
              onChange={(e) => handleStatusChange(complaint._id, e.target.value)}
            >
              <option value="">Select Status</option>
              <option value="Registered">Registered</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
              <option value="Closed">Closed</option>
            </select>

            <button onClick={() => updateStatus(complaint._id)}>
              Update Status
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Complaints;
