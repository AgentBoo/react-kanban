// react
import React from 'react';
import ReactDOM from 'react-dom';
// redux
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import root from './store/root';
// components
import Root from './components/Root';
// css
import './index.css';


const store = createStore(root);

// NOTE: Inject react app into root div
// ============================================================================ //
ReactDOM.render(
  <Provider store={ store }>
    <Root />
  </Provider>,
  document.getElementById('root')
);
