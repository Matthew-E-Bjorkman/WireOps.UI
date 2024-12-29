import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Table from "react-bootstrap/esm/Table";
import Placeholder from "react-bootstrap/esm/Placeholder";
import Alert from "react-bootstrap/esm/Alert";
import {
  setShowCreateModal,
  setShowEditModal,
  updateSelectedProduct,
  useGetProductListQuery,
} from "../../../store/productSlice.tsx";
import React from "react";
import { Product } from "../../../types/Product";
import { useDispatch, useSelector } from "react-redux";
import AddProductModal from "../AddProductModal/AddProductModal.tsx";
import { AppRootState } from "../../../store/store.tsx";
import EditProductModal from "../EditProductModal/EditProductModal.tsx";

export default function ProductGrid() {
  const { data: products, error, isLoading } = useGetProductListQuery();
  const showCreateModal = useSelector(
    (state: AppRootState) => state.product.showCreateModal
  );
  const showEditModal = useSelector(
    (state: AppRootState) => state.product.showEditModal
  );
  const dispatch = useDispatch();

  return (
    <>
      <Row>
        <Col xs={6}>
          <h1>Products</h1>
        </Col>
        <Col xs={6} className="text-end mt-2 mb-2">
          <Button
            variant="primary"
            onClick={() => dispatch(setShowCreateModal(true))}
          >
            Add Product
          </Button>
        </Col>
      </Row>
      <Row>
        {error && (
          <Alert className="alert alert-danger" role="alert">
            Error:{" "}
            {String(
              ("status" in error && error.status) ||
                ("data" in error && error.data) ||
                "Unknown error"
            )}
          </Alert>
        )}
      </Row>
      <Table bordered hover>
        <ProductHeader />
        <tbody>
          {isLoading && <ProductRowPlaceholder />}
          {products?.map((product) => (
            <ProductRow product={product} />
          ))}
        </tbody>
      </Table>

      <AddProductModal
        isOpen={showCreateModal}
        onClose={() => dispatch(setShowCreateModal(false))}
      />

      <EditProductModal
        isOpen={showEditModal}
        onClose={() => dispatch(setShowEditModal(false))}
      />
    </>
  );
}

interface ProductRowProps {
  product: Product;
}

export function ProductHeader() {
  return (
    <thead>
      <tr key={"header"}>
        <th>Name</th>
        <th>SKU</th>
        <th>Description</th>
        <th>Actions</th>
      </tr>
    </thead>
  );
}

export function ProductRowPlaceholder() {
  return (
    <Placeholder as="tr" animation="glow" id="product-row-placeholder">
      <Placeholder as="td" xs={12}>
        Loading...
      </Placeholder>
    </Placeholder>
  );
}

export function ProductRow({ product }: ProductRowProps) {
  function onEdit(product: Product) {
    dispatch(updateSelectedProduct(product));
    dispatch(setShowEditModal(true));
  }

  const dispatch = useDispatch();

  return (
    <tr key={product.id}>
      <td>{product.name}</td>
      <td>{product.sku}</td>
      <td>{product.description}</td>
      <td>
        <Button variant="primary" onClick={() => onEdit(product)}>
          Edit
        </Button>
      </td>
    </tr>
  );
}
