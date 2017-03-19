import React, { Component } from 'react';

import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { IconMenu, MenuItem } from 'react-toolbox/lib/menu';
import { Button } from 'react-toolbox/lib/button';
import CopyToClipboard from 'react-copy-to-clipboard';

import css from 'react-css-modules';
import styles from './colour-tile.css';


class Palette extends Component {
  constructor(props) {
    super(props);
    this.updateColourDetail = this.updateColourDetail.bind(this);
  }

  updateColourDetail() {
    this.props.updateColourDetail(this.props.full);
  }

  render() {
    return (
      <Card styleName="card">
        <CardMedia aspectRatio="wide" style={{ background: this.props.colour }} />
        <CardTitle title={this.props.label} subtitle={this.props.colour} styleName="card-title" />
        <CardActions styleName="card-actions">
          <Button label="Details" onClick={() => { this.updateColourDetail(); }} />
          <IconMenu icon="more_vert" position="bottomRight" menuRipple>
            <MenuItem styleName="menu-item-wrapper">
              <CopyToClipboard text={this.props.label}>
                <MenuItem value="copy-variable" icon="code" caption="Copy Variable" />
              </CopyToClipboard>
            </MenuItem>
            <div styleName="menu-item-wrapper">
              <CopyToClipboard text={this.props.colour}>
                <MenuItem value="copy-value" icon="color_lens" caption="Copy Value" />
              </CopyToClipboard>
            </div>
          </IconMenu>
        </CardActions>
      </Card>
    );
  }
}

Palette.propTypes = {
  updateColourDetail: React.PropTypes.func.isRequired,
  colour: React.PropTypes.string.isRequired, // eslint-disable-line react/forbid-prop-types
  full: React.PropTypes.object.isRequired, // eslint-disable-line react/forbid-prop-types
  label: React.PropTypes.string.isRequired
};


export default css(Palette, styles);
