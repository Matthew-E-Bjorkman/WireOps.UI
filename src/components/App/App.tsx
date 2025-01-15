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
import { useDispatch, useSelector } from "react-redux";
import {
  setUserDetails,
  setUserId,
  useGetUserByIdQuery,
} from "../../store/identitySlice.tsx";
import { AppRootState } from "../../store/store.tsx";

const ProtectedHome = withAuthenticationRequired(Home);
const ProtectedProducts = withAuthenticationRequired(Products);

export default function App() {
  const dispatch = useDispatch();

  const {
    user,
    isLoading: userLoading,
    error,
    getAccessTokenSilently,
  } = useAuth0();
  security.setAccessTokenSilently((options) => getAccessTokenSilently(options));

  if (user) {
    dispatch(setUserId(user!.sub!));
  }

  const userId = useSelector((state: AppRootState) => state.identity.userId);

  const { data: userData } = useGetUserByIdQuery(userId, {
    skip: userLoading,
  });

  if (userLoading) {
    return <Loading />;
  }

  dispatch(setUserDetails(userData));

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
