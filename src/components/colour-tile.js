import React from 'react';
import CSSModules from 'react-css-modules';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import styles from './colour-tile.css';

const view = (props) => {
  return (
    <Card styleName='card'>
      <CardMedia aspectRatio="wide" style={{backgroundColor: props.colour}}  />
      <CardTitle title={props.label} subtitle={props.colour}/>
      <CardActions>
        <Button label="Details"/>
        <Button label="Copy"/>
      </CardActions>
    </Card>
  );
}

export default CSSModules(view, styles);
