import { combineReducers } from 'redux';

import PaletteReducer from './reducer-palette';
import LoadingReducer from './reducer-loading';
import ColourDetailReducer from './reducer-colour-detail.js';
import ToastReducer from './reducer-toast.js';

const rootReducer = combineReducers({
  palette: PaletteReducer,
  loading: LoadingReducer,
  colourDetail: ColourDetailReducer,
  toast: ToastReducer
});

export default rootReducer;
