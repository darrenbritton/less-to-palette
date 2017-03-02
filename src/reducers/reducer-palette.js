import { LESS_TO_PALETTE} from '../actions/index';

export default function(state = [], action) {
  switch (action.type){
    case LESS_TO_PALETTE:
      console.log(action.payload);
      return [ action.payload, ...state ];
  }
  return state;
}
