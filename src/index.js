import React from 'react';
import ReactDOM from 'react-dom';
import './assets/scss/main.scss';
import App from './app/App';
import './assets/scss/main.scss';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
