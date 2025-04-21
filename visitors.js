const express = require('express');
const router = express.Router();
const Visitor = require('../models/Visitor');
const User = require('../models/User');

// Register a visitor
router.post('/register', async (req, res) => {
  try {
    const { name, contact, visitDate, visitDurationHours, hostUserId } = req.body;
    const hostUser = await User.findById(hostUserId);
    if (!hostUser) return res.status(404).json({ message: 'Host user not found' });
    const visitor = new Visitor({
      name,
      contact,
      visitDate,
      visitDurationHours,
      hostUser: hostUser._id,
      status: 'pending',
    });
    await visitor.save();
    res.status(201).json({ message: 'Visitor registered, pending approval' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all visitors (admin)
router.get('/', async (req, res) => {
  try {
    const visitors = await Visitor.find()
      .populate('hostUser', 'name username')
      .sort({ visitDate: -1 });
    res.json(visitors);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Approve or deny visitor
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'denied', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const visitor = await Visitor.findById(req.params.id);
    if (!visitor) return res.status(404).json({ message: 'Visitor not found' });
    visitor.status = status;
    await visitor.save();
    res.json({ message: `Visitor status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
