import React, { useState, useEffect } from 'react';
import Mood from './models/Mood';
import React from 'react';
import MoodItem from './MoodItem';
import axios from 'axios';
const BASE_URL = 'http://localhost:3000';


const MoodList = ({ moods, onDelete, onEdit }) => {
    return (
      <div>
        {moods.map((mood) => (
          <MoodItem key={mood._id} mood={mood} onDelete={onDelete} onEdit={onEdit} />
        ))}
      </div>
    );
  };

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
//   fetch mood data from the server
  class MoodList extends Component {
    constructor(props) {
      super(props);
      this.state = { moods: [] };
    }
  
    async componentDidMount() {
      const response = await Mood.all();
      const moods = response.data;
      this.setState({ moods });
    }
  
    render() {
      const moodItems = this.state.moods.map(mood => (
        <MoodItem key={mood._id} mood={mood} />
      ));
      return <div>{moodItems}</div>;
    }
  }
  //
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
