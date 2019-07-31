import React from 'react';

interface Props {
  name: string;
}
const CompanyListItem = (props: Props): JSX.Element => {
  return <h2>{props.name}</h2>;
};

export default CompanyListItem;
