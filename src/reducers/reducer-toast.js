import { TOAST } from '../actions/index';

export default function(state = {active: false, message: ''}, action) {
  switch (action.type){
    case TOAST:
      return action.payload;
  }
  return state;
}
