const express = require('express');
const router = express.Router();
const Outlet = require('../models/Outlet'); // Adjust the path

// Get all outlets
router.get('/', async (req, res) => {
  try {
    const outlets = await Outlet.find();
    res.json(outlets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new outlet
router.post('/', async (req, res) => {
  const outlet = new Outlet(req.body);
  try {
    const savedOutlet = await outlet.save();
    res.status(201).json(savedOutlet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update an outlet
router.put('/:id', async (req, res) => {
  try {
    const updatedOutlet = await Outlet.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedOutlet);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete an outlet
router.delete('/:id', async (req, res) => {
  try {
    await Outlet.findByIdAndDelete(req.params.id);
    res.json({ message: 'Outlet deleted successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
