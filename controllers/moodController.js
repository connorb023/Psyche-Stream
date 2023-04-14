// create new mood
const Mood = require('../models/mood');

// Add a new mood
exports.createMood = async (req, res) => {
  // const userId = req.user.id; // Get the user's ID from the request object
  
  const mood = new Mood({
    moodType: req.body.moodType,
    rating: req.body.rating,
    date: req.body.date,
    description: req.body.description,
  });

  try {
    const newMood = await mood.save();
    res.redirect('/dashboard');
  } catch (err) {
    console.error(err);
    res.status(500).send('Error creating new mood');
  }
};
  
// exports.createMood = (req, res) => {
//   const { emotion, intensity, description } = req.body;
//   const newMood = new Mood({
//     emotion,
//     intensity,
//     description,
//     user: req.user.id
//   });

exports.getAllMoods = (req, res) => {
  Mood.find({ user: req.user.id })
    .then(moods => res.status(200).json(moods))
    .catch(error => res.status(500).json({ error }));
};

exports.getMoodById = (req, res) => {
  Mood.findOne({ _id: req.params.id, user: req.user.id })
    .then(mood => res.status(200).json(mood))
    .catch(error => res.status(404).json({ error }));
};

exports.updateMood = (req, res) => {
  Mood.findOneAndUpdate({ _id: req.params.id, user: req.user.id }, { ...req.body }, { new: true })
    .then(mood => res.status(200).json(mood))
    .catch(error => res.status(404).json({ error }));
};

exports.deleteMood = (req, res) => {
  Mood.findOneAndDelete({ _id: req.params.id, user: req.user.id })
    .then(() => res.status(204).json())
    .catch(error => res.status(404).json({ error }));
};

// Path: controllers/userController.js