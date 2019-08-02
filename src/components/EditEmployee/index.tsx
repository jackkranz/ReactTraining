import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { Employee } from '../../models/CompanyDetail';

interface Props {
  employee: Employee;
  formKey: string;
}

const EditEmployee = (props: Props): JSX.Element => {
  const { employee, formKey } = props;
  return (
    <div>
      <Field name={`${formKey}.name`} />
      <Field name={`${formKey}.email`} />
    </div>
  );
};

export default EditEmployee;
