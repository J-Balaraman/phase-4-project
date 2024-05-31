import React, { useEffect, useState } from 'react';
import RatingForm from './RatingForm';
import './Ratings.css';

function Ratings() {
  const [ratings, setRatings] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/ratings')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setRatings(data))
      .catch(error => {
        console.error('There was an error fetching the ratings:', error);
        setError(error);
      });
  }, []);

  const addRating = (rating) => {
    fetch('http://127.0.0.1:5000/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(rating)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(newRating => setRatings([...ratings, newRating]))
    .catch(error => {
      console.error('There was an error adding the rating:', error);
      setError(error);
    });
  };

  return (
    <div>
      <h2>Ratings</h2>
      {error && <div className="error">{error.message}</div>}
      <RatingForm onSubmit={addRating} />
      <ul>
        {ratings.map(rating => (
          <li key={rating.id}>
            User: {rating.user_name}, Book: {rating.book_title}, Rating: {rating.rating_value}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Ratings;
