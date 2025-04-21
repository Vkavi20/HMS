const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LostItemSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  description: { type: String, required: true },
  category: { type: String },
  found: { type: Boolean, default: false },
  contactInfo: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('LostItem', LostItemSchema);
