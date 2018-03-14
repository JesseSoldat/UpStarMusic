import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import filterCriteriaReducer from './filterCriteriaReducer';
import ArtistReducer from './ArtistsReducer';
import SelectionReducer from './SelectionReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  filterCriteria: filterCriteriaReducer,
  artists: ArtistReducer,
  selection: SelectionReducer
});