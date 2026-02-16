/**
 * main.jsx - Application entry point
 * Bootstraps the React app, sets up Redux store with thunk middleware,
 * and renders the root App component inside the Redux Provider.
 */

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import { thunk } from 'redux-thunk';
import reducer from './reducer/reducer.js';

// Redux store: holds global state; thunk allows async actions (e.g. API fetches)
const store = createStore(reducer, applyMiddleware(thunk));

// Mount the app: Provider makes store available to all components
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
);

