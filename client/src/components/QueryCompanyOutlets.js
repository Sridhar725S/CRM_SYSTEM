import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QueryCompanyOutlets = () => {
    const [cities, setCities] = useState([]);
    const [outletType, setOutletType] = useState('');
    const [city, setCity] = useState('');
    const [outlets, setOutlets] = useState([]);

    useEffect(() => {
        // Fetch cities on component mount
        axios.get('http://localhost:5000/api/outlets/cities')
            .then(response => setCities(response.data))
            .catch(error => console.error('Error fetching cities:', error));
    }, []);

    const handleQuery = (e) => {
        e.preventDefault();

        axios.post('http://localhost:5000/api/outlets/query', { city, outlet_type: outletType })
            .then(response => setOutlets(response.data))
            .catch(error => console.error('Error querying outlets:', error));
    };

    return (
        <div>
            <style>
                {`
                body {
                    font-family: Arial, sans-serif;
                    margin: 0;
                    padding: 0;
                    background-color: #f5f5f5;
                    background-image: url(a.jpg);
                    background-position: center;
                    background-repeat: no-repeat;
                    background-size: cover; 
                    min-height: 100vh;
                }
                
                header {
                    background-color: #4CAF50;
                    color: white;
                    text-align: center;
                    padding: 20px 0;
                    margin: 0;
                }

                header h1 {
                    margin: 0;
                    font-size: 2.5em;
                    color:white;
                }

                .container {
                    max-width: 600px;
                    padding: 20px;
                    background-color: #fff;
                    border-radius: 10px;
                    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                    margin: 20px auto;
                }
                
                .form-group {
                    margin-bottom: 20px;
                }

                label {
                    font-weight: bold;
                    text-align:left;
                }

               .radio-group {
        display: flex;
        gap: 20px; /* Space between each radio button group */
        margin-top: 10px;
        align-items: center; /* Aligns the labels with the radio buttons */
    }

    .radio-group label {
        display: flex;
        align-items: center; /* Ensures the label aligns with the radio button */
        gap: 8px; /* Space between the radio button and its label */
        font-size: 16px;
        cursor: pointer; /* Makes the label clickable */
    }

    input[type="radio"] {
        accent-color: #4CAF50; /* Changes the radio button's primary color */
        transform: scale(1.2); /* Enlarges the radio button slightly for better visibility */
    }

                table {
                    width: 100%;
                    border-collapse: collapse;
                    border-radius: 10px;
                    overflow: hidden;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    margin-bottom: 20px;
                }
                
                th, td {
                    padding: 15px;
                    border-bottom: 1px solid #ddd;
                    text-align: left;
                }
                
                th {
                    background-color: #4CAF50;
                    color: white;
                    font-weight: bold;
                    text-transform: uppercase;
                }
                
                .button {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 15px 30px;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 6px;
                    transition: background-color 0.3s;
                    display: block;
                    margin: 20px auto;
                    width: 65%;
                }
                
                .button:hover {
                    background-color: #45a049;
                }
                
                .back-button {
                    display: inline-block;
                    padding: 15px 30px;
                    background-color: #333;
                    color: white;
                    text-decoration: none;
                    border-radius: 6px;
                    transition: background-color 0.3s;
                    display: block;
                    margin: 0 auto;
                    width: 50%;
                    text-align: center;
                }
                
                .back-button:hover {
                    background-color: #555;
                }
                `}
            </style>
            <header>
                <h1>Query Company Outlets</h1>
            </header>
            <div className="container">
                <form onSubmit={handleQuery}>
                    <div className="form-group">
                        <label htmlFor="city">City:</label>
                        <select id="city" name="city" onChange={(e) => setCity(e.target.value)} required>
                            <option value="">Select City</option>
                            {cities.map((city, index) => (
                                <option key={index} value={city}>{city}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group">
                        <label>Outlet Type:</label>
                        <div className="radio-group">
                            <label>
                                <input type="radio" name="outlet_type" value="Sales" onChange={() => setOutletType('Sales')} required />
                                Sales
                            </label>
                            <label>
                                <input type="radio" name="outlet_type" value="Service" onChange={() => setOutletType('Service')} required />
                                Service
                            </label>
                        </div>
                    </div>
                    <button type="submit" className="button">Submit</button>
                </form>

                {outlets.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Outlet Number</th>
                                <th>Address1</th>
                                <th>Address2</th>
                                <th>City</th>
                                <th>Contact Number</th>
                            </tr>
                        </thead>
                        <tbody>
                            {outlets.map((outlet, index) => (
                                <tr key={index}>
                                    <td>{outlet.Outlet_number}</td>
                                    <td>{outlet.Address1}</td>
                                    <td>{outlet.Address2}</td>
                                    <td>{outlet.City}</td>
                                    <td>{outlet.Contact_Number}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}

                <a href="/" className="back-button">Back</a>
            </div>
        </div>
    );
};

export default QueryCompanyOutlets;
