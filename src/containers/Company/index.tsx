import React, { useState, useEffect } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import CompanyService from '../../services/CompanyService';
import EditCompany from '../../components/EditCompany';
import CompanyContext from './CompanyContext';
import CompanyDetails from '../../components/CompanyDetails';
import { CompanyInfo } from '../../Models/CompanyInfo';
import CompanyDetail from '../../Models/CompanyDetail';

interface Params {
  id?: string;
}

const Company = (props: RouteComponentProps<Params>): JSX.Element => {
  // const { company, roles, editing } = this.state;
  const backButton = <Link to="/">Back</Link>;
  const [editing, setEditing] = useState(false);
  const [company, setCompany] = useState();
  const [roles, setRoles] = useState();

  useEffect(() => {
    const { id } = props.match.params;
    if (id && !company) {
      CompanyService.fetchCompany(id).then(company => {
        setCompany(company);
      });
      CompanyService.fetchRoles().then(roles => {
        setRoles(roles);
      });
    }
  });

  return (
    <div>
      <CompanyContext.Provider value={{ roles: roles }}>
        {!company && <h1>No Company Found</h1>}
        {company && editing && (
          <EditCompany
            onDelete={ (i) => CompanyService.deleteEmployee(i) }
            onSubmit={ (c) => CompanyService.updateCompany(c).then(c => setCompany(c)) }
            company={company} />
        )}
        {company && !editing && <CompanyDetails company={company} />}
        {backButton}
        <Button type="button" onClick={() => setEditing(!editing)}>
          { editing ? 'Details' : 'Edit' }
    </div>
  );
};
export default Company;
