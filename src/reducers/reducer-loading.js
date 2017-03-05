import { UPDATE_LOADING } from '../actions/index';

export default function (state = false, action) {
  switch (action.type) {
    case UPDATE_LOADING:
      return action.payload;
    default:
      return state;
  }
}
