require('dotenv').config();
// Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const db = mongoose.connection;
const bodyParser = require('body-parser');
const Mood = require('./models/mood');

// Middleware
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));

// Connect to the database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected: '));
db.on('disconnected', () => console.log('mongo disconnected'));

// Define Mood schema
const MoodSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  date: {
    type: Date,
    required: true,
  },
  moodRating: {
    type: Number,
    required: true,
  },
  triggers: {
    type: [String],
  },
  copingStrategies: {
    type: [String],
  },
});

// Define Mood model
const Mood = mongoose.model('Mood', MoodSchema);

// API routes for Mood data
app.get('/moods', (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  Mood.find({ user: req.user._id })
    .sort({ date: -1 })
    .then((moods) => {
      if (!moods) {
        return res.status(404).json({ error: 'No moods found' });
      }
      res.json(moods);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    });
});

app.post('/moods', (req, res) => {
  const newMood = new Mood({
    user: req.user._id,
    date: req.body.date,
    moodRating: req.body.moodRating,
    triggers: req.body.triggers,
    copingStrategies: req.body.copingStrategies,
  });

  newMood
    .save()
    .then((mood) => res.json(mood))
    .catch((err) => console.log(err));
});

app.put('/moods/:id', (req, res) => {
  Mood.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { $set: req.body },
    { new: true }
  )
    .then((mood) => res.json(mood))
    .catch((err) => console.log(err));
});

app.delete('/moods/:id', (req, res) => {
  Mood.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    .then(() => res.json({ success: true }))
    .catch((err) => console.log(err));
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
