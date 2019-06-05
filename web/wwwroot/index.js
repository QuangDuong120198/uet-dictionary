import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from './src/redux/reducers';
import MyApp from './src/components/container/App';
import '@babel/polyfill';

// the shape of state
const preloadState = {
  number: 1
};

const store = createStore(
  rootReducer,
  preloadState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

render(
  <Provider store={store}>
    <MyApp />
  </Provider>,
  document.querySelector('#root')
);
