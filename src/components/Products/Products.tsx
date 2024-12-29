import React from "react";
import Container from "react-bootstrap/esm/Container";
import ProductGrid from "./ProductGrid/ProductGrid.tsx";

export default function Products() {
  return (
    <Container className="mt-4">
      <ProductGrid />
    </Container>
  );
}
