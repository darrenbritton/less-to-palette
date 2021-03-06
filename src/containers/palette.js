import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import R from 'ramda';

import { Layout, Sidebar } from 'react-toolbox/lib/layout';
import { IconButton } from 'react-toolbox/lib/button';
import { Dropdown } from 'react-toolbox/lib/dropdown';
import { Grid, Row, Col } from 'react-flexbox-grid';

import css from 'react-css-modules';
import styles from './palette.css';

import ColourTile from './colour-tile';
import ColourDetailView from '../components/colour-detail-view';

import { updateLoadingState } from '../actions/index';

function colourSort(colour) {
  const primaries = ['red', 'green', 'blue'];
  const alt = primaries.filter(item => item !== colour);
  return function(a, b) { return (a[colour] - (a[alt[0]] + a[alt[1]] / 2)) - (b[colour] - (b[alt[0]] + b[alt[1]] / 2)) };
}

class Palette extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateColourDetail = this.updateColourDetail.bind(this);
    this.state = {
      sidebarPinned: false,
      sortBy: '',
      colourDetail: null,
      palette: []
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.palette.length > 0 && this.props.originalPalette !== nextProps.palette) {
      this.setState({ palette: nextProps.palette, sortBy: '' });
    }
  }

  componentDidUpdate() {
    if (this.state.palette.length > 0) {
      this.props.updateLoadingState(false);
    }
  }

  updateColourDetail(colour) {
    this.setState({
      colourDetail: colour,
      sidebarPinned: true
    });
  }

  toggleSidebar() {
    this.setState({
      sidebarPinned: !this.state.sidebarPinned,
    });
  }

  handleChange(value) {
    this.setState({ sortBy: value });
    let sortedPalette = [];
    if(value === 'red' || value === 'green' || value === 'blue') {
      const sort = colourSort(value);
      sortedPalette = R.compose(R.reverse, R.sort(sort))(this.state.palette);      
    } else {
      sortedPalette = R.compose(R.reverse, R.sortBy(R.prop(value)))(this.state.palette);      
    }
    this.setState({ palette: sortedPalette });
  }

  render() {
    let tiles = [];
    let sort = <div />;
    let detailView = <div />;
    if (this.props.palette.length > 0) {
      const colourProperties = Object.keys(this.props.palette[0])
      .map(prop => ({ value: prop, label: prop }));

      sort = (
        <Row>
          <Col xsOffset={1} xs={10} md={3} lg={2} styleName="dropdown">
            <Dropdown
              label="Sort By"
              onChange={this.handleChange}
              source={colourProperties}
              value={this.state.sortBy}
            />
          </Col>
        </Row>
      );

      tiles = this.state.palette.map(colour => (
        <Col key={colour.name} xs={5} sm={3} md={2}>
          <ColourTile
            colour={colour.colour}
            label={colour.name}
            full={colour}
            updateColourDetail={this.updateColourDetail}
          />
        </Col>
      ));
    }
    if (this.state.colourDetail) {
      detailView = <ColourDetailView colour={this.state.colourDetail} />;
    }
    return (
      <Layout>
        <Grid>
          {sort}
          <Row center="xs">
            {tiles}
          </Row>
        </Grid>
        <Sidebar pinned={this.state.sidebarPinned} width={5}>
          <div><IconButton icon="close" onClick={this.toggleSidebar} /></div>
          {detailView}
        </Sidebar>
      </Layout>
    );
  }
}

Palette.propTypes = {
  palette: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  originalPalette: React.PropTypes.array.isRequired, // eslint-disable-line react/forbid-prop-types
  updateLoadingState: React.PropTypes.func.isRequired
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateLoadingState
  }, dispatch);
}

function mapStateToProps({ palette, originalPalette }) {
  return { palette, originalPalette };
}

export default connect(mapStateToProps, mapDispatchToProps)(css(Palette, styles));
