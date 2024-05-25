import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/books')
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => setBooks(data))
      .catch(error => {
        console.error('There was an error fetching the books:', error);
        setError(error);
      });
  }, []);

  const addBook = (book) => {
    fetch('http://127.0.0.1:5000/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(newBook => setBooks([...books, newBook]))
    .catch(error => {
      console.error('There was an error adding the book:', error);
      setError(error);
    });
  };

  return (
    <div>
      <h2>Books</h2>
      {error && <div className="error">{error.message}</div>}
      <BookForm onSubmit={addBook} />
      <ul>
        {books.map(book => (
          <li key={book.id}>{book.title} by {book.author}</li>
        ))}
      </ul>
    </div>
  );
}

export default Books;
