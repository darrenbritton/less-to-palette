import React from 'react';
import { shallow } from 'enzyme';
import { expect } from 'chai';

import { ColourTile } from '../../src/containers/colour-tile';

function setup() {
  const props = {
    updateColourDetail: jest.fn(),
    colour: '#2578cf',
    full: { name: '@test-colour-blue', colour: '#2578cf', hex: '#2578cf', chroma: 0.6666666666666666, hue: -146.4705882352941, satutation: 0.821256038647343, val: 0.8117647058823529, luma: 0.10393574068797069, red: 37, green: 120, blue: 207 },
    label: '@test-colour-blue'
  };

  const enzymeWrapper = shallow(<ColourTile {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('(Container) ColourTile', () => {
  it('should call updateColourDetail prop on Details click', () => {
    const { enzymeWrapper } = setup();
    enzymeWrapper.find('#details').simulate('click');
    expect(enzymeWrapper.unrendered.props.updateColourDetail.mock.calls).to.have.lengthOf(1);
  });
});
