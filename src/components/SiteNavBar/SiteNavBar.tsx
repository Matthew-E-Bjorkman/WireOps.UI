import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logOut } from "../../store/sessionSlice.tsx";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const SiteNavBar: React.FC = () => {
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
    <Navbar bg="info" data-bs-theme="light">
      <Container>
        <Navbar.Brand>WireOps</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={navigateToProductPage}>Products</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end">
          <Nav.Link onClick={handleLoginLogout}>
            {isLoggedIn ? "Signed in as: *Account Name*" : "Login"}
          </Nav.Link>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavBar;
