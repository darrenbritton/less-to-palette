import { combineReducers } from 'redux';

import PaletteReducer from './reducer-palette';
import LoadingReducer from './reducer-loading';

const rootReducer = combineReducers({
  palette: PaletteReducer,
  originalPalette: PaletteReducer,
  loading: LoadingReducer,
  toast: ToastReducer
});

export default rootReducer;
