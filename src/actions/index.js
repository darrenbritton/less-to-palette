export const LESS_TO_PALETTE = 'LESS_TO_PALETTE';
export const UPDATE_LOADING = 'UPDATE_LOADING';
import {readAsText} from 'promise-file-reader'
import axios from 'axios';

export function lessFileToPalette(file) {
  const palette = readAsText(file).then((content) => {
    const lines = content.split('\n');
    const colours = [];
    lines.forEach((line) => {
      if (line.indexOf('@') > -1 && (line.indexOf(': #') > -1 || line.indexOf(': rgb') > -1)) {
        const label = line.substring(0, line.indexOf(':'));
        let value = line.substring(line.indexOf(':') + 2, line.indexOf(';'));
        if (value.indexOf(',') === -1) {
          colours.push({key: label, value});
        }
      }
    })
    return colours;
  });
  return {type: LESS_TO_PALETTE, payload: palette};
}

export function fileUrlToPalette(url) {
  const palette = axios.get(url)
  .then((resp) => {
    return resp.data
  }).then((content) => {
    const lines = content.split('\n');
    const colours = [];
    lines.forEach((line) => {
      if (line.indexOf('@') > -1 && (line.indexOf(': #') > -1 || line.indexOf(': rgb') > -1)) {
        const label = line.substring(0, line.indexOf(':'));
        let value = line.substring(line.indexOf(':') + 2, line.indexOf(';'));
        if (value.indexOf(',') === -1) {
          colours.push({key: label, value});
        }
      }
    })
    return colours;
  });
  return {type: LESS_TO_PALETTE, payload: palette};
}

export function updateLoadingState(loading) {
  return {type: UPDATE_LOADING, payload: loading};
}
