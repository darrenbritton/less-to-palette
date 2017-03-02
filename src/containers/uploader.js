
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';

import Dropzone from 'react-dropzone';
import styles from './uploader.css';

import { lessFileToPalette } from '../actions/index';

class Uploader extends Component {
  constructor(props) {
    super(props);
  }

  onDrop(files) {
    files.forEach((file) => this.props.lessFileToPalette(file));
  }

  render() {
    return (
        <div>
          <Dropzone lessFileToPalette={this.props.lessFileToPalette} styleName="uploader" onDrop={this.onDrop}>
            <div>Try dropping one or many .less file here, or click to select files to upload.</div>
          </Dropzone>
        </div>
    );
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ lessFileToPalette }, dispatch);
}

export default connect(null, mapDispatchToProps)(CSSModules(Uploader, styles));
