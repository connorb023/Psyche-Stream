import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import axios from 'axios';

import Navbar from './components/Navbar';
import MoodList from './components/MoodList';
import MoodForm from './components/MoodForm';
import MoodItem from './components/MoodItem';

function App() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    axios.get('/moods')
      .then(res => setMoods(res.data))
      .catch(err => console.log(err));
  }, []);

  const addMood = (newMood) => {
    axios.post('/moods', newMood)
      .then(res => setMoods([...moods, res.data]))
      .catch(err => console.log(err));
  };

  const deleteMood = (id) => {
    axios.delete(`/moods/${id}`)
      .then(res => setMoods(moods.filter(mood => mood._id !== id)))
      .catch(err => console.log(err));
  };

  const editMood = (id, updatedMood) => {
    axios.put(`/moods/${id}`, updatedMood)
      .then(res => setMoods(moods.map(mood => mood._id === id ? res.data : mood)))
      .catch(err => console.log(err));
  };
  render()
    return (
      <div>
        <Navigation />
        <main>
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/moods" component={MoodList} />
            <Route exact path="/moods/new" component={MoodForm} />
            <Route exact path="/moods/:id/edit" component={MoodForm} />
          </Switch>
        </main>
      </div>
    );
  }
  
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br/>
        <Switch>
          <Route exact path="/" render={() => <MoodList moods={moods} deleteMood={deleteMood} />} />
          <Route exact path="/add" render={() => <MoodForm addMood={addMood} />} />
          <Route exact path="/edit/:id" render={(props) => <MoodForm {...props} editMood={editMood} />} />
          <Route exact path="/mood/:id" render={(props) => <MoodItem {...props} deleteMood={deleteMood} />} />
        </Switch>
      </div>
    </Router> 
  );

export default App;
