const express = require('express');
const router = express.Router();
const MaintenanceRequest = require('../models/MaintenanceRequest');
const User = require('../models/User');
const Room = require('../models/Room');

// Submit a maintenance request
router.post('/', async (req, res) => {
  try {
    const { userId, roomId, issueType, description } = req.body;
    const user = await User.findById(userId);
    const room = await Room.findById(roomId);
    if (!user || !room) return res.status(404).json({ message: 'User or Room not found' });
    const request = new MaintenanceRequest({
      user: user._id,
      room: room._id,
      issueType,
      description,
      status: 'pending',
    });
    await request.save();
    res.status(201).json({ message: 'Maintenance request submitted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get all maintenance requests (admin view)
router.get('/', async (req, res) => {
  try {
    const requests = await MaintenanceRequest.find()
      .populate('user', 'name username')
      .populate('room', 'roomNumber floor');
    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Update maintenance request status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    const request = await MaintenanceRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ message: 'Request not found' });
    if (!['pending', 'in-progress', 'completed'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    request.status = status;
    request.updatedAt = new Date();
    await request.save();
    res.json({ message: 'Status updated' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
