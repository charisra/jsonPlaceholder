import React from 'react';
import { shallow } from 'enzyme';
import Home from './Home';

describe('Home component', () => {
  it('starts with the "no posts found" text', () => {
    const wrapper = shallow(<Home />);
    const text = wrapper.find('h3').text();
    expect(text).toEqual('No posts found for the values you searched. Try something different 😉');
  });
});