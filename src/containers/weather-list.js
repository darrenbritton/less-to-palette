import React, { Component } from 'react';
import { connect } from 'react-redux';

import Chart from '../components/chart'

class WeatherList extends Component {
  constructor(props){
    super(props);

    this.renderWeather = this.renderWeather.bind(this);
  }

  renderWeather(cityData) {
    const name = cityData.city.name;
    const temps = cityData.list.map(weather => weather.main.temp - 273.15);
    const pressures = cityData.list.map(weather => weather.main.pressure);
    const humidities = cityData.list.map(weather => weather.main.humidity);

    console.log(temps);

    return (
      <tr key={ name }>
        <td>{ name }</td>
        <td><Chart data={temps} color={'red'} units='C'/></td>
        <td><Chart data={pressures} color={'orange'} units='hPa' /></td>
        <td><Chart data={humidities} color={'blue'} units='%' /></td>
      </tr>
    );
  }

  render() {
    return (
      <div className="col s12">
        <table className="highlight">
          <thead>
            <tr>
              <th data-field="id">City</th>
              <th data-field="id">Temperature (C)</th>
              <th data-field="id">Pressure (hPa)</th>
              <th data-field="id">Humidity (%)</th>
            </tr>
          </thead>
          <tbody>
            {this.props.weather.map(this.renderWeather)}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps({ weather }) {
  return { weather };
}

export default connect(mapStateToProps)(WeatherList);
