import React from "react";
import Products from "../Products/Products.tsx";
import { Route, Routes } from "react-router-dom";
import {
  useAuth0,
  withAuthenticationRequired,
  WithAuthenticationRequiredOptions,
} from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import Error from "../Error/Error.tsx";
import SiteNavBar from "../SiteNavBar/SiteNavBar.tsx";
import Home from "../Home/Home.tsx";
import { security } from "../../security/security.ts";

const ProtectedHome = withAuthenticationRequired(Home);
const ProtectedProducts = withAuthenticationRequired(Products);

export default function App() {
  const { isLoading, error, getAccessTokenSilently } = useAuth0();
  security.setAccessTokenSilently((options) => getAccessTokenSilently(options));

  if (isLoading) {
    return <Loading />;
  }

  return (
    <>
      <SiteNavBar />
      {error && <Error message={error.message} />}
      <Routes>
        <Route path="/" index element={<ProtectedHome />} />
        <Route path="products" element={<ProtectedProducts />} />
      </Routes>
    </>
  );
}
