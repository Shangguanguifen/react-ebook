import epubjs from 'epubjs'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'

import './assets/styles/icon.css';
import store from 'store';
import App from './App';
import reportWebVitals from './reportWebVitals';
// eslint-disable-next-line import/first
window.e = epubjs
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
