// models/mood.js

const mongoose = require('mongoose');

const MoodSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  rating: { type: Number, required: true },
  triggers: { type: String },
  copingStrategies: { type: String },
});

const Mood = mongoose.model('Mood', MoodSchema);

module.exports = Mood;

