import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    Product_code: '',
    Product_Name: '',
    Base_Price: '',
    Warranty_months: '',
    Launch_date: '',
    Battery_Price: '',
    Addl_warranty_peryear: ''
  });

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await axios.get('https://crm-system-8gxs.onrender.com/api/admin_products');
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addProduct = async () => {
    try {
      await axios.post('https://crm-system-8gxs.onrender.com/api/admin_products', formData);
      fetchProducts();
      setFormData({
        Product_code: '',
        Product_Name: '',
        Base_Price: '',
        Warranty_months: '',
        Launch_date: '',
        Battery_Price: '',
        Addl_warranty_peryear: ''
      });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const updateProduct = async (id) => {
    try {
      await axios.put(`https://crm-system-8gxs.onrender.com/api/admin_products/${id}`, formData);
      fetchProducts();
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`https://crm-system-8gxs.onrender.com/api/admin_products/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div>
      <h2>📦 Products Management</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <input placeholder="Product Code" name="Product_code" value={formData.Product_code} onChange={handleChange} />
        <input placeholder="Product Name" name="Product_Name" value={formData.Product_Name} onChange={handleChange} />
        <input placeholder="Base Price" name="Base_Price" value={formData.Base_Price} onChange={handleChange} />
        <input placeholder="Warranty Months" name="Warranty_months" value={formData.Warranty_months} onChange={handleChange} />
        <input placeholder="Launch Date" name="Launch_date" type="date" value={formData.Launch_date} onChange={handleChange} />
        <input placeholder="Battery Price" name="Battery_Price" value={formData.Battery_Price} onChange={handleChange} />
        <input placeholder="Addl Warranty Per Year" name="Addl_warranty_peryear" value={formData.Addl_warranty_peryear} onChange={handleChange} />
        <button onClick={addProduct}>Add Product</button>
      </div>

      <ul>
        {products.map(product => (
          <li key={product._id} style={{ marginBottom: '15px', border: '1px solid #ccc', padding: '10px', borderRadius: '8px' }}>
            <p><strong>Code:</strong> {product.Product_code}</p>
            <p><strong>Name:</strong> {product.Product_Name}</p>
            <p><strong>Base Price:</strong> ₹{product.Base_Price}</p>
            <p><strong>Warranty Months:</strong> {product.Warranty_months}</p>
            <p><strong>Launch Date:</strong> {new Date(product.Launch_date).toLocaleDateString()}</p>
            <p><strong>Battery Price:</strong> ₹{product.Battery_Price}</p>
            <p><strong>Additional Warranty (Per Year):</strong> ₹{product.Addl_warranty_peryear}</p>

            <button onClick={() => updateProduct(product._id)}>Update</button>
            <button style={{ marginLeft: '10px' }} onClick={() => deleteProduct(product._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
