import React from "react";
import { Routes, Route } from "react-router-dom";

import { withAuthenticationRequired } from "@auth0/auth0-react";

import Home from "../Home/Home";
import MainGrid from "../MainGrid/MainGrid";
import { Callback } from "../Callback/Callback";
import NotFound from "../../pages/NotFound/NotFound";
import ItemsListPage from "../../pages/Items/ItemsList/ItemsListPage";
import ItemsDetailPage from "../../pages/Items/ItemsDetail/ItemsDetailPage";

const ProtectedHome = withAuthenticationRequired(Home);
const ProtectedCallback = withAuthenticationRequired(Callback);
const ProtectedMainGrid = withAuthenticationRequired(MainGrid);

const ProtectedItemsListPage = withAuthenticationRequired(ItemsListPage);
const ProtectedItemsDetailPage = withAuthenticationRequired(ItemsDetailPage);

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

    {/* Staffer Routes */}
  </Routes>
);

export default AppRoutes;
