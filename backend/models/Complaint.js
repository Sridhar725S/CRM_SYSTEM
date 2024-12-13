const mongoose = require('mongoose');

// Define your schema for complaint
const complaintSchema = new mongoose.Schema({
  Complaint_Number: { type: String, unique: true }, // Unique complaint number
  Customer_Name: { type: String, required: true },
  Contact_Number: { type: String, required: true },
  Product_code: { type: String, required: true },
  Complaint_details: { type: String, required: true },
  Complaint_type: { type: Number, required: true },
  Complaint_date: { type: Date, required: true },
  Complaint_status: { type: String, default: 'Registered' },
  Status_date: { type: Date, required: true },
});

// Automatically generate Complaint_Number before saving
complaintSchema.pre('save', function (next) {
  if (!this.Complaint_Number) {
    this.Complaint_Number = `C-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

const Complaint = mongoose.model('Complaint', complaintSchema);
module.exports = Complaint;
