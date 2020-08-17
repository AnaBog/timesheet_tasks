import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './scss/styles.scss'
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import tasksReducer from './store/reducers/tasksReducer';
import quotesReducer from './store/reducers/quotesReducer';

const rootReducer = combineReducers({
  tasksReducer: tasksReducer,
  quotesReducer: quotesReducer
});

const logger = store => {
  return next => {
      return action => {
          console.log('[Middleware] Dispatching', action);
          const result = next(action);
          console.log('[Middleware] next state', store.getState());
          return result;
      }
  }
};

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, composeEnhancers(applyMiddleware(logger, thunk)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);