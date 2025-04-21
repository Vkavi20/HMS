const express = require('express');
const router = express.Router();
const Room = require('../models/Room');
const MaintenanceRequest = require('../models/MaintenanceRequest');
const Event = require('../models/Event');
const Fee = require('../models/Fee');
const Feedback = require('../models/Feedback');
const Visitor = require('../models/Visitor');
const User = require('../models/User');

// Get summary dashboard data
router.get('/dashboard', async (req, res) => {
  try {
    const totalRooms = await Room.countDocuments();
    const availableRooms = await Room.countDocuments({ isAvailable: true });
    const totalMaintenanceRequests = await MaintenanceRequest.countDocuments();
    const pendingMaintenanceRequests = await MaintenanceRequest.countDocuments({ status: 'pending' });
    const totalEvents = await Event.countDocuments();
    const totalFeesPending = await Fee.countDocuments({ status: 'pending' });
    const totalVisitors = await Visitor.countDocuments();
    const totalUsers = await User.countDocuments();

    res.json({
      totalRooms,
      availableRooms,
      totalMaintenanceRequests,
      pendingMaintenanceRequests,
      totalEvents,
      totalFeesPending,
      totalVisitors,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
