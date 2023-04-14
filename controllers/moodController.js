// create new mood
const express = require('express');
const Mood = require('../models/mood');
const router = express.Router();
const moodController = require('../controllers/moodController');

// Add a new mood
exports.createMood = async (req, res) => {
  // const userId = req.user.id; // Get the user's ID from the request object
  
  const mood = new Mood({
    moodType: req.body.moodType,
    rating: req.body.rating,
    date: req.body.date,
    description: req.body.description,
    triggers: req.body.triggers,
    copingStrategies: req.body.copingStrategies,
  });

  try {
    const newMood = await mood.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating new mood');
  }
};
//Get all moods
exports.getAllMoods = (req, res) => {
  Mood.find({ user: req.user.id })
    .then(moods => res.status(200).json(moods))
    .catch(error => res.status(500).json({ error }));
};
//Get a single mood
exports.getMoodById = (req, res) => {
  Mood.findOne({ _id: req.params.id, user: req.user.id })
    .then(mood => res.status(200).json(mood))
    .catch(error => res.status(404).json({ error }));
};
//Update
exports.updateMood = (req, res) => {
  Mood.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { ...req.body }, { new: true })
    .then(mood => res.status(200).json(mood))
    .catch(error => res.status(404).json({ error }));
};
// Delete
exports.deleteMood = async (req, res) => {
  try {
    const deletedMood = await Mood.findByIdAndDelete(req.params.id);
    if (!deletedMood) {
      return res.status(404).send('Mood not found');
    }
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error deleting mood');
  }
};
router.delete('/moods/:id', moodController.deleteMood);

// Path: controllers/userController.js
