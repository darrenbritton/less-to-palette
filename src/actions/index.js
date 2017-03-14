import { readAsText } from 'promise-file-reader';
import tinycolor from 'tinycolor2';
import axios from 'axios';

export const LESS_TO_PALETTE = 'LESS_TO_PALETTE';
export const UPDATE_LOADING = 'UPDATE_LOADING';
export const COLOUR_DETAIL = 'COLOUR_DETAIL';
export const TOAST = 'TOAST';

function constructColor(Obj) {
  const colorObj = Obj;
  const hex = colorObj.hex.substring(1);
  /* Get the RGB values to calculate the Hue. */
  const r = parseInt(hex.substring(0, 2), 16) / 255;
  const g = parseInt(hex.substring(2, 4), 16) / 255;
  const b = parseInt(hex.substring(4, 6), 16) / 255;

  /* Getting the Max and Min values for Chroma. */
  const max = Math.max.apply(Math, [r, g, b]);
  const min = Math.min.apply(Math, [r, g, b]);


  /* Variables for HSV value of hex color. */
  const chr = max - min;
  let hue = 0;
  const val = max;
  let sat = 0;


  if (val > 0) {
      /* Calculate Saturation only if Value isn't 0. */
    sat = chr / val;
    if (sat > 0) {
      if (r === max) {
        hue = 60 * (((g - min) - (b - min)) / chr);
        if (hue < 0) {
          hue += 360;
        }
      } else if (g === max) {
        hue = (120 + 60) * (((b - min) - (r - min)) / chr);
      } else if (b === max) {
        hue = (240 + 60) * (((r - min) - (g - min)) / chr);
      }
    }
  }
  colorObj.chroma = chr;
  colorObj.hue = hue;
  colorObj.satutation = sat;
  colorObj.val = val;
  colorObj.luma = 0.3 * (r + 0.59) * (g + 0.11) * b;
  colorObj.red = parseInt(hex.substring(0, 2), 16);
  colorObj.green = parseInt(hex.substring(2, 4), 16);
  colorObj.blue = parseInt(hex.substring(4, 6), 16);
  return colorObj;
}

function processFileContent(content) {
  const lines = content.split('\n');
  const re = /(^(@|\$|--))(.+)(#(?:[0-9a-f]{3}){1,2}|rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\))(.+)(;)/i;
  const colours = [];
  lines.forEach((line) => {
    let result = re.exec(line);
    if (result) {
      result = result[0];
      const label = result.substring(0, result.indexOf(':'));
      let value = result.substring(result.indexOf(':') + 2);
      value = value.replace(';', '');
      const baseColourObj = {
        name: label,
        colour: value,
        hex: tinycolor(value).toHexString()
      };
      colours.push(constructColor(baseColourObj));
    }
  });
  return colours;
}

export function lessFileToPalette(file) {
  const palette = readAsText(file).then(content => processFileContent(content));
  return { type: LESS_TO_PALETTE, payload: palette };
}

export function fileUrlToPalette(url) {
  const palette = axios.get(url)
  .then(resp => resp.data).then(content => processFileContent(content));
  return { type: LESS_TO_PALETTE, payload: palette };
}

export function updateLoadingState(loading) {
  return { type: UPDATE_LOADING, payload: loading };
}

export function updateColourDetail(colour) {
  return { type: COLOUR_DETAIL, payload: colour };
}

export function updateToast(toast) {
  return { type: TOAST, payload: toast };
}
