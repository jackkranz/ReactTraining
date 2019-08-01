import React from 'react';
import { Link } from 'react-router-dom';
import CompanyDTO from '../../models/CompanyDTO';
import CompanyListItem from '../CompanyListItem';

interface Props {
  companies: CompanyDTO[];
}

const CompanyList = (props: Props): JSX.Element => {
  const { companies } = props;
  return (
    <ul>
      {companies.map(company => (
        <li key={company.id}>
          <Link to={`company/${company.id}`}>
            <CompanyListItem company={company.name} />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default CompanyList;
