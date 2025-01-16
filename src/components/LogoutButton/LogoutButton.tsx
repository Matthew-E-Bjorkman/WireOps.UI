import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";

const LogoutButton = () => {
  const { logout } = useAuth0();
  const userDetails = useSelector(
    (state: AppRootState) => state.identity.userDetails
  );

  return (
    <button
      className="btn btn-link text-black"
      onClick={() =>
        logout({ logoutParams: { returnTo: window.location.origin } })
      }
    >
      {userDetails && (
        <div>
          Logged in as: <strong>{userDetails.name}</strong>. Log out?
        </div>
      )}
    </button>
  );
};

export default LogoutButton;
