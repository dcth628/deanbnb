import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store';
import { restoreCSRF, csrfFetch } from './store/csrf';
import * as sessionActions from './store/session';
import * as spotActions from './store/spot';
import {ModalProvider, Modal} from './context/Modal';

const store = configureStore();

if (process.env.NODE_ENV !== 'production') {
  restoreCSRF();

  window.spotActions = spotActions;
  window.sessionActions = sessionActions;
  window.csrfFetch = csrfFetch;
  window.store = store;
};

// Wrap the application with the Modal provider and render the Modal component
// after the App component so that all the Modal content will be layered as
// HTML elements on top of the all the other HTML elements:

function Root() {
  return (
    <ModalProvider>
      <Provider store={store}>
        <BrowserRouter>
          <App />
          <Modal />
        </BrowserRouter>
      </Provider>
    </ModalProvider>
  )
}
ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);
