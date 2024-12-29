import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.tsx";
import store from "./store/store.tsx";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
