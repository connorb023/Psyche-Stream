// models/mood.js

const mongoose = require('mongoose');

const moodSchema = new mongoose.Schema({
//   moodType: {
//     type: String,
//     required: true
//   },
  rating: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  description: {
    type: String,
    trim: true
  },
  triggers: [{ type: String }],
  copingStrategies: [{ type: String }],
});



const Mood = mongoose.model('Mood', moodSchema);

module.exports = Mood;

