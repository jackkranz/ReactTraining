import React from 'react';
import * as Yup from 'yup';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import { CompanyDetail, Employee } from '../../models/CompanyDetail';
import EditEmployee from '../EditEmployee';

interface Props {
  company: CompanyDetail;
  onSubmit: (company: CompanyDetail) => void;
}

const EditCompany = (props: Props): JSX.Element => {
  const { name, initialContactDate, estimatedRevenue, employees } = props.company; // Destructuring Props

  const validator = Yup.object().shape({
    name: Yup.string().required('You need a name'),
    initialContactDate: Yup.date().max(new Date(), 'Are you a time traveller?'),
    estimatedRevenue: Yup.number()
      .min(5, 'No deal')
      .max(999999999, 'That is too much money'),
    employees: Yup.array().of(
      Yup.object().shape({
        name: Yup.string()
          .min(2, 'too short!')
          .max(50, 'too long')
          .required('name required'),
        email: Yup.string().email('Must be a valid email'),
        role: Yup.string().required('what job do they do?'),
      }),
    ),
  });

  return (
    <Formik
      initialValues={{ name, initialContactDate, estimatedRevenue, employees }}
      validationSchema={validator}
      onSubmit={(values, { setSubmitting }) => {
        const company: CompanyDetail = {
          id: props.company.id,
          ...values,
        };
        console.log(company);
        props.onSubmit(company);
      }}
    >
      {' '}
      {({ values }) => (
        <Form>
          <Field type="text" name="name" />
          <ErrorMessage name="name" />
          <Field type="date" name="initialContactDate" />
          <ErrorMessage name="initialContactDate" />
          <Field type="number" name="estimatedRevenue" />
          <ErrorMessage name="estimatedRevenue" />
          <FieldArray
            name="employees"
            render={arrayHelpers => (
              <div>
                {values.employees.map((employee, index) => (
                  <EditEmployee key={employee.id} employee={employee} formKey={`employees.${index}`} />
                ))}

                <button
                  type="button"
                  onClick={() =>
                    arrayHelpers.push({
                      id: 0,
                      name: '',
                      email: '',
                      role: '',
                    })
                  }
                >
                  add
                </button>
              </div>
            )}
          />
          <button type="submit"> Submit</button>
        </Form>
      )}
    </Formik>
  );
};

export default EditCompany;
