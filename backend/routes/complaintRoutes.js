const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint'); // Adjust the path

// Get all complaints
router.get('/', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update complaint status
router.put('/:id/status', async (req, res) => {
  try {
    const { Complaint_status } = req.body;
    if (!Complaint_status) {
      return res.status(400).json({ message: "Complaint_status is required" });
    }
    const updatedComplaint = await Complaint.findByIdAndUpdate(
      req.params.id,
      { 
        Complaint_status: Complaint_status,
        Status_date: new Date()
      },
      { new: true }
    );
    res.json(updatedComplaint);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
