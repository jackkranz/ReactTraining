import React from 'react';
import { Link } from 'react-router-dom';
import CompanyListItem from '../CompanyListItem';
import { CompanyInfo } from '../../Models/CompanyInfo';
import Loader from '../../hoc/Loader';

interface Props {
  companies: CompanyInfo[];
  loading: boolean;
}
const CompanyList = (props: Props): JSX.Element => {
  const { companies } = props;
  return (
    <div>
      <ul className="company-list">
        {companies.map((c: CompanyInfo) => (
          <li key={c.id}>
            <Link to={`company/${c.id}`}>
              <CompanyListItem name={c.name} />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Loader(CompanyList);
