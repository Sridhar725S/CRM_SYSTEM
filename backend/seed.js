const mongoose = require('mongoose');
const Product = require('./models/Product');
const Complaint = require('./models/Complaint');
const Outlet = require('./models/Outlet'); // Import the Outlet model
require('dotenv').config();

// Sample product data
const products = [
  { 
    Product_code: 'P001', 
    Product_Name: 'Product A', 
    Base_Price: 5000, 
    Warranty_months: 12, 
    Launch_date: new Date('2022-01-01'), 
    Battery_Price: 1000, 
    Svc_at_Client_Place: 5, 
    Addl_warranty_peryear: 2 
  },
  { 
    Product_code: 'P002', 
    Product_Name: 'Product B', 
    Base_Price: 7000, 
    Warranty_months: 18, 
    Launch_date: new Date('2022-02-01'), 
    Battery_Price: 1500, 
    Svc_at_Client_Place: 6, 
    Addl_warranty_peryear: 3 
  },
  { 
    Product_code: 'P003', 
    Product_Name: 'Product C', 
    Base_Price: 9000, 
    Warranty_months: 24, 
    Launch_date: new Date('2022-03-01'), 
    Battery_Price: 2000, 
    Svc_at_Client_Place: 7, 
    Addl_warranty_peryear: 4 
  }
];

// Sample complaint data with Complaint_Number added
const complaints = [
  { 
    Complaint_Number: 'C0001', // Added Complaint Number
    Customer_Name: 'John Doe', 
    Contact_Number: 1234567890, 
    Product_code: 'P001', 
    Complaint_details: 'Equipment malfunction', 
    Complaint_type: 1, 
    Complaint_date: new Date('2023-06-01'), 
    Complaint_status: 'Registered', 
    Status_date: new Date('2023-06-01') 
  },
  { 
    Complaint_Number: 'C0002', // Added Complaint Number
    Customer_Name: 'Jane Smith', 
    Contact_Number: 1234567891, 
    Product_code: 'P002', 
    Complaint_details: 'Service not rendered in time', 
    Complaint_type: 3, 
    Complaint_date: new Date('2023-06-02'), 
    Complaint_status: 'Registered', 
    Status_date: new Date('2023-06-02') 
  },
  { 
    Complaint_Number: 'C0003', // Added Complaint Number
    Customer_Name: 'Alice Johnson', 
    Contact_Number: 1234567892, 
    Product_code: 'P003', 
    Complaint_details: 'Price charged is too high', 
    Complaint_type: 2, 
    Complaint_date: new Date('2023-06-03'), 
    Complaint_status: 'Registered', 
    Status_date: new Date('2023-06-03') 
  }
];

// Sample outlet data
const outlets = [
  { 
    Outlet_number: '001', 
    Address1: '123 Main St', 
    Address2: 'Suite 101', 
    City: 'New York', 
    Contact_Number: '1234567890', 
    Outlet_type: 'Sales' 
  },
  { 
    Outlet_number: '002', 
    Address1: '456 Elm St', 
    Address2: 'Suite 202', 
    City: 'Los Angeles', 
    Contact_Number: '2345678901', 
    Outlet_type: 'Service' 
  },
  // Add more outlets as needed
];

const seedDatabase = async () => {
  try {
    // Connect to the database
    await mongoose.connect(process.env.MONGODB_URI);

    console.log('Connected to MongoDB');

    // Clear existing data
    await Product.deleteMany({});
    await Complaint.deleteMany({});
    await Outlet.deleteMany({}); // Clear the Outlet collection

    // Insert sample products, complaints, and outlets
    await Product.insertMany(products);
    await Complaint.insertMany(complaints);
    await Outlet.insertMany(outlets); // Insert the outlets data

    console.log('Database seeded successfully');
    
    // Close the database connection
    mongoose.connection.close();
  } catch (err) {
    console.error('Error seeding database:', err);
  }
};

// Run the seed function
seedDatabase();
