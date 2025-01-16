import React from "react";
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
  setUserDetails,
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
  const [addCompany] = useAddCompanyMutation();
  const [updateUser] = useUpdateUserMutation();
  const dispatch = useDispatch();
  const [oneOff, setOneOff] = React.useState(false);

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

  if (userData) {
    dispatch(setUserDetails(userData));
    //Is this the user's first time logging in and were they not invited to a company?
    if (!userData.app_metadata.company_id && !oneOff) {
      setOneOff(true);
      const companyRequest: CompanyRequest = {
        name: userData.app_metadata.company_name,
        owneremail: userData.email,
        ownergivenname: userData.app_metadata.given_name,
        ownerfamilyname: userData.app_metadata.family_name,
        userid: userData.user_id,
      };

      addCompany(companyRequest).then((result) => {
        if (result.error) {
          console.error(result.error);
          return;
        }

        //copy userData and add the id as a company_id field
        const updatedUserData = {
          ...userData,
          app_metadata: {
            ...userData.app_metadata,
            company_id: result.data!.id,
          },
        };
        updateUser(updatedUserData);
        dispatch(setCompany(result.data!));
      });
    }
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
