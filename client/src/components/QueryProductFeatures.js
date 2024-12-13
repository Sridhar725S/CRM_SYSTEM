import React, { useState, useEffect } from 'react';

function QueryProductFeatures() {
    const [productNames, setProductNames] = useState([]);
    const [selectedName, setSelectedName] = useState('');
    const [productDetails, setProductDetails] = useState(null);
    const [error, setError] = useState('');

    useEffect(() => {
        fetch('https://crm-system-8gxs.onrender.com/api/names')
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Error: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                if (Array.isArray(data)) {
                    setProductNames(data);
                } else {
                    throw new Error('Unexpected API response format');
                }
            })
            .catch((err) => setError(err.message));
    }, []);

    const fetchDetails = () => {
        if (!selectedName) {
            setError('Please select a product');
            return;
        }
        fetch(`https://crm-system-8gxs.onrender.com/api/details/${selectedName}`)
            .then(response => response.json())
            .then(data => setProductDetails(data))
            .catch(err => setError('Failed to fetch product details'));
    };

    const handleClear = () => {
        setProductDetails('');
        setSelectedName('');
        setError('');
    };

    const handleBack = () => {
        window.location.href = '/';
    };

    return (
        <>
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
              position: relative;
          }
                header {
                    background-color: #4CAF50;
                    color: white;
                    padding: 1em;
                    width: 100%;
                    text-align: center;
                    margin: 0;
                    font-size: 2.5em;
                    color: white;
                }
                main {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    width: 100%;
                    padding: 20px;
                    flex: 1;
                }
                form {
                    max-width: 400px;
                    width: 100%;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    padding: 20px;
                    margin-bottom: 20px;
                }
                label {
                    margin-bottom: 10px;
                    font-weight: bold;
                }
                select {
                    width: 100%;
                    padding: 8px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                    margin-bottom: 20px;
                }
                button, a {
                    background-color: #4CAF50;
                    color: white;
                    border: none;
                    padding: 10px 20px;
                    text-align: center;
                    text-decoration: none;
                    font-size: 16px;
                    cursor: pointer;
                    border-radius: 4px;
                    transition: background-color 0.3s;
                    margin-right: 10px;
                }
                button[type="button"] {
                    background-color: #f44336;
                }
                button:hover, a:hover {
                    background-color: #45a049;
                }
                .product-table {
                    margin-top: 20px;
                    background-color: #fff;
                    border-radius: 8px;
                    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
                    overflow-x: auto;
                    max-width: 800px;
                    width: 100%;
                    padding: 20px;
                    box-sizing: border-box;
                    text-align: center;
                }
                table {
                    width: 100%;
                    border-collapse: collapse;
                }
                th, td {
                    padding: 8px;
                    border-bottom: 1px solid #ddd;
                }
                th {
                    background-color: #4CAF50;
                    color: white;
                }
                tr:hover {
                    background-color: #f2f2f2;
                }
                .error-message {
                    color: #f44336;
                    font-weight: bold;
                }
                `}
            </style>
            <div className="query-product-features">
                <header>Query Product Features</header>
                <main>
                    <form>
                        <label htmlFor="product-name">Select Product:</label>
                        <select
                            id="product-name"
                            value={selectedName}
                            onChange={e => {
                                setSelectedName(e.target.value);
                                setError('');
                            }}
                        >
                            <option value="">-- Choose a Product --</option>
                            {productNames.map(product => (
                                <option key={product._id} value={product.Product_Name}>
                                    {product.Product_Name}
                                </option>
                            ))}
                        </select>
                        <button type="button" onClick={fetchDetails}>
                            Fetch Details
                        </button>
                        <button type="button" onClick={handleClear}>Clear</button>
                        <button type="button" onClick={handleBack}>Back</button>
                    </form>
                    {error && <div className="error-message">{error}</div>}
                    {productDetails && (
                        <div className="product-table">
                            <h2>Product Details</h2>
                            <table>
                                <tbody>
                                    <tr>
                                        <th>Product Code</th>
                                        <td>{productDetails.Product_code}</td>
                                    </tr>
                                    <tr>
                                        <th>Product Name</th>
                                        <td>{productDetails.Product_Name}</td>
                                    </tr>
                                    <tr>
                                        <th>Battery Price</th>
                                        <td>{productDetails.Battery_Price}</td>
                                    </tr>
                                    <tr>
                                        <th>Warranty</th>
                                        <td>{productDetails.Warranty_months}</td>
                                    </tr>
                                    <tr>
                                        <th>Launch Date</th>
                                        <td>{productDetails.Launch_date}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}

export default QueryProductFeatures;
