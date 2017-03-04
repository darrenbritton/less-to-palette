export const LESS_TO_PALETTE = 'LESS_TO_PALETTE';
export const UPDATE_LOADING = 'UPDATE_LOADING';
export const COLOUR_DETAIL = 'COLOUR_DETAIL';

import {readAsText} from 'promise-file-reader'
import tinycolor from 'tinycolor2';
import axios from 'axios';

export function lessFileToPalette(file) {
  const palette = readAsText(file).then((content) => {
    return processFileContent(content);
  });
  return {type: LESS_TO_PALETTE, payload: palette};
}

export function fileUrlToPalette(url) {
  const palette = axios.get(url)
  .then((resp) => {
    return resp.data
  }).then((content) => {
    return processFileContent(content);
  });
  return {type: LESS_TO_PALETTE, payload: palette};
}

export function updateLoadingState(loading) {
  return {type: UPDATE_LOADING, payload: loading};
}

export function updateColourDetail(colour) {
  return {type:COLOUR_DETAIL, payload: colour};
}

function processFileContent(content){
  const lines = content.split('\n');
  const colours = [];
  lines.forEach((line) => {
    if (line.indexOf('@') > -1 && (line.indexOf(': #') > -1 || line.indexOf(': rgb') > -1)) {
      const label = line.substring(0, line.indexOf(':'));
      let value = line.substring(line.indexOf(':') + 2, line.indexOf(';'));
      if (value.indexOf(',') === -1) {
        const baseColourObj = {
          name: label,
          colour: value,
          hex: tinycolor(value).toHexString()
        };
        colours.push(constructColor(baseColourObj));
      }
    }
  });
  return colours;
}

function constructColor(colorObj) {
  var hex = colorObj.hex.substring(1);
  /* Get the RGB values to calculate the Hue. */
  var r = parseInt(hex.substring(0, 2), 16) / 255;
  var g = parseInt(hex.substring(2, 4), 16) / 255;
  var b = parseInt(hex.substring(4, 6), 16) / 255;

  /* Getting the Max and Min values for Chroma. */
  var max = Math.max.apply(Math, [r, g, b]);
  var min = Math.min.apply(Math, [r, g, b]);


  /* Variables for HSV value of hex color. */
  var chr = max - min;
  var hue = 0;
  var val = max;
  var sat = 0;


  if (val > 0) {
      /* Calculate Saturation only if Value isn't 0. */
      sat = chr / val;
      if (sat > 0) {
          if (r == max) {
              hue = 60 * (((g - min) - (b - min)) / chr);
              if (hue < 0) {
                  hue += 360;
              }
          } else if (g == max) {
              hue = 120 + 60 * (((b - min) - (r - min)) / chr);
          } else if (b == max) {
              hue = 240 + 60 * (((r - min) - (g - min)) / chr);
          }
      }
  }
  colorObj.chroma = chr;
  colorObj.hue = hue;
  colorObj.satutation = sat;
  colorObj.val = val;
  colorObj.luma = 0.3 * r + 0.59 * g + 0.11 * b;
  colorObj.red = parseInt(hex.substring(0, 2), 16);
  colorObj.green = parseInt(hex.substring(2, 4), 16);
  colorObj.blue = parseInt(hex.substring(4, 6), 16);
  return colorObj;
}
