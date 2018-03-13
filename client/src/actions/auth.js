import axios from 'axios';
import { FETCH_USER } from './types';

export const fetchUser = () => async dispatch => {
  const res = await axios.get('/auth/user');
  dispatch({type: FETCH_USER, payload: res.data});
};

export const startRegister = (user, history) => {
  return async (dispatch) => {
    try {
      const res = await axios.post('/auth/register', user);
      history.push('/dashboard');
      dispatch({type: FETCH_USER, payload: res.data});
    } 
    catch(err) {
      console.log('startRegister', err);
    } 
  };
};

export const startLogin = (user, history) => {
  return  async (dispatch) => {
    try {
      const res = await axios.post('/auth/login', user);
      history.push('/dashboard');
      dispatch({type: FETCH_USER, payload: res.data});
    } 
    catch (err) {
      console.log('startLogin', err);      
    }
  }
}
