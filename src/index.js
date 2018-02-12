// create-react-app boilerplate
import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
// components
import App from './app/App'
// css
import './index.css'


// ============================================================================ //
ReactDOM.render(
  <App />,
  document.getElementById('root')
);



registerServiceWorker();
