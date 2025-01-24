import React from "react";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../LogoutButton/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";

const SiteNavBar: React.FC = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();

  const navigateToProductPage = () => {
    navigate("/products");
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <div></div>;
};

export default SiteNavBar;
