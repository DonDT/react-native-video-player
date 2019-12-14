import {SAVE_INDEX} from '../types';

export default function(state = {}, action) {
  switch (action.type) {
    case SAVE_INDEX:
      return {
        ...state,
        videos: {
          videosList: action.payload || false,
        },
      };
      break;

    default:
      return state;
  }
}
