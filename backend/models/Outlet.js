const mongoose = require('mongoose');

const outletSchema = new mongoose.Schema({
    Outlet_number: { type: String, required: true },
    Address1: { type: String, required: true },
    Address2: { type: String, required: true },
    City: { type: String, required: true },
    Contact_Number: { type: String, required: true },
    Outlet_type: { type: String, required: true, enum: ['Sales', 'Service'] }
});

const Outlet = mongoose.model('Outlet', outletSchema);

module.exports = Outlet;
