import "./index.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { configureStore } from "./redux/store";
import { Provider } from "react-redux";
import { PermissionProvider } from 'react-redux-permission'

const store = configureStore();

ReactDOM.render(
  <Provider store={store}>
    <PermissionProvider store={store} reducerKey="permission">
      <App />
    </PermissionProvider>
  </Provider>,
  document.getElementById("root")
);
