const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VisitorSchema = new Schema({
  name: { type: String, required: true },
  contact: { type: String },
  visitDate: { type: Date, required: true },
  visitDurationHours: { type: Number },
  hostUser: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  status: { type: String, enum: ['pending', 'approved', 'denied'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Visitor', VisitorSchema);
