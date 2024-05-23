import React, { useEffect, useState } from 'react';
import RatingForm from './RatingForm';
import './Ratings.css';

function Ratings() {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    fetch('/ratings')
      .then(response => response.json())
      .then(data => setRatings(data));
  }, []);

  const addRating = (rating) => {
    fetch('/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rating)
    })
    .then(response => response.json())
    .then(newRating => setRatings([...ratings, newRating]));
  };

  return (
    <div>
      <h2>Ratings</h2>
      <RatingForm onSubmit={addRating} />
      <ul>
        {ratings.map(rating => (
          <li key={rating.id}>User ID: {rating.user_id}, Book ID: {rating.book_id}, Rating: {rating.rating_value}</li>
        ))}
      </ul>
    </div>
  );
}

export default Ratings;
