import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import authReducer from './authReducer';
import filterCriteriaReducer from './filterCriteriaReducer';
import ArtistReducer from './artistsReducer';
import SelectionReducer from './SelectionReducer';
import errorReducer from './errorReducer';

export default combineReducers({
  form: formReducer,
  auth: authReducer,
  filterCriteria: filterCriteriaReducer,
  artists: ArtistReducer,
  selection: SelectionReducer,
  errors: errorReducer
});