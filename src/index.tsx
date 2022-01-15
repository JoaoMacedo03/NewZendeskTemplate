import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { unregister } from './serviceWorker';
import './translations';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
);

unregister();
