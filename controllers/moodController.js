const express = require('express');
const router = express.Router();
const Mood = require('../models/mood');

// GET all moods
router.get('/', async (req, res) => {
  try {
    const moods = await Mood.find();
    res.render('index', { moods });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// GET new mood form
router.get('/moods/new', (req, res) => {
  res.render('new');
});

// Create new mood
router.post('/moods', async (req, res) => {
  try {
    const mood = new Mood({
      date: req.body.date,
      rating: req.body.rating,
      triggers: req.body.triggers,
      copingStrategies: req.body.copingStrategies
    });
    await mood.save();
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Edit mood form
router.get('/moods/:id/edit', async (req, res) => {
  try {
    const mood = await Mood.findById(req.params.id);
    res.render('edit', { mood });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// Update mood
router.put('/moods/:id', async (req, res) => {
  try {
    await Mood.findByIdAndUpdate(req.params.id, {
      date: req.body.date,
      rating: req.body.rating,
      triggers: req.body.triggers,
      copingStrategies: req.body.copingStrategies
    });
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// DELETE mood
router.delete('/moods/:id', async (req, res) => {
  try {
    await Mood.findByIdAndDelete(req.params.id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

module.exports = router;

