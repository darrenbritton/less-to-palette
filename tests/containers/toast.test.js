import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { Toast } from '../../src/containers/toast';

function setup() {
  const props = {
    toast: { active: true, message: 'Test Message' }
  };

  const enzymeWrapper = shallow(<Toast />);

  return {
    props,
    enzymeWrapper
  };
}

describe('(Container) Toast', () => {
  it('should correctly sets its default state', () => {
    const { enzymeWrapper } = setup();
    expect(enzymeWrapper.state()).to.deep.equal({
      active: false,
      message: ''
    });
  });

  it('should correctly sets state to the toast prop on update', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.setProps(props);
    expect(enzymeWrapper.state()).to.deep.equal({
      active: true,
      message: 'Test Message'
    });
  });

  it('should become inactive on click', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.setProps(props);
    enzymeWrapper.instance().handleSnackbarClick();
    expect(enzymeWrapper.state()).to.deep.equal({
      active: false,
      message: 'Test Message'
    });
  });

  it('should become inactive on timeout', () => {
    const { enzymeWrapper, props } = setup();
    enzymeWrapper.setProps(props);
    enzymeWrapper.instance().handleSnackbarTimeout();
    expect(enzymeWrapper.state()).to.deep.equal({
      active: false,
      message: 'Test Message'
    });
  });
});
