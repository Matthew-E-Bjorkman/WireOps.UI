import React from "react";
import { Routes, Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import { ProtectedRoute } from "../ProtectedRoute/ProtectedRoute";

import Home from "../Home/Home";
import MainGrid from "../MainGrid/MainGrid";
import { Callback } from "../Callback/Callback";
import NotFound from "../../pages/NotFound/NotFound";
import Unauthorized from "../../pages/Unauthorized/Unauthorized";
import ItemsListPage from "../../pages/Items/ItemsList/ItemsListPage";
import ItemsDetailPage from "../../pages/Items/ItemsDetail/ItemsDetailPage";
import CompanyDetailPage from "../../pages/Company/CompanyDetail/CompanyDetailPage";
import RolesListPage from "../../pages/Roles/RolesList/RolesListPage";
import RolesDetailPage from "../../pages/Roles/RolesDetail/RolesDetailPage";
import StaffersListPage from "../../pages/Staffers/StaffersList/StaffersListPage";
import StaffersDetailPage from "../../pages/Staffers/StaffersDetail/StaffersDetailPage";

const ProtectedHome = withAuthenticationRequired(Home);
const ProtectedCallback = withAuthenticationRequired(Callback);
const ProtectedMainGrid = withAuthenticationRequired(MainGrid);

const ProtectedItemsListPage = withAuthenticationRequired(ItemsListPage);
const ProtectedItemsDetailPage = withAuthenticationRequired(ItemsDetailPage);

const ProtectedCompanyDetailPage =
  withAuthenticationRequired(CompanyDetailPage);

const ProtectedRolesListPage = withAuthenticationRequired(RolesListPage);
const ProtectedRolesDetailPage = withAuthenticationRequired(RolesDetailPage);

const ProtectedStaffersListPage = withAuthenticationRequired(StaffersListPage);
const ProtectedStaffersDetailPage =
  withAuthenticationRequired(StaffersDetailPage);

const AppRoutes = () => (
  <Routes>
    {/* Default Routes */}
    <Route path="/" element={<ProtectedMainGrid />} />
    <Route path="/callback" element={<ProtectedCallback />} />
    <Route path="/example" element={<ProtectedMainGrid />} />
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="*" element={<NotFound />} />
    {/* Items Routes */}
    <Route
      path="/items"
      element={
        <ProtectedRoute permission="read:items">
          <ProtectedItemsListPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/items/:id"
      element={
        <ProtectedRoute permission="read:items">
          <ProtectedItemsDetailPage />
        </ProtectedRoute>
      }
    />
    {/* Company Routes */}
    <Route
      path="/company"
      element={
        <ProtectedRoute permission="read:companie">
          <ProtectedCompanyDetailPage />
        </ProtectedRoute>
      }
    />
    {/* Role Routes */}
    <Route
      path="/roles"
      element={
        <ProtectedRoute permission="read:roles">
          <ProtectedRolesListPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/roles/:id"
      element={
        <ProtectedRoute permission="read:roles">
          <ProtectedRolesDetailPage />
        </ProtectedRoute>
      }
    />
    {/* Staffer Routes */}
    <Route
      path="/staffers"
      element={
        <ProtectedRoute permission="read:staffers">
          <ProtectedStaffersListPage />
        </ProtectedRoute>
      }
    />
    <Route
      path="/staffers/:id"
      element={
        <ProtectedRoute permission="read:staffers">
          <ProtectedStaffersDetailPage />
        </ProtectedRoute>
      }
    />
  </Routes>
);

export default AppRoutes;
