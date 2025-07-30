// models/Task.js
const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  completedAt: Date,
});

module.exports = mongoose.model('Task', TaskSchema);
