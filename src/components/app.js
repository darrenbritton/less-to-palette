import React from 'react';
import AppBar from './AppBar';
import Uploader from '../containers/uploader';
import Palette from '../containers/palette';
import Toast from '../containers/toast';

export default () => ({
  render() {
    return (
      <div>
        <AppBar />
        <section style={{ padding: 53 }} />
        <Uploader />
        <section style={{ padding: 20 }} />
        <Palette />
        <Toast />
      </div>
    );
  }
});
