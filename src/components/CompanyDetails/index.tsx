import React from 'react';
import CompanyDetail from '../../Models/CompanyDetail';

const CompanyDetails = (props: { company: CompanyDetail }): JSX.Element => {
  const { name } = props.company;
  return <h1>{name}</h1>;
};
export default CompanyDetails;
