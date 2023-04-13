import React, { useState, useEffect } from 'react';
import Mood from '../models/Mood';

function MoodList() {
  const [moods, setMoods] = useState([]);

  useEffect(() => {
    Mood.all().then((res) => setMoods(res.data));
  }, []);

  function handleDelete(id) {
    Mood.delete(id).then(() => {
      setMoods(moods.filter((mood) => mood._id !== id));
    });
  }

  return (
    <div>
      <h1>Mood List</h1>
      <ul>
        {moods.map((mood) => (
          <li key={mood._id}>
            <p>Date: {new Date(mood.date).toLocaleDateString()}</p>
            <p>Mood rating: {mood.moodRating}</p>
            <p>Triggers: {mood.triggers.join(', ')}</p>
            <p>Coping strategies: {mood.copingStrategies.join(', ')}</p>
            <button onClick={() => handleDelete(mood._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default MoodList;
