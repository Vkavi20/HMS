const express = require('express');
const router = express.Router();
const Fee = require('../models/Fee');
const User = require('../models/User');

// Get fees for a user
router.get('/:userId', async (req, res) => {
  try {
    const fees = await Fee.find({ user: req.params.userId }).sort({ dueDate: 1 });
    res.json(fees);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a fee record (admin)
router.post('/', async (req, res) => {
  try {
    const { userId, amount, dueDate } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const fee = new Fee({ user: user._id, amount, dueDate, status: 'pending' });
    await fee.save();
    res.status(201).json({ message: 'Fee record created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update fee status (e.g., mark as paid)
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const fee = await Fee.findById(req.params.id);
    if (!fee) return res.status(404).json({ message: 'Fee record not found' });
    if (!['pending', 'paid', 'overdue'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    fee.status = status;
    if (status === 'paid') {
      fee.paidAt = new Date();
    }
    await fee.save();
    res.json({ message: 'Fee status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
