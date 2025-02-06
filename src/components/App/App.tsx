import React, { useEffect } from "react";
import AppRoutes from "../AppRoutes/AppRoutes";
import { StafferGetParams } from "../../types/Business/Staffer";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";
import Loading from "../Loading/Loading";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setUserId,
  setTenantId,
} from "../../store/identitySlice";
import { AppRootState } from "../../store/store";
import { CompanyRequest } from "../../types/Business/Company";
import {
  useAddCompanyMutation,
  useGetCompanyByIdQuery,
  useGetStaffersQuery,
  useGetStafferByIdQuery,
  setCurrentStaffer,
} from "../../store/businessSlice";

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
import SideMenu from "../SideMenu/SideMenu";
import AppTheme from "../../theme/AppTheme";
import {
  chartsCustomizations,
  dataGridCustomizations,
  datePickersCustomizations,
  treeViewCustomizations,
} from "../../theme/customizations";

const ProtectedLoading = withAuthenticationRequired(Loading);

export default function App(props: { disableCustomTheme?: boolean }) {
  const dispatch = useDispatch();
  const {
    getAccessTokenSilently,
    user,
    isLoading: userLoading,
    isAuthenticated,
    getIdTokenClaims,
  } = useAuth0();
  const { access_token } = useSelector((state: AppRootState) => state.identity);
  const { tenant_id } = useSelector((state: AppRootState) => state.identity);

  const [addCompany] = useAddCompanyMutation();
  const { data: company, isLoading: companyLoading } = useGetCompanyByIdQuery(
    tenant_id,
    {
      skip: !tenant_id || !access_token,
    }
  );
  const { data: staffers, isLoading: staffersLoading } = useGetStaffersQuery(
    tenant_id,
    {
      skip: companyLoading,
    }
  );
  const { data: staffer } = useGetStafferByIdQuery(
    {
      company_id: tenant_id,
      id: staffers?.find((s) => s.user_id === user?.sub)?.id,
    } as StafferGetParams,
    { skip: staffersLoading }
  );

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
        if (userDetails && !userDetails.tenant_id && access_token != "") {
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

            //Reset the token since we have a new company
            getAccessTokenSilently({
              cacheMode: "off",
            }).then((token) => {
              dispatch(setAccessToken(token));
              dispatch(setTenantId(result.data!.id));
            });
          });
        } else if (userDetails && userDetails.tenant_id) {
          //Reset the token since we have a company
          getAccessTokenSilently({
            cacheMode: "off",
          }).then((token) => {
            dispatch(setAccessToken(token));
            dispatch(setTenantId(userDetails.tenant_id));
          });
        }
      });
    }
  }, [access_token, userLoading]);

  useEffect(() => {
    if (staffer) {
      dispatch(setCurrentStaffer(staffer));
    }
  }, [staffer]);

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
          <Header />
          <Stack
            spacing={2}
            sx={{
              alignItems: "center",
              mx: 3,
              pb: 5,
              mt: { xs: 10, md: 2 },
            }}
          >
            <AppRoutes />
          </Stack>
        </Box>
      </Box>
    </AppTheme>
  );
}
