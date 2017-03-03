
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import CSSModules from 'react-css-modules';
import queryString from 'query-string';

import ProgressBar from 'react-toolbox/lib/progress_bar';

import Dropzone from 'react-dropzone';
import styles from './uploader.css';

import { lessFileToPalette, fileUrlToPalette, updateLoadingState } from '../actions/index';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Try dropping one or many .less file here, or click to select files to upload.'
    };
    this.onDrop = this.onDrop.bind(this);
    const param = queryString.parse(location.search);
    if(param.file){
      this.props.fileUrlToPalette(param.file);
    }
  }

  onDrop(files) {
    this.props.updateLoadingState(true);
    let fileLabels = '';
    files.forEach((file) => {
      this.props.lessFileToPalette(file);
      fileLabels += file.name;
    });
    this.setState({text: fileLabels});
  }

  render() {
    let uploaderContent = this.state.text;
    if(this.props.loading){
      uploaderContent = <ProgressBar type="linear" mode="indeterminate" />
    }
    return (
        <div>
          <Dropzone lessFileToPalette={this.props.lessFileToPalette} styleName="uploader" onDrop={this.onDrop}>
            <span>{ uploaderContent }</span>
          </Dropzone>
        </div>
    );
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ lessFileToPalette, fileUrlToPalette, updateLoadingState }, dispatch);
}

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, mapDispatchToProps)(CSSModules(Uploader, styles));
