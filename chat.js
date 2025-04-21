const express = require('express');
const router = express.Router();
const ChatMessage = require('../models/ChatMessage');
const User = require('../models/User');

// Get chat messages for a room (e.g., floor, event, or private chat)
router.get('/:room', async (req, res) => {
  try {
    const messages = await ChatMessage.find({ room: req.params.room })
      .populate('sender', 'name username')
      .sort({ createdAt: 1 });
    res.json(messages);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Post a new chat message
router.post('/', async (req, res) => {
  try {
    const { senderId, message, room } = req.body;
    const user = await User.findById(senderId);
    if (!user) return res.status(404).json({ message: 'Sender not found' });
    const chatMessage = new ChatMessage({
      sender: user._id,
      message,
      room,
    });
    await chatMessage.save();
    res.status(201).json({ message: 'Message sent' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
