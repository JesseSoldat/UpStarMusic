import axios from 'axios';

import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE,
  SEARCH_ARTISTS,
  FIND_ARTIST,
  ARTISTS_IDS,
  RESET_ARTIST,
  RESET_ALL_ARTISTS,
  CREATE_ERROR,
  CLEAR_ERROR,
  DESELECT_ARTIST,
  SELECT_ARTIST,
  RESET_SELECTION
} from './types';

export const createError = (msg) => {
  return { type: CREATE_ERROR, payload: msg };
};

export const clearError = () => {
  return { type: CLEAR_ERROR };
};

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

export const findArtist = (id) => {
  return async (dispatch) => {
    try {
      const res = await axios.get(`/api/find-artist/${id}`);
      dispatch({ type: FIND_ARTIST, payload: res.data });
    } 
    catch (err) {
      console.log('ACTION findArtist ERR', err); 
    }  
  }
}

export const getArtistsIds = () => {
  return async (dispatch) => {
    try {
      const res = await axios.get('/api/artists-ids');
      dispatch({type: ARTISTS_IDS, payload: res.data}); 
    } 
    catch (err) {
      console.log('ACTION getArtistsIds', err); 
    }
  }
}

export const resetArtist = () => {
  return { type: RESET_ARTIST };
}

export const deleteArtist = (id, history) => {
  return async (dispatch) => {
    try {
      await axios.delete(`/api/delete-artist/${id}`);
      dispatch({type: RESET_ALL_ARTISTS});
      history.push('/dashboard');
    } 
    catch (err) {
      console.log('ACTION deleteArtist ERR', err); 
    }
  }
}

export const createArtist = (details, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/api/create-artist', details);
      console.log('createArtist Action', res.data);     
      history.push(`../../artists/${res.data._id}`);
    } 
    catch (err) {
      //console.log('ACTION editArtist ERR', err);  
      dispatch({ type: CREATE_ERROR, payload: err });
    }
  }
}

export const editArtist = (_id, state, history) => {
  return async (dispatch) => {
    try {
    await axios.put(`/api/edit-artist/${_id}`, state);
      history.push(`../../artists/${_id}`);
    } 
    catch (err) {
      console.log('ACTION editArtist ERR', err);  
      dispatch({ type: CREATE_ERROR, payload: err });     
    }    
  }
}

//HELPERS
const refreshSearch = (dispatch, getState) => {
  const { artists: {offset, limit } } = getState();
  const criteria = getState().form.filters.values;
  dispatch(searchArtists({name: '', ...criteria }, offset, limit ));
}