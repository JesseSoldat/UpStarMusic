import axios from 'axios';

import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE,
  // SEARCH_ARTISTS,
  // FIND_ARTIST,
  // RESET_ARTIST,
  // CREATE_ERROR,
  // CLEAR_ERROR,
  // DESELECT_ARTIST,
  // SELECT_ARTIST,
  // RESET_SELECTION
} from './types';

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