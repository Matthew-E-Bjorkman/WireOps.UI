import React from "react";
import { Outlet } from "react-router-dom";
import SiteNavBar from "../SiteNavBar/SiteNavBar.tsx";

export default function App() {
  return (
    <>
      <SiteNavBar />
      <Outlet />
    </>
  );
}
