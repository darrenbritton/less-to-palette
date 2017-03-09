import React from 'react';
import { mount } from 'enzyme';
import { expect } from 'chai';
import Toast from '../../src/containers/toast';

describe('<Toast/>', () => {
  const wrapper = mount(<Toast />);

  it('correctly sets its default state', () => {
    console.log(wrapper);
    expect(wrapper.state).to.deep.equal({
      active: false,
      message: ''
    });
  });

  it('`props` contains a `text` property with a value of "Hello, world!"', () => {
      // 4
    expect(wrapper.props().text).to.equal('Hello, world!');
  });

  it('has an `h1` tag with the text "Home page"', () => {
      // 5
    expect(wrapper.contains(<h1>Home page</h1>)).to.equal(true);
  });

  after(() => {
      // 6
    global.window.close();
  });
});
