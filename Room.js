const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RoomSchema = new Schema({
  roomNumber: { type: String, required: true, unique: true },
  floor: { type: Number, required: true },
  capacity: { type: Number, required: true },
  occupants: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  amenities: [String],
  isAvailable: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Room', RoomSchema);
