import React, { useEffect } from "react";
//import Products from "../Products/Products";
import { Route, Routes } from "react-router-dom";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import SiteNavBar from "../SiteNavBar/SiteNavBar";
import Home from "../Home/Home";
import { useDispatch, useSelector } from "react-redux";
import { setAccessToken, setUserId } from "../../store/identitySlice";
import { AppRootState } from "../../store/store";
import { CompanyRequest } from "../../types/Company";
import { setCompany, useAddCompanyMutation } from "../../store/businessSlice";
import { Callback } from "../Callback/Callback";
import NotFound from "../NotFound/NotFound";

import type {} from "@mui/x-date-pickers/themeAugmentation";
import type {} from "@mui/x-charts/themeAugmentation";
import type {} from "@mui/x-data-grid/themeAugmentation";
import type {} from "@mui/x-tree-view/themeAugmentation";
import { alpha } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import AppNavbar from "../AppNavbar/AppNavbar";
import Header from "../Header/Header";
import MainGrid from "../MainGrid/MainGrid";
import SideMenu from "../SideMenu/SideMenu";
import AppTheme from "../../theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../../theme/customizations";

const ProtectedLoading = withAuthenticationRequired(Loading);
const ProtectedHome = withAuthenticationRequired(Home);
//const ProtectedProducts = withAuthenticationRequired(Products);

export default function App(props: { disableCustomTheme?: boolean }) {
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

  const xThemeComponents = {
    ...chartsCustomizations,
    ...dataGridCustomizations,
    ...datePickersCustomizations,
    ...treeViewCustomizations,
  };

  return (
    <AppTheme {...props} themeComponents={xThemeComponents}>
      <CssBaseline enableColorScheme />
      <Box sx={{ display: "flex" }}>
        <SideMenu />
        <AppNavbar />
        <Box
          component="main"
          sx={(theme) => ({
            flexGrow: 1,
            backgroundColor: alpha(theme.palette.background.default, 1),
            overflow: "auto",
          })}
        >
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 8, md: 0 },
            }}
          >
            <Header />
            <MainGrid />
            {/* <Routes>
              <Route path="/" index element={<ProtectedHome />} />
              <Route path="/callback" element={<Callback />} />
              <Route path="*" element={<NotFound />} />
            </Routes> */}
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
