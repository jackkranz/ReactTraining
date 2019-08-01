import React from 'react';
import { CompanyDetail } from '../../models/CompanyDetail';

interface Props {
  company: CompanyDetail;
}

const CompanyDisplay = (props: Props): JSX.Element => {
  const { name } = props.company;
  return <div>{name}</div>;
};

export default CompanyDisplay;
