import React, { Component } from 'react';

import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { Button } from 'react-toolbox/lib/button';
import CopyToClipboard from 'react-copy-to-clipboard';

import css from 'react-css-modules';
import styles from './colour-tile.css';


export class ColourTile extends Component {
  constructor(props) {
    super(props);
    this.updateColourDetail = this.updateColourDetail.bind(this);
    this.state = {
      menuItems: [
        {
          prop: 'label',
          icon: 'code',
          caption: 'Copy Variable'
        },
        {
          prop: 'colour',
          icon: 'color_lens',
          caption: 'Copy Value'
        }
      ]
    };
  }

  updateColourDetail() {
    this.props.updateColourDetail(this.props.full);
  }

  render() {
    const menuItems = this.state.menuItems.map(item => (
      <div styleName="menu-item-wrapper">
        <CopyToClipboard text={this.props[item.prop]}>
          <MenuItem value={item.prop} icon={item.icon} caption={item.caption} />
        </CopyToClipboard>
      </div>
      ));
    return (
      <Card styleName="card">
        <CardMedia aspectRatio="wide" style={{ background: this.props.colour }} />
        <CardTitle title={this.props.label} subtitle={this.props.colour} styleName="card-title" />
        <CardActions styleName="card-actions">
          <Button id="details" label="Details" onClick={() => { this.updateColourDetail(); }} />
          <IconMenu icon="more_vert" position="bottomRight" menuRipple>
            { menuItems }
          </IconMenu>
        </CardActions>
      </Card>
    );
  }
}

ColourTile.propTypes = {
  updateColourDetail: React.PropTypes.func.isRequired,
  colour: React.PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  full: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: React.PropTypes.string.isRequired
};


export default css(ColourTile, styles);
