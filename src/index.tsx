import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.tsx";
import store from "./store/store.tsx";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter } from "react-router-dom";
import { Auth0ProviderWithNavigate } from "./components/AuthProviderWithNavigate/AuthProviderWithNavigate.tsx";

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
