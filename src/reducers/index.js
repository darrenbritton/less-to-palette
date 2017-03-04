import { combineReducers } from 'redux';

import PaletteReducer from './reducer-palette';
import LoadingReducer from './reducer-loading';
import ColourDetailReducer from './reducer-colour-detail.js';

const rootReducer = combineReducers({
  palette: PaletteReducer,
  loading: LoadingReducer,
  colourDetail: ColourDetailReducer
});

export default rootReducer;
