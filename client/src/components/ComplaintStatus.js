import React, { useState } from 'react';
import axios from 'axios';

const ComplaintStatus = () => {
    const [complaintNumber, setComplaintNumber] = useState('');
    const [complaintData, setComplaintData] = useState(null);
    const [error, setError] = useState('');
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        
        try {
            const response = await axios.post('https://crm-system-8gxs.onrender.com/api/complaints_status', { complaintNumber });
            setComplaintData(response.data.complaint);
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data.error || 'Error occurred while fetching data');
            } else {
                setError('Error occurred while fetching data');
            }
        }
    };

    const handleClear = () => {
        setComplaintNumber('');
        setComplaintData(null);
        setError('');
    };
    const handleBack = () => {
        window.location.href = '/';
    };

    return (
        <div className="container">
            <h1 style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>Query Complaint Status</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="complaintNumber">Complaint Number:</label>
                <input 
                    type="text" 
                    id="complaintNumber" 
                    name="complaintNumber" 
                    value={complaintNumber} 
                    onChange={(e) => setComplaintNumber(e.target.value)} 
                    required 
                />
                <button type="submit">Submit</button>
                <button type="button" onClick={handleClear}>Clear</button>
                <button type="button" onClick={handleBack}>Back</button>
            </form>
            <div id="complaintDetails">
                {error && <p className="error-message">{error}</p>}
                {complaintData && (
                    <table className="complaint-table">
                        <tbody>
                            <tr>
                                <th>Complaint Number</th>
                                <td>{complaintData.Complaint_Number}</td>
                            </tr>
                            <tr>
                                <th>Product Name</th>
                                <td>{complaintData.Product_Name}</td>
                            </tr>
                            <tr>
                                <th>Complaint Details</th>
                                <td>{complaintData.Complaint_details}</td>
                            </tr>
                            <tr>
                                <th>Complaint Type</th>
                                <td>{complaintData.Complaint_type}</td>
                            </tr>
                            <tr>
                                <th>Complaint Date</th>
                                <td>{complaintData.Complaint_date}</td>
                            </tr>
                            <tr>
                                <th>Complaint Status</th>
                                <td>{complaintData.Complaint_status}</td>
                            </tr>
                            <tr>
                                <th>Status Date</th>
                                <td>{complaintData.Status_date}</td>
                            </tr>
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
};

export default ComplaintStatus;
