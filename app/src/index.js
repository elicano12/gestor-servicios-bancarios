// src/index.js
import React from "react";
import { createRoot } from "react-dom/client"; // Importar createRoot
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./redux/store";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
