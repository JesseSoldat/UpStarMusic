import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import ReduxThunk from 'redux-thunk';
import './index.css';
import App from './App';
import reducers from './reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers, {}, applyMiddleware(ReduxThunk));

ReactDOM.render(<Provider store={store}><App /></Provider>, 
  document.getElementById('root'));
registerServiceWorker();
