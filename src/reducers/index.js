import { combineReducers } from 'redux';

import PaletteReducer from './reducer-palette';
import LoadingReducer from './reducer-loading';
import ColourDetailReducer from './reducer-colour-detail';
import ToastReducer from './reducer-toast';

const rootReducer = combineReducers({
  palette: PaletteReducer,
  loading: LoadingReducer,
  colourDetail: ColourDetailReducer,
  toast: ToastReducer
});

export default rootReducer;
