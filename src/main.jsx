import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import UserContext from "./userContext/userContext.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <UserContext>
          <App />
        </UserContext>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
