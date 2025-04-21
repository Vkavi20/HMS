const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: { type: String, required: true, unique: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['student', 'staff', 'admin'], default: 'student' },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  roomHistory: [{ type: Schema.Types.ObjectId, ref: 'Room' }],
  preferences: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', UserSchema);
