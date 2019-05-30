import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import combineReducers from './src/reducers';
import MyApp from './src/components/container/App';

// the shape of state
const state = {
  number: 0
};

const store = createStore(combineReducers);

render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  document.querySelector('#root')
);
