const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

// Import routes
const authRoutes = require('./routes/auth');
const roomRoutes = require('./routes/rooms');
const maintenanceRoutes = require('./routes/maintenance');
const eventRoutes = require('./routes/events');
const feeRoutes = require('./routes/fees');
const lostFoundRoutes = require('./routes/lostfound');
const visitorRoutes = require('./routes/visitors');
const chatRoutes = require('./routes/chat');
const feedbackRoutes = require('./routes/feedback');
const adminRoutes = require('./routes/admin');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/rooms', roomRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/fees', feeRoutes);
app.use('/api/lostfound', lostFoundRoutes);
app.use('/api/visitors', visitorRoutes);
app.use('/api/chat', chatRoutes);
app.use('/api/feedback', feedbackRoutes);
app.use('/api/admin', adminRoutes);

// MongoDB connection
const mongoURI = 'mongodb://localhost:27017/hostel_management';
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
