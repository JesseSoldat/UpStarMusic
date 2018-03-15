import {
  SEARCH_ARTISTS,
  FIND_ARTIST,
  RESET_ARTIST,
  RESET_ALL_ARTISTS
} from '../actions/types';

const INITIAL_STATE = {
  all: [],
  offset: 0,
  limit: 10,
  artist: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SEARCH_ARTISTS:
      // console.log('SEARCH_ARTISTS', action.payload); 
      return action.payload;

    case FIND_ARTIST:
      return {...state, artist: action.payload};

    case RESET_ARTIST:
      return {...state, artist: null};

    case RESET_ALL_ARTISTS: 
      return {...state, artist: null, all: []};
   
    default:
      return state;
  }
}