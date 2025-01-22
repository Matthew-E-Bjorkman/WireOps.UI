import React, { useEffect } from "react";
import Products from "../Products/Products.tsx";
import { Route, Routes } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import Error from "../Error/Error.tsx";
import SiteNavBar from "../SiteNavBar/SiteNavBar.tsx";
import Home from "../Home/Home.tsx";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUserId } from "../../store/identitySlice.tsx";
import { AppRootState } from "../../store/store.tsx";
import { CompanyRequest } from "../../types/Company.ts";
import {
  setCompany,
  useAddCompanyMutation,
} from "../../store/businessSlice.tsx";
import { Callback } from "../Callback/Callback.tsx";
import NotFound from "../NotFound/NotFound.tsx";

const ProtectedLoading = withAuthenticationRequired(Loading);
const ProtectedHome = withAuthenticationRequired(Home);
const ProtectedProducts = withAuthenticationRequired(Products);

export default function App() {
  const dispatch = useDispatch();
  const {
    getAccessTokenSilently,
    user,
    isLoading: userLoading,
    isAuthenticated,
    error,
    getIdTokenClaims,
  } = useAuth0();
  const access_token = useSelector(
    (state: AppRootState) => state.identity.accessToken
  );
  const [addCompany] = useAddCompanyMutation();

  if (access_token === "") {
    //Get a token for internal API use
    getAccessTokenSilently().then((token) => {
      dispatch(setAccessToken(token));
    });
  }

  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(setUserId(user!.sub!));

      getIdTokenClaims().then((userDetails) => {
        if (userDetails && !userDetails.tenant_id) {
          const companyRequest: CompanyRequest = {
            name: userDetails.nickname!,
            owneremail: userDetails.email!,
            ownergivenname: userDetails.given_name!,
            ownerfamilyname: userDetails.family_name!,
            userid: userDetails.sub,
          };

          addCompany(companyRequest).then((result) => {
            if (result.error) {
              console.error(result.error);
              return;
            }

            dispatch(setCompany(result.data!));

            //Reset the token since we have a new company
            getAccessTokenSilently().then((token) => {
              dispatch(setAccessToken(token));
            });
          });
        }
      });
    }
  }, [access_token, userLoading]);

  if (userLoading || !isAuthenticated) {
    return <ProtectedLoading />;
  }

  return (
    <>
      <SiteNavBar />
      {error && <Error message={error.message} />}
      <Routes>
        <Route path="/" index element={<ProtectedHome />} />
        <Route path="/products" element={<ProtectedProducts />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}
