const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const User = require('../models/User');

// Get all events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find().sort({ date: 1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Create a new event (admin/staff)
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const event = new Event({ title, description, date, location });
    await event.save();
    res.status(201).json({ message: 'Event created' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// RSVP to event
router.post('/:id/rsvp', async (req, res) => {
  try {
    const { userId } = req.body;
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: 'Event not found' });
    if (!event.attendees) event.attendees = [];
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'Already RSVP\'d' });
    }
    event.attendees.push(userId);
    await event.save();
    res.json({ message: 'RSVP successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
