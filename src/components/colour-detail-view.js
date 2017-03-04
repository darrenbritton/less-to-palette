import React from 'react';
import CSSModules from 'react-css-modules';

import { CardMedia } from 'react-toolbox/lib/card';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox/lib/list';
import { Button } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './colour-detail-view.css';

const view = (props) => {
  const colourProperties = Object.keys(props.colour).map(function(property) {
    return (
      <ListItem
        key={property}
        caption={props.colour[property].toString()}
        legend={property}
      />
    );
  });

  return (
    <div>
      <CardMedia aspectRatio="wide" style={{backgroundColor: props.colour.colour}} styleName='colour-swatch'  />
      <List>
         <ListSubHeader caption='Colour Properties' />
         {colourProperties}
     </List>
   </div>
  );
}

export default CSSModules(view, styles);
