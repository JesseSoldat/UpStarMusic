import axios from 'axios';

export const startRegister = (user) => {
  return (dispatch) => {
    axios.post('/auth/register', user).then(res => {
      dispatch({type: 'FETCH_USER', payload: true});
    })
    .catch(err => {
      console.log('startRegister', err);
    });
  }
}
