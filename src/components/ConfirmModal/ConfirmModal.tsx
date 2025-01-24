import React from "react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  callback: (arg0: boolean) => void;
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
  return <div></div>;
};

export default ConfirmModal;
