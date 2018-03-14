import {without} from 'lodash';
import {
  SELECT_ARTIST,
  DESELECT_ARTIST,
  RESET_SELECTION
} from '../actions/types';

export default (state = [], action) => {
  switch (action.type) {
    case SELECT_ARTIST:
      return [...state, action.payload]; 

    case DESELECT_ARTIST:
      //Creates an array excluding all given values
      //without([2, 1, 2, 3], 1, 2); => [3]
      return without(state, action.payload);

    case RESET_SELECTION:    
      return [];
  
    default:
      return state;
  }
};