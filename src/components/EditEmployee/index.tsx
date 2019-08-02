import React from 'react';
import { Field, ErrorMessage } from 'formik';
import { removeAllListeners } from 'cluster';
import { Employee } from '../../models/CompanyDetail';
import CompanyContext from '../../containers/Company/CompanyContext';

interface Props {
  employee: Employee;
  formKey: string;
}

const EditEmployee = (props: Props): JSX.Element => {
  const { employee, formKey } = props;
  return (
    <CompanyContext.Consumer>
      {values => (
        <>
          <Field name={`${formKey}.name`} />
          <Field name={`${formKey}.email`} />
          <Field name={`${formKey}.role`} component="select" placeholder="employee role">
            <option value="">Please select a role</option>
            {values.roles.map(r => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Field>
          <ErrorMessage name={`${formKey}.role`} />
        </>
      )}
    </CompanyContext.Consumer>
  );
};

export default EditEmployee;
