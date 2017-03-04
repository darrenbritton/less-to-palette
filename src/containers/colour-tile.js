import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CSSModules from 'react-css-modules';

import { Card, CardMedia, CardTitle, CardText, CardActions } from 'react-toolbox/lib/card';
import { Button } from 'react-toolbox/lib/button';
import FontIcon from 'react-toolbox/lib/font_icon';
import CopyToClipboard from 'react-copy-to-clipboard';
import styles from './colour-tile.css';

import {updateColourDetail} from '../actions/index';

class Palette extends Component {
  constructor(props) {
    super(props);
  }

  updateColourDetail(){
    this.props.updateColourDetail(this.props.full);
  }

  render() {
    return (
      <Card styleName='card'>
        <CardMedia aspectRatio="wide" style={{backgroundColor: this.props.colour}}  />
        <CardTitle title={this.props.label} subtitle={this.props.colour} styleName='card-title' />
        <CardActions>
          <Button label="Details" onClick={()=>{this.updateColourDetail()}} />
          <CopyToClipboard text={this.props.colour}>
            <Button label="Copy" />
          </CopyToClipboard>
        </CardActions>
      </Card>
    );
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ updateColourDetail }, dispatch);
}
export default connect(null, mapDispatchToProps)(CSSModules(Palette, styles));
