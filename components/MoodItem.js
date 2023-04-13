import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { deleteMood } from '../api/moods';

const MoodItem = ({ mood, onDelete }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleDelete = async () => {
    await deleteMood(mood._id);
    onDelete(mood._id);
  };

  const handleShowDeleteConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const handleHideDeleteConfirm = () => {
    setShowDeleteConfirm(false);
  };

  return (
    <div className="mood-item">
      <div className="mood-item-header">
        <div className="mood-item-date">{mood.date}</div>
        <div className="mood-item-rating">{mood.moodRating}/10</div>
      </div>
      <div className="mood-item-body">
        <div className="mood-item-triggers">
          <span className="mood-item-label">Triggers:</span>{' '}
          {mood.triggers ? mood.triggers : 'None'}
        </div>
        <div className="mood-item-coping-strategies">
          <span className="mood-item-label">Coping Strategies:</span>{' '}
          {mood.copingStrategies ? mood.copingStrategies : 'None'}
        </div>
      </div>
      <div className="mood-item-footer">
        <Link to={`/moods/edit/${mood._id}`}>Edit</Link>
        <button onClick={handleShowDeleteConfirm}>Delete</button>
      </div>
      {showDeleteConfirm && (
        <div className="mood-item-delete-confirm">
          <p>Are you sure you want to delete this mood record?</p>
          <button onClick={handleDelete}>Yes</button>
          <button onClick={handleHideDeleteConfirm}>No</button>
        </div>
      )}
    </div>
  );
};

MoodItem.propTypes = {
  mood: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    moodRating: PropTypes.number.isRequired,
    triggers: PropTypes.string,
    copingStrategies: PropTypes.string,
  }).isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default MoodItem;
