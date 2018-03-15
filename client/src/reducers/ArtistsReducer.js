import {
  SEARCH_ARTISTS,
  // FIND_ARTIST,
  // RESET_ARTIST
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  offset: 0,
  limit: 0
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ARTISTS:
      console.log('SEARCH_ARTISTS', action.payload); 
      return action.payload;
   
  
    default:
      return state;
  }
}