import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/ComplaintForm.css';

 // eslint-disable-next-line 
 
const ComplaintForm = () => {
    const [formData, setFormData] = useState({
        customerName: '',
        contactNumber: '',
        product: '',  // track the selected product by its ID or code
        complaintType: '1',
        complaintDetails: ''
    });

    const [message, setMessage] = useState('');
    const [complaintNumber, setComplaintNumber] = useState('');
    const [expectedSolutionDate, setExpectedSolutionDate] = useState('');
    const [products, setProducts] = useState([]);  // State to store product list
    const [askEmail, setAskEmail] = useState(false);
    const [sendEmail, setSendEmail] = useState(null); // null = not asked yet
    const [email, setEmail] = useState('');



    useEffect(() => {
        // Fetch product data from the backend
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://crm-system-8gxs.onrender.com/api/products');
                setProducts(response.data);  // Update state with the product data
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();  // Call the fetch function when component mounts
    }, []);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const { customerName, contactNumber, product, complaintType, complaintDetails } = formData;
    
        if (!customerName || !contactNumber || !complaintDetails) {
            setMessage('All fields are required.');
            return;
        }
    
        try {
            const response = await axios.post('https://crm-system-8gxs.onrender.com/api/complaints_form', formData);
    
            if (response.data.success) {
                setComplaintNumber(response.data.complaintNumber);
                
                // Calculate the expected solution date (2 weeks after the complaint date)
                const currentDate = new Date();
                const solutionDate = new Date(currentDate.setDate(currentDate.getDate() + 14));
                setExpectedSolutionDate(solutionDate.toLocaleDateString());
                
                setMessage(`✅Complaint registered successfully!`);
                setSendEmail(true); // show the yes/no question after complaint is submitted

            }
        } catch (error) {
            setMessage('Error registering complaint.');
            console.error('Error registering complaint:', error);
        }
    };

    const handleClear = () => {
        setFormData({
            customerName: '',
            contactNumber: '',
            product: '',
            complaintType: '1',
            complaintDetails: ''
        });
        setMessage('');
        setComplaintNumber('');
        setExpectedSolutionDate('');
    };

    const handleBack = () => {
        window.location.href = '/';
    };

    const handleSendEmailChoice = async (choice) => {
    setSendEmail(false);
    if (choice === 'yes') {
        setAskEmail(true); // show email input
    } else {
        setAskEmail(false); // skip email
    }
};

const handleEmailSubmit = async () => {
    // Simple email regex check — straight outta StackOverflow University
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        setMessage("❌ Please enter a valid email address.");
        return;
    }

    try {
        await axios.post('https://crm-system-8gxs.onrender.com/api/emailComplaint', {
            email,
            complaintNumber
        });
        setMessage(prev => prev + " 📩 Email sent successfully!");
        setAskEmail(false);
        setEmail('');
    } catch (error) {
        setMessage("Complaint registered, but email failed to send. 😓");
        console.error("Email error:", error);
    }
};


    return (
        <div className="container">
            <h1 style={{ backgroundColor: 'green', color: 'white', padding: '10px', borderRadius: '5px' }}>Register Complaint</h1>
            <form onSubmit={handleSubmit}>
                <label>Customer Name:</label>
                <input type="text" name="customerName" value={formData.customerName} onChange={handleChange} required />
                
                <label>Contact Phone:</label>
                <input type="text" name="contactNumber" value={formData.contactNumber} onChange={handleChange} required pattern="\d{10}" />
                
                <label>Product:</label>
                <select name="product" value={formData.product} onChange={handleChange} required>
    <option value="">Select a product</option>
    {products.map((product) => (
        <option key={product._id} value={product.Product_code}>
            {product.Product_Name} {/* Display the product name */}
        </option>
    ))}
</select>
                
                <label>Complaint Type:</label>
                <select name="complaintType" value={formData.complaintType} onChange={handleChange}>
                    <option value="1">Equipment malfunction</option>
                    <option value="2">Price charged is too high</option>
                    <option value="3">Service not rendered in time</option>
                    <option value="4">Service center not responsive</option>
                    <option value="5">Others</option>
                </select>
                
                <label>Complaint Description:</label>
                <textarea name="complaintDetails" value={formData.complaintDetails} onChange={handleChange} required />
                
                <div className="buttons">
                    <button type="submit">Submit</button>
                    <button type="button" onClick={handleClear}>Clear</button>
                    <button type="button" onClick={handleBack}>Back</button>
                </div>
            </form>
            
            {message && <div className="message">{message}</div>}
            {complaintNumber && (
                <div className="complaint-number">
                    <p>Complaint Number: {complaintNumber}</p>
                    <p>Expected Solution Date: {expectedSolutionDate}</p>
                </div>
            )}
            {sendEmail && (
    <div className="email-question">
        <p>Would you like to receive your complaint number via email?</p>
        <button onClick={() => handleSendEmailChoice('yes')}>Yes</button>
        <button onClick={() => handleSendEmailChoice('no')}>No</button>
    </div>
)}

{askEmail && (
    <div className="email-form">
        <label>Email:</label>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
        />
        <button onClick={handleEmailSubmit}>Send Email</button>
    </div>
)}




        </div>
    );
};

export default ComplaintForm;
