import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RatingSchema = Yup.object().shape({
  user_id: Yup.number().required('Required').positive().integer(),
  book_id: Yup.number().required('Required').positive().integer(),
  rating_value: Yup.number().required('Required').min(1).max(5)
});

function RatingForm({ onSubmit }) {
  const [users, setUsers] = useState([]);
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/users')
      .then(response => response.json())
      .then(data => setUsers(data));

    fetch('http://127.0.0.1:5000/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <Formik
      initialValues={{ user_id: '', book_id: '', rating_value: '' }}
      validationSchema={RatingSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>User:</label>
            <Field as="select" name="user_id">
              <option value="">Select User</option>
              {users.map(user => (
                <option key={user.id} value={user.id}>{user.username}</option>
              ))}
            </Field>
            <ErrorMessage name="user_id" component="div" />
          </div>
          <div>
            <label>Book:</label>
            <Field as="select" name="book_id">
              <option value="">Select Book</option>
              {books.map(book => (
                <option key={book.id} value={book.id}>{book.title}</option>
              ))}
            </Field>
            <ErrorMessage name="book_id" component="div" />
          </div>
          <div>
            <label>Rating (1-5):</label>
            <Field type="number" name="rating_value" />
            <ErrorMessage name="rating_value" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default RatingForm;
