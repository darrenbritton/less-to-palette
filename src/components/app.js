import React, { Component } from 'react';
import AppBar from './AppBar';
import Uploader from '../containers/uploader'
// import SearchBar from '../containers/search-bar';
// import WeatherList from '../containers/weather-list';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <section style={{ padding: 20 }}>
        </section>
        <Uploader />
      </div>
    );
  }
}
