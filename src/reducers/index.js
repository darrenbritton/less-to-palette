import { combineReducers } from 'redux';

import PaletteReducer from './reducer-palette';
import LoadingReducer from './reducer-loading';

const rootReducer = combineReducers({
  palette: PaletteReducer,
  loading: LoadingReducer
});

export default rootReducer;
