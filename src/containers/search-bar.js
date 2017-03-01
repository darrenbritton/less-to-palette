
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { fetchWeather } from '../actions/index';

class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { term: ''};
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
  }

  onInputChange(event) {
    this.setState({ term: event.target.value });
  }

  onFormSubmit(event) {
    event.preventDefault();
    this.props.fetchWeather(this.state.term);
    this.setState({ term: ''});
  }

  render() {
    return (
    <form onSubmit={this.onFormSubmit}>
      <div className="col s10 offset-m2 m6 offset-l3 l5">
        <div className="input-field">
          <input
            id="searchBar"
            className="search-bar"
            type="text"
            placeholder="Get a five-day forecast in your city of choice"
            value={this.state.term}
            onChange={this.onInputChange}
          />
        </div>
      </div>
      <div className="col s2 l1">
        <button type="submit" className="waves-effect waves-light btn search"><i className="material-icons">search</i></button>
      </div>
    </form>
    );
  }

}

function mapDispatchToProps(dispatch){
  return bindActionCreators({ fetchWeather }, dispatch);
}

export default connect(null, mapDispatchToProps)(SearchBar);
