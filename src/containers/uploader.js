
import React, { Component } from 'react';
import CSSModules from 'react-css-modules';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Dropzone from 'react-dropzone';

import { fetchWeather } from '../actions/index';
import styles from './uploader.css';

class Uploader extends Component {
  constructor(props) {
    super(props);
  }

  onDrop(files) {
    console.log('Received files: ', files);
  }

  render() {
    return (
        <div>
          <Dropzone styleName="uploader" onDrop={this.onDrop}>
            <div>Try dropping one or many .less file here, or click to select files to upload.</div>
          </Dropzone>
        </div>
    );
  }

}
//
// function mapDispatchToProps(dispatch){
//   return bindActionCreators({ fetchWeather }, dispatch);
// }

export default CSSModules(Uploader, styles);
