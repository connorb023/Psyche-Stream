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
const session = require('express-session');

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
app.use(session({
    secret: 'mysecret', // Replace with your own secret key
    resave: false,
    saveUninitialized: false
  }));



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

app.get('/moods', (req, res) => {
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
  app.get('/', (req, res) => {
    if (req.session && req.session.userId) {
      // User is logged in, so find all moods and render the index view with the list of moods
      Mood.find().sort('-date').exec()
      .then((moods) => {
        res.render('index', { moods });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
    } else {
      // User is not logged in, so redirect to the login page
      res.redirect('/login');
    }
  });
  
  app.get('/login', (req, res) => {
    res.render('login');
  });

  app.post('/login', function(req, res) {
    // Check user credentials
    const authenticated = checkCredentials(req.body.username, req.body.password);
  
    if (authenticated) {
      // Set session variable and redirect to dashboard
      req.session.isLoggedIn = true;
      res.redirect('/dashboard');
    } else {
      // Render login page with error message
      res.render('login', { message: 'Invalid username or password.' });
    }
  });
  
  function checkCredentials(username, password) {
    // Check credentials and return boolean value
    // Replace this with your own authentication logic
    return (username === 'connorcb@yahoo.com' && password === 'mypassword');
  }  
  
  
const requireLogin = (req, res, next) => {
    if (req.session.isLoggedIn) {
      next();
    } else {
      res.redirect('/login');
    }
  };
  

  
  function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }
    res.redirect('/login');
  }
  
  app.get('/dashboard', requireLogin, (req, res) => {
    Mood.find().sort('-date').exec()
      .then((moods) => {
        res.render('dashboard', { moods });
      })
      .catch((err) => {
        console.error(err);
        res.status(500).send('Internal Server Error');
      });
  });
  
  app.post('/add', function(req, res) {
    // create a new mood object with the submitted form data
    const newMood = {
      date: new Date(),
      rating: req.body.rating,
      comment: req.body.comment
    };
  
    // push the new mood object into the moods array
    moods.push(newMood);
  
    // render the dashboard template with the updated moods array
    res.render('dashboard', { moods: moods });
  });
  
  
// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
