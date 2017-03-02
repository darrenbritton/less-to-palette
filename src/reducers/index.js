import { combineReducers } from 'redux';

import PaletteReducer from './reducer-palette';

const rootReducer = combineReducers({
  palette: PaletteReducer
});

export default rootReducer;
