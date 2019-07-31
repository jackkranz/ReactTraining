import React, { PropsWithChildren, useContext } from 'react';
import { Field, ErrorMessage } from 'formik';
import Button from 'react-bootstrap/Button';
import { Employee } from '../../Models/CompanyDetail';
import CompanyContext from '../../containers/Company/CompanyContext';

interface Props extends PropsWithChildren<any> {
  employee: Employee;
  formKey: string;
  onDelete: (e: Employee) => void;
}

const EditEmployee = (props: Props): JSX.Element => {
  const { employee, formKey } = props;
  const { roles } = useContext(CompanyContext);
  return (
    <div key={`${employee.id}`}>
      {employee.id}
      <Field name={`${formKey}.name`} />
      <ErrorMessage name={`${formKey}.name`} />
      <Field name={`${formKey}.email`} />
      <ErrorMessage name={`${formKey}.email`} />
      <Field name={`${formKey}.role`} component="select" placeholder="Employee Role">
        <option value="">Please select a role</option>
        {roles.map(r => (
          <option key={r} value={r}>
            {r}
          </option>
        ))}
      </Field>
      <ErrorMessage name={`${formKey}.role`} />
      <Button type="button" onClick={() => props.onDelete(props.employee)}>
        remove
      </Button>
    </div>
  );
};

export default EditEmployee;
