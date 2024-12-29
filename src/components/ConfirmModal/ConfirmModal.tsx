import React from "react";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import Alert from "react-bootstrap/esm/Alert";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  callback: (boolean) => void;
  action: string;
  objectName: string;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  callback,
  action,
  objectName,
}) => {
  return (
    <Modal
      show={isOpen}
      onHide={onClose}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">Confirm</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Alert variant="info">
          Are you sure you want to {action} <strong>{objectName}</strong>?
        </Alert>
      </Modal.Body>
      <Modal.Footer>
        <Button
          variant="danger"
          onClick={(e) => {
            callback(false);
            onClose();
          }}
        >
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={(e) => {
            callback(true);
            onClose();
          }}
        >
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmModal;
