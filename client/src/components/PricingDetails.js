import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PricingDetails = () => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [serviceLocation, setServiceLocation] = useState('client');
    const [batteryRequired, setBatteryRequired] = useState(false);
    const [additionalWarranty, setAdditionalWarranty] = useState(0);
    const [pricingDetails, setPricingDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        axios.get('http://localhost:5000/api/products')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    }, []);

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:5000/api/price', {
                productName: selectedProduct,
                serviceLocation,
                batteryRequired,
                additionalWarranty,
            });
            setPricingDetails(response.data);
            setError('');
        } catch (error) {
            setError('Error calculating price');
            console.error(error);
        }
    };

    const handleClear = () => {
        setSelectedProduct('');
        setServiceLocation('client');
        setBatteryRequired(false);
        setAdditionalWarranty(0);
        setPricingDetails(null);
        setError('');
    };

    const handleBack = () => {
        window.history.back();
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
        padding: 1em;
        width: 100%;
        text-align: center;
        margin: 0;
        font-size: 2.5em;
        color:white;
        
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    }

    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 100%;
        padding: 20px;
    }

    form {
        max-width: 400px;
        width: 100%;
        background-color: #ffffff;
        border-radius: 10px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        padding: 25px;
        margin-bottom: 30px;
    }

    label {
        display: block;
        margin-bottom: 8px;
        font-weight: bold;
        font-size: 14px;
        color: #333;
        text-align:left;
    }

    select, input[type="text"], input[type="number"] {
        width: 100%;
        padding: 10px;
        margin-bottom: 20px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
    }

    button {
        background-color: #4CAF50;
        color: white;
        border: none;
        padding: 12px 20px;
        text-align: center;
        text-decoration: none;
        font-size: 16px;
        cursor: pointer;
        border-radius: 4px;
        transition: all 0.3s ease;
        margin: 5px;
    }
    .pricing-table {
        width: 100%;
        max-width: 600px;
        margin: 20px auto;
        border-collapse: collapse;
        background-color: #ffffff;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        overflow: hidden;
    }

    .pricing-table th, .pricing-table td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    .pricing-table th {
        background-color: #4CAF50;
        color: white;
        font-weight: bold;
        text-align: center;
    }

    .pricing-table tr:hover {
        background-color: #f2f2f2;
    }

    .pricing-table td {
        text-align: center;
        font-size: 14px;
        color: #333;
    }
    button:hover {
        background-color: #45a049;
    }

    button[type="button"] {
        background-color: #f44336;
    }

    button[type="button"]:hover {
        background-color: #d32f2f;
    }

    table {
        width: 100%;
        border-collapse: collapse;
    }

    th, td {
        padding: 12px 15px;
        text-align: left;
        border-bottom: 1px solid #ddd;
    }

    th {
        background-color: #4CAF50;
        color: white;
        text-align: center;
        font-size: 16px;
    }

    tr:hover {
        background-color: #f2f2f2;
    }

    .error-message {
        color: #f44336;
        font-weight: bold;
        margin-top: 20px;
        text-align: center;
    }

    a {
        color: #4CAF50;
        text-decoration: none;
        font-weight: bold;
        transition: color 0.3s;
    }

    a:hover {
        color: #45a049;
    }
`}
</style>

            <header>Product Pricing</header>
            <center><div className="pricing-details-container">
                <form onSubmit={handleSubmit} className="pricing-form">
                    <div className="form-row">
                        <label>Product:</label>
                        <select
                            value={selectedProduct}
                            onChange={(e) => setSelectedProduct(e.target.value)}
                        >
                            <option value="">Select Product</option>
                            {products.map((product) => (
                                <option key={product._id} value={product.Product_Name}>
                                    {product.Product_Name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="form-row">
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }} >Battery Required</label>
                        <input
                            type="checkbox"
                            checked={batteryRequired}
                            onChange={(e) => setBatteryRequired(e.target.checked)}
                        />
                    </div>
                    <div className="form-row">
                        <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '20px' }}>Service Location</label>
                        <div>
                            <input
                                type="radio"
                                name="serviceLocation"
                                value="client"
                                checked={serviceLocation === 'client'}
                                onChange={(e) => setServiceLocation(e.target.value)}
                            />{' '}
                            At Client Place
                            <input
                                type="radio"
                                name="serviceLocation"
                                value="center"
                                checked={serviceLocation === 'center'}
                                onChange={(e) => setServiceLocation(e.target.value)}
                            />{' '}
                            At Service Center
                        </div>
                    </div>
                    <div className="form-row">
                        <label>Additional Warranty (Years):</label>
                        <input
                            type="number"
                            value={additionalWarranty}
                            onChange={(e) => setAdditionalWarranty(Number(e.target.value))}
                            min="0"
                            max="2"
                        />
                    </div>
                    <div className="button-group">
                        <button type="submit" className="submit-btn">Submit</button>
                        <button type="button" className="clear-button" onClick={handleClear}>Clear</button>
                        <button type="button" className="back-button" onClick={handleBack}>Back</button>
                    </div>
                </form>

                {error && <div className="error">{error}</div>}

                {pricingDetails && (
    <div className="pricing-results">
        <h3>Pricing Details</h3>
        <table className="pricing-table">
            <tbody>
                <tr>
                    <th>Product</th>
                    <td>{pricingDetails.productName}</td>
                </tr>
                <tr>
                    <th>Base Price</th>
                    <td>{pricingDetails.basePrice}</td>
                </tr>
                <tr>
                    <th>Battery Required</th>
                    <td>{pricingDetails.batteryRequired ? 'Yes' : 'No'}</td>
                </tr>
                <tr>
                    <th>Service Location</th>
                    <td>{pricingDetails.serviceLocation}</td>
                </tr>
                <tr>
                    <th>Additional Warranty</th>
                    <td>{pricingDetails.additionalWarranty}</td>
                </tr>
                <tr>
                    <th>Final Price</th>
                    <td>{pricingDetails.finalPrice}</td>
                </tr>
            </tbody>
        </table>
    </div>
)}
            </div></center>
        </div> 
    );
};

export default PricingDetails;
