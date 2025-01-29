import React from "react";
import { Routes, Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import Home from "../Home/Home";
import MainGrid from "../MainGrid/MainGrid";
import { Callback } from "../Callback/Callback";
import NotFound from "../../pages/NotFound/NotFound";
import ItemsListPage from "../../pages/Items/ItemsList/ItemsListPage";
import ItemsDetailPage from "../../pages/Items/ItemsDetail/ItemsDetailPage";
import CompanyDetailPage from "../../pages/Company/CompanyDetail/CompanyDetailPage";
import StaffersListPage from "../../pages/Staffers/StaffersList/StaffersListPage";
import StaffersDetailPage from "../../pages/Staffers/StaffersDetail/StaffersDetailPage";

const ProtectedHome = withAuthenticationRequired(Home);
const ProtectedCallback = withAuthenticationRequired(Callback);
const ProtectedMainGrid = withAuthenticationRequired(MainGrid);

const ProtectedItemsListPage = withAuthenticationRequired(ItemsListPage);
const ProtectedItemsDetailPage = withAuthenticationRequired(ItemsDetailPage);

const ProtectedCompanyDetailPage =
  withAuthenticationRequired(CompanyDetailPage);

const ProtectedStaffersListPage = withAuthenticationRequired(StaffersListPage);
const ProtectedStaffersDetailPage =
  withAuthenticationRequired(StaffersDetailPage);

const AppRoutes = () => (
  <Routes>
    {/* Default Routes */}
    <Route path="/" element={<ProtectedHome />} />
    <Route path="/callback" element={<ProtectedCallback />} />
    <Route path="/example" element={<ProtectedMainGrid />} />
    <Route path="*" element={<NotFound />} />
    {/* Items Routes */}
    <Route path="/items" element={<ProtectedItemsListPage />} />
    <Route path="/items/:id" element={<ProtectedItemsDetailPage />} />
    {/* Company Routes */}
    <Route path="/company" element={<ProtectedCompanyDetailPage />} />
    {/* Staffer Routes */}
    <Route path="/staffers" element={<ProtectedStaffersListPage />} />
    <Route path="/staffers/:id" element={<ProtectedStaffersDetailPage />} />
  </Routes>
);

export default AppRoutes;
