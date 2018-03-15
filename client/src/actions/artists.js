import axios from 'axios';

import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE,
  SEARCH_ARTISTS,
  // FIND_ARTIST,
  // RESET_ARTIST,
  // CREATE_ERROR,
  // CLEAR_ERROR,
  DESELECT_ARTIST,
  SELECT_ARTIST,
  RESET_SELECTION
} from './types';

export const selectArtist = (id) => {
  return { type: SELECT_ARTIST, payload: id };
};

export const deselectArtist = (id) => {
  return { type: DESELECT_ARTIST, payload: id };
};

export const setRetired = (ids) => {
  return async (dispatch, getState) => {
    try {
      await axios.post('/api/set-retired', ids);
      dispatch({type: RESET_SELECTION});
      refreshSearch(dispatch, getState);
    } 
    catch (err) {
      console.log('ACTION setRetired ERR', err);   
    }
  }
}

export const setNotRetired = (ids) => {
  return async (dispatch, getState) => {
    try {
      await axios.post('/api/set-not-retired', ids);
      dispatch({ type: RESET_SELECTION });
      refreshSearch(dispatch, getState);
    } 
    catch (err) {
      console.log('ACTION setNotRetired ERR', err);
    }
  }
}

export const setAgeRange = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/age-range');
      dispatch({ type: SET_AGE_RANGE, payload: res.data }); 
    } 
    catch (err) {
      console.log('ACTION setAgeRange ERR', err);      
    }
  }
}

export const setYearsActiveRange = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/years-active');
      dispatch({type: SET_YEARS_ACTIVE_RANGE, payload: res.data});
    } 
    catch (err) {
      console.log('ACTION setYearsActiveRange ERR', err);            
    }
  }
}
export const searchArtists = (...criteria) => {
  const obj = {...criteria};
  
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/search-artists', obj);
      dispatch({type: SEARCH_ARTISTS, payload: res.data});    
    } 
    catch (err) {
      console.log('ACTION searchArtists ERR', err); 
    }
  }
} 

//HELPERS
const refreshSearch = (dispatch, getState) => {
  const { artists: {offset, limit } } = getState();
  const criteria = getState().form.filters.values;
  dispatch(searchArtists({name: '', ...criteria }, offset, limit ));
}