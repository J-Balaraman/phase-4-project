import React, { useEffect, useState } from 'react';
import BookForm from './BookForm';
import './Books.css';

function Books() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  const addBook = (book) => {
    fetch('/books', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(book)
    })
    .then(response => response.json())
    .then(newBook => setBooks([...books, newBook]));
  };

  return (
    <div>
      <h2>Books</h2>
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
