import React, { use, useEffect } from "react";
import Products from "../Products/Products.tsx";
import { Route, Routes } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading.tsx";
import Error from "../Error/Error.tsx";
import SiteNavBar from "../SiteNavBar/SiteNavBar.tsx";
import Home from "../Home/Home.tsx";
import { security } from "../../security/security.ts";
import { useDispatch, useSelector } from "react-redux";
import {
  setUserId,
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "../../store/identitySlice.tsx";
import { AppRootState } from "../../store/store.tsx";
import { CompanyRequest } from "../../types/Company.ts";
import {
  setCompany,
  useAddCompanyMutation,
} from "../../store/businessSlice.tsx";

const ProtectedHome = withAuthenticationRequired(Home);
const ProtectedProducts = withAuthenticationRequired(Products);

export default function App() {
  const userId = useSelector((state: AppRootState) => state.identity.userId);
  const { data: userDetails } = useGetUserByIdQuery(userId, { skip: !userId });
  const [addCompany] = useAddCompanyMutation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const {
    user,
    isLoading: userLoading,
    isAuthenticated,
    error,
    getAccessTokenSilently,
  } = useAuth0();

  security.setAccessTokenSilently((options) => getAccessTokenSilently(options));

  //Set the user id in the store once Auth0 returns data
  useEffect(() => {
    if (isAuthenticated && user) {
      dispatch(setUserId(user!.sub!));
    }
  }, [isAuthenticated, user]);

  //Set the user details in the store once the API call returns data and state is updated
  useEffect(() => {
    if (userDetails) {
      //Is this the user's first time logging in and were they not invited to a company?
      if (!userDetails.app_metadata.company_id) {
        const companyRequest: CompanyRequest = {
          name: userDetails.app_metadata.company_name,
          owneremail: userDetails.email,
          ownergivenname: userDetails.app_metadata.given_name,
          ownerfamilyname: userDetails.app_metadata.family_name,
          userid: userDetails.user_id,
        };

        addCompany(companyRequest).then((result) => {
          if (result.error) {
            console.error(result.error);
            return;
          }

          //copy userData and add the id as a company_id field
          const updatedUserData = {
            ...userDetails,
            app_metadata: {
              ...userDetails.app_metadata,
              company_id: result.data!.id,
            },
          };
          updateUser(updatedUserData);
          dispatch(setCompany(result.data!));
        });
      }
    }
  }, [userDetails]);

  if (userLoading) {
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
