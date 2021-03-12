import React from 'react';
import ReactDom from 'react-dom';
import { App } from './App';
import './index.scss';
import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter } from 'react-router-dom';
const root = document.getElementById('root');
const main = (
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
ReactDom.render(main, root);
