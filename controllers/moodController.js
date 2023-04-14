// const express = require('express');
// const router = express.Router();
// const Mood = require('../models/mood');

// // GET all moods
// router.get('/', async (req, res) => {
//   try {
//     const moods = await Mood.find();
//     res.render('index', { moods });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// // GET new mood form
// router.get('/moods/new', (req, res) => {
//   res.render('new');
// });

// // Create new mood
// exports.create = (req, res) => {
// const mood = new Mood({
//   feeling: req.body.feeling,
//   description: req.body.description,
//   date: new Date(),
// });
// // router.post('/moods', async (req, res) => {

// //     const mood = new Mood({
// //       date: req.body.date,
// //       rating: req.body.rating,
// //       triggers: req.body.triggers,
// //       copingStrategies: req.body.copingStrategies
// //     });
// //     });

//     mood.save()
//   .then(() => {
//     // Redirect to the index page after successfully creating the new mood
//     res.redirect('/');
//   })
//   .catch((err) => {
//     console.error(err);
//     res.status(500).send('Internal Server Error');
//   });
// };


// // Edit mood form
// router.get('/moods/:id/edit', async (req, res) => {
//   try {
//     const mood = await Mood.findById(req.params.id);
//     res.render('edit', { mood });
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// // Update mood
// router.put('/moods/:id', async (req, res) => {
//   try {
//     await Mood.findByIdAndUpdate(req.params.id, {
//       date: req.body.date,
//       rating: req.body.rating,
//       triggers: req.body.triggers,
//       copingStrategies: req.body.copingStrategies
//     });
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// // DELETE mood
// router.delete('/moods/:id', async (req, res) => {
//   try {
//     await Mood.findByIdAndDelete(req.params.id);
//     res.redirect('/');
//   } catch (err) {
//     console.error(err);
//     res.status(500).send('Server Error');
//   }
// });

// create new mood
const Mood = require('../models/mood');

exports.createMood = (req, res) => {
  const { emotion, intensity, description } = req.body;
  const newMood = new Mood({
    emotion,
    intensity,
    description,
    user: req.user.id
  });
  Mood.create(newMood)
    .then(mood => res.status(201).json(mood))
    .catch(error => res.status(500).json({ error }));
};

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

