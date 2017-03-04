import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import CSSModules from 'react-css-modules';
import R from 'ramda';

import {Layout, Panel, Sidebar} from 'react-toolbox/lib/layout';
import {IconButton} from 'react-toolbox/lib/button';
import {Dropdown} from 'react-toolbox/lib/dropdown';
import {Grid, Row, Col} from 'react-flexbox-grid';

import ColourTile from './colour-tile';
import ColourDetailView from '../components/colour-detail-view';

import styles from './palette.css';

import {updateLoadingState} from '../actions/index';

class Palette extends Component {
  constructor(props) {
    super(props);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.state = {
      sidebarPinned: false,
      sortBy: '',
      palette: [],
      originalPalette: []
    };
  }

  toggleSidebar() {
    this.setState({
      sidebarPinned: !this.state.sidebarPinned
    });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.palette.length > 0 && this.state.originalPalette !== nextProps.palette) {
      if(this.state.originalPalette.length < 1){
        this.setState({originalPalette: nextProps.palette});
      }
      this.setState({palette: nextProps.palette});
    }
    if (this.props.colourDetail !== nextProps.colourDetail) {
      this.setState({sidebarPinned: true});
    }
  }

  componentDidUpdate() {
    if (this.state.palette.length > 0) {
      this.props.updateLoadingState(false);
    }
  }

  handleChange = (value) => {
    this.setState({sortBy: value});
    let sortedPalette = R.compose(R.reverse, R.sortBy(R.prop(value)))(this.state.palette);
    this.setState({palette: sortedPalette});
  };

  render() {
    let tiles = [];
    let sort = <div></div>;
    let detailView = <div></div>;
    if (this.state.palette.length > 0) {
      let colourProperties = Object.keys(this.state.palette[0]).map((prop) => {
        return {value: prop, label: prop};
      })

      sort = <Row>
        <Col sm={12} md={3} lg={2}>
          <Dropdown label='Sort By' onChange={this.handleChange} source={colourProperties} value={this.state.sortBy}/>
        </Col>
      </Row>;

      tiles = this.state.palette.map(function(colour) {
        return (
          <Col key={colour.name} xs={3} md={2}>
            <ColourTile colour={colour.colour} label={colour.name} full={colour} />
          </Col>
        );
      });
    }
    if(this.props.colourDetail){
      detailView = <ColourDetailView colour={this.props.colourDetail}/>;
    }
    return (
      <Layout>
        <Grid>
          {sort}
          <Row >
            {tiles}
          </Row>
        </Grid>
        <Sidebar pinned={this.state.sidebarPinned} width={5}>
          <div><IconButton icon='close' onClick={this.toggleSidebar}/></div>
            {detailView}
        </Sidebar>
      </Layout>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    updateLoadingState
  }, dispatch);
}

function mapStateToProps({palette, colourDetail}) {
  return {palette, colourDetail};
}

export default connect(mapStateToProps, mapDispatchToProps)(Palette);
