import React from "react";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import LogoutButton from "../LogoutButton/LogoutButton.tsx";
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

  return (
    <Navbar bg="info" data-bs-theme="light">
      <Container>
        <Navbar.Brand>WireOps</Navbar.Brand>
        <Nav>
          <Nav.Link onClick={navigateToProductPage}>Products</Nav.Link>
        </Nav>
        <Navbar.Collapse className="justify-content-end px-4">
          {isAuthenticated && (
            <Nav.Item>
              <LogoutButton />
            </Nav.Item>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default SiteNavBar;
