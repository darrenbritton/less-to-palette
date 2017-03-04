import React, { Component } from 'react';
import AppBar from './AppBar';
import Uploader from '../containers/uploader';
import Palette from '../containers/palette';
import Toast from '../containers/toast';

export default class App extends Component {
  render() {
    return (
      <div>
        <AppBar />
        <section style={{ padding: 53 }}>
        </section>
        <Uploader />
        <section style={{ padding: 20 }}>
        </section>
        <Palette />
        <Toast />
      </div>
    );
  }
}
