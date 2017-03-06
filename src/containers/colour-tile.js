import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { Card, CardMedia, CardTitle, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import CopyToClipboard from 'react-copy-to-clipboard';

import css from 'react-css-modules';
import styles from './colour-tile.css';

import { updateColourDetail } from '../actions/index';

class Palette extends Component {
  updateColourDetail() {
    this.props.updateColourDetail(this.props.full);
  }

  render() {
    return (
      <Card styleName="card">
        <CardMedia aspectRatio="wide" style={{ backgroundColor: this.props.colour }} />
        <CardTitle title={this.props.label} subtitle={this.props.colour} styleName="card-title" />
        <CardActions>
          <Button label="Details" onClick={() => { this.updateColourDetail(); }} />
          <CopyToClipboard text={this.props.colour}>
            <Button label="Copy" />
          </CopyToClipboard>
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ updateColourDetail }, dispatch);
}
export default connect(null, mapDispatchToProps)(css(Palette, styles));
