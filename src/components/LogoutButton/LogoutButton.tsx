import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const { user, isLoading } = useAuth0();

  return (
    <button
      className="btn btn-link text-black"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      {!isLoading && (
        <div>
          Welcome <strong>{user?.given_name}</strong>. Log out?
        </div>
      )}
      {isLoading && <div>Log out?</div>}
    </button>
  );
};

export default LogoutButton;
