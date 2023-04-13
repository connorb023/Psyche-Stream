// Import necessary modules
const express = require('express');
const router = express.Router();
const Mood = require('../models/mood');

// Route for displaying all moods
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find();
    res.render('index', { moods: moods });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Route for adding a new mood
router.post('/', async (req, res) => {
  try {
    const { date, rating, triggers, copingStrategies } = req.body;
    const mood = new Mood({ date, rating, triggers, copingStrategies });
    await mood.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
