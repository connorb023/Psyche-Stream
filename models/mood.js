// models/mood.js

const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  triggers: { type: String },
  copingStrategies: { type: String },emotion: { type: String, required: true },
  description: { type: String },
  user: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
}, { timestamps: true });

const Mood = mongoose.model('Mood', MoodSchema);

module.exports = Mood;

