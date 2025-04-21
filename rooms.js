const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const User = require('../models/User');

// Get all rooms with availability
router.get('/', async (req, res) => {
  try {
    const rooms = await Room.find().populate('occupants', 'name username');
    res.json(rooms);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Get room details by ID
router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id).populate('occupants', 'name username');
    if (!room) return res.status(404).json({ message: 'Room not found' });
    res.json(room);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Assign room to user
router.post('/assign', async (req, res) => {
  try {
    const { userId, roomId } = req.body;
    const room = await Room.findById(roomId);
    const user = await User.findById(userId);
    if (!room || !user) return res.status(404).json({ message: 'User or Room not found' });
    if (room.occupants.length >= room.capacity) {
      return res.status(400).json({ message: 'Room is full' });
    }
    // Add user to room occupants
    room.occupants.push(user._id);
    if (room.occupants.length >= room.capacity) {
      room.isAvailable = false;
    }
    await room.save();
    // Update user's current room and room history
    user.room = room._id;
    if (!user.roomHistory) user.roomHistory = [];
    user.roomHistory.push(room._id);
    await user.save();
    res.json({ message: 'Room assigned successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Request room change (simplified: just update user's room)
router.post('/request-change', async (req, res) => {
  try {
    const { userId, newRoomId } = req.body;
    const user = await User.findById(userId);
    const newRoom = await Room.findById(newRoomId);
    if (!user || !newRoom) return res.status(404).json({ message: 'User or Room not found' });
    if (newRoom.occupants.length >= newRoom.capacity) {
      return res.status(400).json({ message: 'Requested room is full' });
    }
    // Remove user from old room occupants
    if (user.room) {
      const oldRoom = await Room.findById(user.room);
      if (oldRoom) {
        oldRoom.occupants = oldRoom.occupants.filter(occ => occ.toString() !== user._id.toString());
        oldRoom.isAvailable = true;
        await oldRoom.save();
      }
    }
    // Add user to new room occupants
    newRoom.occupants.push(user._id);
    if (newRoom.occupants.length >= newRoom.capacity) {
      newRoom.isAvailable = false;
    }
    await newRoom.save();
    // Update user's current room and room history
    user.room = newRoom._id;
    if (!user.roomHistory) user.roomHistory = [];
    user.roomHistory.push(newRoom._id);
    await user.save();
    res.json({ message: 'Room change successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
