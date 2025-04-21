const express = require('express');
const router = express.Router();
const Feedback = require('../models/Feedback');
const User = require('../models/User');

// Submit feedback
router.post('/', async (req, res) => {
  try {
    const { userId, rating, comments, category } = req.body;
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: 'User not found' });
    const feedback = new Feedback({
      user: user._id,
      rating,
      comments,
      category,
    });
    await feedback.save();
    res.status(201).json({ message: 'Feedback submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all feedback (admin)
router.get('/', async (req, res) => {
  try {
    const feedbacks = await Feedback.find()
      .populate('user', 'name username')
      .sort({ createdAt: -1 });
    res.json(feedbacks);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
