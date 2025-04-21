const express = require('express');
const router = express.Router();
const LostItem = require('../models/LostItem');
const User = require('../models/User');

// Report lost item
router.post('/report', async (req, res) => {
  try {
    const { userId, description, category, contactInfo } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const lostItem = new LostItem({
      user: user._id,
      description,
      category,
      contactInfo,
      found: false,
    });
    await lostItem.save();
    res.status(201).json({ message: 'Lost item reported' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all lost items
router.get('/', async (req, res) => {
  try {
    const items = await LostItem.find({ found: false }).sort({ createdAt: -1 });
    res.json(items);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Mark item as found (admin)
router.put('/:id/found', async (req, res) => {
  try {
    const item = await LostItem.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    item.found = true;
    await item.save();
    res.json({ message: 'Item marked as found' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
