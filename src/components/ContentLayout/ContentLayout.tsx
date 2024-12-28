import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar.tsx";

export default function App() {
  return (
    <>
      <NavBar />
      <Outlet />
    </>
  );
}
