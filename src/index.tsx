import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import store from "./store/store";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./components/AuthProviderWithNavigate/AuthProviderWithNavigate";

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderWithNavigate>
          <App />
        </Auth0ProviderWithNavigate>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
