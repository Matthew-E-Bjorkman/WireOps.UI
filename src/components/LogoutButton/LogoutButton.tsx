import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { user, logout } = useAuth0();

  return (
    <button
      className="btn btn-link text-black"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      Logged in as: <strong>{user!.sub}</strong>. Log out?
    </button>
  );
};

export default LogoutButton;
