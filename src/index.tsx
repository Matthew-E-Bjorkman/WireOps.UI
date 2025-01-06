import React, { PropsWithChildren } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./components/App/App.tsx";
import store from "./store/store.tsx";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  AppState,
  Auth0Provider,
  Auth0ProviderOptions,
} from "@auth0/auth0-react";
import { BrowserRouter, useNavigate } from "react-router-dom";

const Auth0ProviderWithRedirectCallback = ({
  children,
  ...props
}: PropsWithChildren<Auth0ProviderOptions>) => {
  const navigate = useNavigate();

  const onRedirectCallback = (appState?: AppState) => {
    navigate((appState && appState.returnTo) || window.location.pathname);
  };

  return (
    <Auth0Provider onRedirectCallback={onRedirectCallback} {...props}>
      {children}
    </Auth0Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root")!);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderWithRedirectCallback
          domain="dev-uwhi4hpgyvx5ddvc.us.auth0.com"
          clientId="vOWc2856Bvlg0ENuykdxLhaT61RTy2lu"
          authorizationParams={{
            audience: "https://localhost:8081/",
            redirect_uri: window.location.origin,
            scope: "admin",
          }}
        >
          <App />
        </Auth0ProviderWithRedirectCallback>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
