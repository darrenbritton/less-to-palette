import { COLOUR_DETAIL } from '../actions/index';

export default function (state = false, action) {
  switch (action.type) {
    case COLOUR_DETAIL:
      return action.payload;
    default:
      return state;
  }
}
