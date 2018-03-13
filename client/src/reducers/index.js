import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import filterCriteriaReducer from './filterCriteriaReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  filterCriteria: filterCriteriaReducer
});