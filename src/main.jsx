import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import reduxConfig from "./redux.jsx";
import { Provider } from "react-redux";

import { BrowserRouter } from "react-router-dom";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = reduxConfig();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);