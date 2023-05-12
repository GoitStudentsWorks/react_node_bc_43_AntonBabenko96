import React from 'react';
import styles from './FirstStep.module.scss';
import { Formik, Form, Field } from 'formik';

function FirstStep({ onSubmit, next, data }) {
  const radioHandler = values => {
    onSubmit(values.noticeType);
    next(values);
  };

  return (
    <Formik
      onSubmit={radioHandler}
      initialValues={{ noticeType: data }}
      className={styles.div}
    >
      <Form>
        <div className={styles.div}>
          <Field
            type="radio"
            id="choice1"
            name="noticeType"
            value="your pet"
          ></Field>
          <label htmlFor="choice1">your pet</label>

          <Field
            type="radio"
            id="choice2"
            name="noticeType"
            value="sell"
          ></Field>
          <label htmlFor="choice2">sell</label>

          <Field
            type="radio"
            id="choice3"
            name="noticeType"
            value="lost/found"
          ></Field>
          <label htmlFor="choice3">lost/found</label>

          <Field
            type="radio"
            id="choice4"
            name="noticeType"
            value="in good hands"
          ></Field>
          <label htmlFor="choice4">in good hands</label>
        </div>
        <button className={styles.next} type="submit">
          Next
        </button>
      </Form>
    </Formik>
  );
}

export default FirstStep;
