import {
  SET_AGE_RANGE,
  SET_YEARS_ACTIVE_RANGE
} from '../actions/types';

const INITIAL_STATE = { age: {min: 0, max: 100}};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_AGE_RANGE:
      // console.log('SET_AGE_RANGE', action.payload);
      return {...state, age: action.payload};

    case SET_YEARS_ACTIVE_RANGE:
      // console.log('SET_YEARS_ACTIVE_RANGE', action.payload);
      return {...state, yearsActive: action.payload};
  
    default:
      return state;
  }
}