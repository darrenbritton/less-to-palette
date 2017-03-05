import React from 'react';

import { CardMedia } from 'react-toolbox/lib/card';
import { List, ListItem, ListSubHeader } from 'react-toolbox/lib/list';

import css from 'react-css-modules';
import styles from './colour-detail-view.css';

const View = (props) => {
  const colourProperties = Object.keys(props.colour).map(property => (
    <ListItem
      key={property}
      caption={props.colour[property].toString()}
      legend={property}
    />
    ));

  return (
    <div>
      <CardMedia
        aspectRatio="wide"
        style={{ backgroundColor: props.colour.colour }}
        styleName="colour-swatch"
      />
      <List>
        <ListSubHeader caption="Colour Properties" />
        {colourProperties}
      </List>
    </div>
  );
};

View.propTypes = {
  colour: React.PropTypes.Object.isRequired,
};

export default css(View, styles);
