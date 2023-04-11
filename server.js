require('dotenv').config()


//Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require ('mongoose');
const app = express();
const db = mongoose.connection;
const bodyParser = require('body-parser');
const passport = require('passport');
const cors = require('cors'); 

//Middleware

//use public folder for static assets
app.use(express.static('public'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project
app.use(passport.initialize());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());


app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

// Connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI , { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongod disconnected'));

// define Mood schema
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





// start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));