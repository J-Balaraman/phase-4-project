import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const RatingSchema = Yup.object().shape({
  user_id: Yup.number().required('Required').positive().integer(),
  book_id: Yup.number().required('Required').positive().integer(),
  rating_value: Yup.number().required('Required').min(1).max(5)
});

function RatingForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ user_id: '', book_id: '', rating_value: '' }}
      validationSchema={RatingSchema}
      onSubmit={(values, { setSubmitting }) => {
        onSubmit(values);
        setSubmitting(false);
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>User ID:</label>
            <Field type="number" name="user_id" />
            <ErrorMessage name="user_id" component="div" />
          </div>
          <div>
            <label>Book ID:</label>
            <Field type="number" name="book_id" />
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
