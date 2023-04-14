require('dotenv').config();
// Dependencies
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const app = express();
const bodyParser = require('body-parser');
const Mood = require('./models/mood');
const moodController = require('./controllers/moodController');
const userRoutes = require('./controllers/userRoutes');


// Middleware
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride('_method'));
app.use('/user', userRoutes);
app.post('/moods', moodController.createMood);



// Connect to the database
mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Error / success
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected: '));
db.on('disconnected', () => console.log('mongo disconnected'));

app.get('/', (req, res) => {
    // Find all moods
Mood.find().sort('-date').exec()
.then((moods) => {
  // Render the index view with the list of moods
  res.render('index', { moods });
})
.catch((err) => {
  console.error(err);
  res.status(500).send('Internal Server Error');
});

  });
  app.get('/login', (req, res) => {
    res.render('login');
  });
  

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
