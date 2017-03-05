import { LESS_TO_PALETTE } from '../actions/index';

export default function (state = [], action) {
  switch (action.type) {
    case LESS_TO_PALETTE:
      return action.payload;
    default:
      return state;
  }
}
