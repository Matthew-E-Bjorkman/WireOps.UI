import React from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import {
  updateSelectedProduct,
  useAddProductMutation,
} from "../../../store/productSlice.tsx";
import Alert from "react-bootstrap/esm/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../store/store.tsx";

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [addProduct] = useAddProductMutation();
  const product = useSelector(
    (state: AppRootState) => state.product.selectedProduct
  );
  const dispatch = useDispatch();
  let error;

  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Form
        onSubmit={async (event) => {
          addProduct(product).then((result) => {
            if ("error" in result) {
              error = result.error;
              return;
            }
            onClose();
          });

          event.preventDefault();
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Add a New Product
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="formBasicDetails">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product name"
              value={product.name}
              onChange={(e) =>
                dispatch(
                  updateSelectedProduct({ ...product, name: e.target.value })
                )
              }
            />
            <Form.Label>SKU</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter product sku"
              value={product.sku}
              onChange={(e) =>
                dispatch(
                  updateSelectedProduct({ ...product, sku: e.target.value })
                )
              }
            />
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter product description"
              value={product.description}
              onChange={(e) =>
                dispatch(
                  updateSelectedProduct({
                    ...product,
                    description: e.target.value,
                  })
                )
              }
            />
          </Form.Group>
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
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={onClose} className="btn btn-danger">
            Cancel
          </Button>
          <Button className="btn btn-primary" type="submit">
            Save
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddProductModal;
