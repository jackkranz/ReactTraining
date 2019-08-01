import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { CompanyDetail } from '../../models/CompanyDetail';

interface Props {
  company: CompanyDetail;
  onSubmit: (company: CompanyDetail) => void;
}

const EditCompany = (props: Props): JSX.Element => {
  const { name, initialContactDate, estimatedRevenue } = props.company; // Destructuring Props

  const validator = Yup.object().shape({
    name: Yup.string().required('You need a name'),
    initialContactDate: Yup.date().max(new Date(), 'Are you a time traveller?'),
    estimatedRevenue: Yup.number()
      .min(5, 'No deal')
      .max(999999999, 'That is too much money'),
  });

  return (
    <Formik
      initialValues={{ name, initialContactDate, estimatedRevenue }}
      validationSchema={validator}
      onSubmit={(values, { setSubmitting }) => {
        const company: CompanyDetail = {
          ...props.company,
          ...values,
        };
        props.onSubmit(company);
      }}
    >
      <Form>
        <Field type="text" name="name" />
        <ErrorMessage name="name" />
        <Field type="date" name="initialContactDate" />
        <ErrorMessage name="initialContactDate" />
        <Field type="number" name="estimatedRevenue" />
        <ErrorMessage name="estimatedRevenue" />
        <button type="submit"> Submit</button>
      </Form>
    </Formik>
  );
};

export default EditCompany;
