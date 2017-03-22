import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Snackbar } from 'react-toolbox/lib/snackbar';

export class Toast extends Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false,
      message: ''
    };
    this.handleSnackbarClick = this.handleSnackbarClick.bind(this);
    this.handleSnackbarTimeout = this.handleSnackbarTimeout.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.setState(nextProps.toast);
  }

  handleSnackbarClick() {
    this.setState({ active: false });
  }

  handleSnackbarTimeout() {
    this.setState({ active: false });
  }


  render() {
    return (
      <section>
        <Snackbar
          action="Dismiss"
          active={this.state.active}
          label={this.state.message}
          timeout={2000}
          onClick={this.handleSnackbarClick}
          onTimeout={this.handleSnackbarTimeout}
          type="cancel"
        />
      </section>
    );
  }
 }

Toast.propTypes = {
  toast: React.PropTypes.object // eslint-disable-line react/forbid-prop-types
};

Toast.defaultProps = {
  toast: {
    active: false,
    message: ''
  }
};

function mapStateToProps({ toast }) {
  return { toast };
}

export default connect(mapStateToProps)(Toast);
