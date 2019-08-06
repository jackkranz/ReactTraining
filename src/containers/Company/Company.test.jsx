import React from 'react';
import { shallow } from 'enzyme';
import Company from '.';

describe('Rendering', () => {
  it('Matches Snapshot', () => {
    const props = { company: 'test company 123' };
    const wrapper = shallow(<Company {...props} />);

    const setState = jest.fn();
    const useSetStateSpy = jest.spyOn(React, 'useState');

    useSetStateSpy.mockImplementation(init => [init, setState]);

    const button = wrapper.find('.edit-button').simulate('click');
    console.log(setState);
    expect(setState).toHaveBeenCalledWith(true);
  });
});
