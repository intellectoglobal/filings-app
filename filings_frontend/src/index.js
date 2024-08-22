// index.js or App.js

import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { store, persistor } from "filings-app\filings_frontendsrcReduxstore.js"; // Adjust the path if needed
import App from "filings-app\filings_frontendsrcApp.jsx"; // Adjust the path if needed

ReactDOM.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
  </Provider>,
  document.getElementById("root")
);
