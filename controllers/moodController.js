// create new mood
const Mood = require('../models/mood');

exports.createMood = async (req, res) => {
  try {
    // Ensure that user is authenticated and add their information to the request object
    if (!req.user) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const mood = new Mood({
      moodType: req.body.moodType,
      note: req.body.note,
      date: req.body.date,
      time: req.body.time,
      user: req.user.id, // Use user id from the request object
    });

    await mood.save();
    res.send(mood);
  } catch (error) {
    console.log('error:', error);
    res.status(500).send(error);
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
//   newMood.save()
//     .then(mood => {
//       console.log(mood);
//       res.redirect('/');
//     })
//     .catch(err => {
//       console.log(err);
//       res.status(500).json({ error: err });
//     });
// };

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