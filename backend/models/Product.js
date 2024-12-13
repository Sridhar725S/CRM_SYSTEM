const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  Product_code: { type: String, required: true },
  Product_Name: { type: String, required: true },
  Base_Price: { type: Number, required: true },
  Warranty_months: { type: Number, required: true },
  Launch_date: { type: Date, required: true },
  Battery_Price: { type: Number, required: true },
  Addl_warranty_peryear: { type: Number, required: true },
});

module.exports = mongoose.model('Product', productSchema);
