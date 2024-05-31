import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const BookSchema = Yup.object().shape({
  title: Yup.string().required('Required'),
  author: Yup.string().required('Required')
});

function BookForm({ onSubmit }) {
  return (
    <Formik
      initialValues={{ title: '', author: '' }}
      validationSchema={BookSchema}
      onSubmit={(values, { setSubmitting, resetForm }) => {
        onSubmit(values);
        setSubmitting(false);
        resetForm();
      }}
    >
      {({ isSubmitting }) => (
        <Form>
          <div>
            <label>Title:</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />
          </div>
          <div>
            <label>Author:</label>
            <Field type="text" name="author" />
            <ErrorMessage name="author" component="div" />
          </div>
          <button type="submit" disabled={isSubmitting}>Submit</button>
        </Form>
      )}
    </Formik>
  );
}

export default BookForm;
