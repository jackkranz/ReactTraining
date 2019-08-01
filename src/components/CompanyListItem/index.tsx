import React from 'react';

interface Props {
  company: string;
}

const CompanyListItem = (props: Props): JSX.Element => {
  const { company } = props;
  return (
    <div className="company-list-item">
      <h2>{company}</h2>
    </div>
  );
};

export default CompanyListItem;
