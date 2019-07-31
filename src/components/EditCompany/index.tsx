import React from 'react';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import { Formik, Form, Field, ErrorMessage, FieldArray } from 'formik';
import CompanyDetail from '../../Models/CompanyDetail';
import EditEmployee from '../EditEmployee';

interface Props {
  company: CompanyDetail;
  onSubmit: (company: CompanyDetail) => void;
  onDelete: (id: number) => void;
}

class EditCompany extends React.Component<Props, {}> {
  render(): React.ReactNode {
    const { name, initialContactDate, estimatedRevenue, employees } = this.props.company;
    const validator = Yup.object().shape({
      name: Yup.string()
        .min(2, 'Too Short!')
        .max(50, 'Too Long!')
        .required('Required'),
      number: Yup.number(),
      initialContactDate: Yup.date().max(new Date(), 'are you a time traveller?'),
      employees: Yup.array().of(
        Yup.object().shape({
          name: Yup.string()
            .min(2, 'too short!')
            .max(50, 'too long')
            .required('A man needs a name'),
          email: Yup.string().email('Must be a valid email'),
          role: Yup.string().required('they need a job yo'),
        }),
      ),
    });

    return (
      <div>
        <Formik
          initialValues={{ name, initialContactDate, estimatedRevenue, employees }}
          validationSchema={validator}
          onSubmit={(values, { setSubmitting }) => {
            this.submit(values);
            setSubmitting(false);
          }}
        >
          {({ isSubmitting, values }) => (
            <Form>
              <Field className="company-name" type="text" name="name" />
              <ErrorMessage name="name" />
              <Field type="number" name="estimatedRevenue" />
              <ErrorMessage name="number" />
              <Field type="date" name="initialContactDate" />
              <ErrorMessage name="initialContactDate" />
              <FieldArray
                name="employees"
                render={arrayHelpers => (
                  <div>
                    {values.employees.map((employee, index) => (
                      <EditEmployee
                        key={employee.id}
                        employee={employee}
                        formKey={`employees.${index}`}
                        onDelete={() => {
                          arrayHelpers.remove(index);
                          this.props.onDelete(employee.id);
                        }}
                      />
                    ))}

                    <Button
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
                    </Button>
                  </div>
                )}
              />

              <Button type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    );
  }

  submit = (values: any) => {
    const company: CompanyDetail = {
      id: this.props.company.id,
      ...values,
    };
    console.log(values.employees);
    this.props.onSubmit(company);
  };
}

export default EditCompany;
