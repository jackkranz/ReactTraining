import React from 'react';
import { shallow } from 'enzyme';
import CompanyListItem from '.';

describe('Rendering', () => {
  it('Matches Snapshot', () => {
    const props = { company: 'test company 123' };
    const component = shallow(<CompanyListItem {...props} />);
    expect(component).toMatchSnapshot();
  });
});
