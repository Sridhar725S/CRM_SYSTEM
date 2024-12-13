const express = require('express');
const cors = require('cors'); // Import CORS
const mongoose = require('mongoose');
const Product = require('./models/Product');
const Outlet = require('./models/Outlet');
const Complaint= require('./models/Complaint');
const app = express();
const path = require('path');
require('dotenv').config();

// Enable CORS for all routes
app.use(cors()); // This will allow all origins, or you can specify an origin if needed

// Middleware
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Database connection error:', err.message);
    process.exit(1); // Exit the application if database connection fails
  });


// API to get product names
app.get('/api/names', async (req, res) => {
  try {
    const products = await Product.find({}, { Product_Name: 1, _id: 1 }); // Get only Product_Name and _id
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.json(products); // Send product names as a response
  } catch (err) {
    console.error('Error fetching product names:', err.message);
    res.status(500).json({ error: 'Internal server error. Please try again later.' });
  }
});

// API to get product details by name
app.get('/api/details/:name', async (req, res) => {
  const { name } = req.params; // Get product name from the URL parameter
  try {
    const product = await Product.findOne({ Product_Name: name }); // Find product by name
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product); // Send the product details
  } catch (err) {
    console.error('Error fetching product details:', err.message);
    res.status(500).json({ error: 'Failed to fetch product details' });
  }
});


// Route to get distinct cities
app.get('/api/outlets/cities', async (req, res) => {
    try {
        const cities = await Outlet.distinct('City');
        res.json(cities);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching cities' });
    }
});

// Route to query outlets by city and type
app.post('/api/outlets/query', async (req, res) => {
    const { city, outlet_type } = req.body;
    
    try {
        const outlets = await Outlet.find({ City: city, Outlet_type: outlet_type });
        res.json(outlets);
    } catch (err) {
        res.status(500).json({ message: 'Error querying outlets' });
    }
});

// Route to fetch product options for dropdown and calculate price
app.post('/api/price', async (req, res) => {
    const { productName, serviceLocation, batteryRequired, additionalWarranty } = req.body;

    // Find the selected product from the database
    const product = await Product.findOne({ Product_Name: productName });

    if (!product) {
        return res.status(404).json({ message: 'Product not found' });
    }

    // Fetch the necessary values from the database
    const basePrice = product.Base_Price;
    const batteryPrice = batteryRequired ? product.Battery_Price : 0;

    // Fixed service cost logic based on service location
    const serviceCost = serviceLocation === 'client' ? 300 : 50; // Fixed cost for client or service center

    // Warranty cost calculation using the database's Addl_warranty_peryear
    const warrantyCost = additionalWarranty * (basePrice + batteryPrice) * (product.Addl_warranty_peryear / 100);

    // Final price calculation
    const finalPrice = basePrice + batteryPrice + serviceCost + warrantyCost;

    return res.json({
        productName,
        basePrice,
        batteryRequired,
        serviceLocation,
        additionalWarranty,
        finalPrice,
    });
});

// Route to get all products for dropdown
app.get('/api/products', async (req, res) => {
    const products = await Product.find();
    res.json(products);
});
// POST complaint form route (for MongoDB)
app.post('/api/complaints_form', async (req, res) => {
    const { customerName, contactNumber, product, complaintType, complaintDetails } = req.body;

    try {
        const complaintDate = new Date();
        const status = 'Registered';
        const statusDate = new Date();

        // Insert complaint into MongoDB
        const complaint = new Complaint({
            Customer_Name: customerName,
            Contact_Number: contactNumber,
            Product_code: product,
            Complaint_details: complaintDetails,
            Complaint_type: complaintType,
            Complaint_date: complaintDate,
            Complaint_status: status,
            Status_date: statusDate,
        });

        await complaint.save();  // Save complaint to MongoDB

        res.status(200).json({
            success: true,
            message: 'Complaint Registered Successfully',
            complaintNumber: complaint.Complaint_Number, // Send the generated complaint number
        });
    } catch (error) {
        console.error('Error processing complaint form:', error);
        res.status(500).send({ message: 'Error processing complaint form', error: error.message });
    }
});


// API route for fetching complaint status
app.post('/api/complaints_status', async (req, res) => {
    const { complaintNumber } = req.body;
    
    try {
        // Find the complaint by complaint number
        const complaint = await Complaint.findOne({ Complaint_Number: complaintNumber });
        
        if (!complaint) {
            return res.status(404).json({ error: 'Complaint not found. Please check the complaint number.' });
        }

        // Fetch the product based on the Product_code from the complaint
        const product = await Product.findOne({ Product_code: complaint.Product_code });

        if (!product) {
            return res.status(404).json({ error: 'Product not found for the provided complaint.' });
        }

        // Send the complaint data along with the product name
        res.json({
            complaint: {
                ...complaint.toObject(), // Convert mongoose object to plain JS object
                Product_Name: product.Product_Name // Add product name from the Product model
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Serve static files from the client build folder
app.use(express.static(path.join(__dirname, '../client/build')));

// For any other routes, send the index.html from the build folder
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html')); 
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
