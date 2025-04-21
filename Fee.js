const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const FeeSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  dueDate: { type: Date, required: true },
  status: { type: String, enum: ['pending', 'paid', 'overdue'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  paidAt: { type: Date },
});

module.exports = mongoose.model('Fee', FeeSchema);
