import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { StateProvider } from './ctx/State';
import { BrowserRouter } from 'react-router-dom';
import { persistor, store } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StateProvider>
          <App />
        </StateProvider>
      </PersistGate>
    </Provider>
  </BrowserRouter>
);


