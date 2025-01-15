import React from "react";
import { useSelector } from "react-redux";
import { AppRootState } from "../../store/store";

const Home = () => {
  const userDetails = useSelector(
    (state: AppRootState) => state.identity.userDetails
  );

  return (
    <div>
      <h1>
        {userDetails != null && (
          <div>{userDetails.app_metadata?.company_name}</div>
        )}
      </h1>
    </div>
  );
};

export default Home;
