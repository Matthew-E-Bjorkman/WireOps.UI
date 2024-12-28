import React from "react";
import "../../style/App.css";
import Products from "../Products/Products.tsx";
import LoginForm from "../LoginForm/LoginForm.tsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ContentLayout from "../ContentLayout/ContentLayout.tsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContentLayout />}>
          <Route path="products" index element={<Products />} />
        </Route>

        <Route path="/login" element={<LoginForm />} />
      </Routes>
    </BrowserRouter>
  );
}
