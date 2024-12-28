import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/sessionSlice.tsx";
import "../../style/NavBar.css";

const Navbar: React.FC = () => {
  const isLoggedIn = useSelector((state: any) => state.session.loggedIn);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLoginLogout = () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      dispatch(logOut());
    }
  };

  const navigateToProductPage = () => {
    navigate("/products");
  };

  return (
    <nav style={styles.navbar}>
      <button style={styles.button} onClick={navigateToProductPage}>
        Products
      </button>
      <button style={styles.button} onClick={handleLoginLogout}>
        {isLoggedIn ? "Log Out" : "Log In"}
      </button>
    </nav>
  );
};

const styles = {
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "10px 20px",
    backgroundColor: "#333",
    color: "#fff",
  },
  button: {
    padding: "10px 15px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Navbar;
