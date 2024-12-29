import React from "react";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";
import Modal from "react-bootstrap/esm/Modal";
import {
  useEditProductMutation,
  useDeleteProductMutation,
  updateSelectedProduct,
  setShowConfirmModal,
} from "../../../store/productSlice.tsx";
import Alert from "react-bootstrap/esm/Alert";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../../store/store.tsx";
import ConfirmModal from "../../ConfirmModal/ConfirmModal.tsx";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
}) => {
  const [editProduct] = useEditProductMutation();
  const [deleteProduct] = useDeleteProductMutation();
  const product = useSelector(
    (state: AppRootState) => state.product.selectedProduct
  );
  const showConfirmModal = useSelector(
    (state: AppRootState) => state.product.showConfirmModal
  );
  const dispatch = useDispatch();
  let error;

  return (
    <>
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
            editProduct(product).then((result) => {
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
              Edit Product
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formBasicEmail">
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
                type="textarea"
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
          <Modal.Footer className="justify-content-between">
            <Button
              onClick={() => dispatch(setShowConfirmModal(true))}
              className="btn btn-danger mr-auto"
            >
              Delete
            </Button>
            <div className="">
              <Button onClick={onClose} className="btn btn-warning mx-2">
                Cancel
              </Button>
              <Button className="btn btn-primary" type="submit">
                Save
              </Button>
            </div>
          </Modal.Footer>
        </Form>
      </Modal>

      <ConfirmModal
        isOpen={showConfirmModal}
        onClose={() => dispatch(setShowConfirmModal(false))}
        callback={(confirmed) => {
          if (confirmed) {
            deleteProduct(product.id).then((result) => {
              if ("error" in result) {
                error = result.error;
                return;
              }
              onClose();
            });
          }
        }}
        action="delete"
        objectName={product.name}
      ></ConfirmModal>
    </>
  );
};

export default EditProductModal;
