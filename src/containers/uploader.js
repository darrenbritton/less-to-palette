import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import css from 'react-css-modules';
import queryString from 'query-string';

import ProgressBar from 'react-toolbox/lib/progress_bar';

import Dropzone from 'react-dropzone';
import styles from './uploader.css';

import { lessFileToPalette, fileUrlToPalette, updateLoadingState, updateToast } from '../actions/index';

class Uploader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: 'Try dropping one or many .less, .sass, or .css files here, or click here to select files to upload.'
    };
    this.onDrop = this.onDrop.bind(this);
    this.checkResult = this.checkResult.bind(this);
    const param = queryString.parse(location.search);
    if (param.file) {
      this.props.fileUrlToPalette(param.file).then((o) => {
        this.checkResult(o.payload);
      });
    }
  }

  onDrop(files) {
    this.props.updateLoadingState(true);
    let fileLabels = '';
    files.forEach((file) => {
      this.props.lessFileToPalette(file).then((o) => {
        this.checkResult(o.payload);
      });
      if (file.name.match(/\.*\.less|.*\.sass|.*\.css/gi)) {
        fileLabels += file.name;
      } else {
        this.props.updateToast({ active: true, message: `Cannot process file ${file.name}` });
      }
    });
    if (fileLabels) {
      this.setState({ text: fileLabels });
    }
  }

  checkResult(payload) {
    if (payload.length === 0) {
      this.props.updateToast({ active: true, message: 'No colour variables found in this file' });
    }
  }

  render() {
    let uploaderContent = this.state.text;
    if (this.props.loading) {
      uploaderContent = <ProgressBar type="linear" mode="indeterminate" />;
    }
    return (
      <div>
        <Dropzone styleName="uploader" onDrop={this.onDrop}>
          <span>{uploaderContent}</span>
        </Dropzone>
      </div>
    );
  }
}

Uploader.propTypes = {
  loading: React.PropTypes.bool.isRequired,
  updateToast: React.PropTypes.func.isRequired,
  updateLoadingState: React.PropTypes.func.isRequired,
  lessFileToPalette: React.PropTypes.func.isRequired,
  fileUrlToPalette: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    lessFileToPalette,
    fileUrlToPalette,
    updateLoadingState,
    updateToast
  }, dispatch);
}

function mapStateToProps({ loading }) {
  return { loading };
}

export default connect(mapStateToProps, mapDispatchToProps)(css(Uploader, styles));
