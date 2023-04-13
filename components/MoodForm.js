import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

const MoodForm = ({ currentMood, clearCurrentMood }) => {
  const [mood, setMood] = useState({
    date: '',
    moodRating: '',
    triggers: '',
    copingStrategies: '',
  });

  const { date, moodRating, triggers, copingStrategies } = mood;

  const onChange = (e) => setMood({ ...mood, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      if (currentMood) {
        await axios.put(`/moods/${currentMood._id}`, mood, { withCredentials: true });
        clearCurrentMood();
      } else {
        await axios.post('/moods', mood, { withCredentials: true });
      }
      setMood({ date: '', moodRating: '', triggers: '', copingStrategies: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <h2>{currentMood ? 'Edit Mood' : 'Add Mood'}</h2>
      <div>
        <label htmlFor="date">Date</label>
        <input type="date" name="date" value={date} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="moodRating">Mood Rating</label>
        <input type="number" name="moodRating" min="1" max="10" value={moodRating} onChange={onChange} required />
      </div>
      <div>
        <label htmlFor="triggers">Triggers</label>
        <input type="text" name="triggers" value={triggers} onChange={onChange} />
      </div>
      <div>
        <label htmlFor="copingStrategies">Coping Strategies</label>
        <input type="text" name="copingStrategies" value={copingStrategies} onChange={onChange} />
      </div>
      <div>
        <button type="submit">{currentMood ? 'Update Mood' : 'Add Mood'}</button>
        {currentMood && (
          <button type="button" onClick={clearCurrentMood}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

MoodForm.propTypes = {
  currentMood: PropTypes.object,
  clearCurrentMood: PropTypes.func.isRequired,
};

export default MoodForm;
