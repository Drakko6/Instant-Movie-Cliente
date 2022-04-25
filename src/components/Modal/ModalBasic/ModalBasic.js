import React from "react";
import "./ModalBasic.scss";
import { Modal } from "semantic-ui-react";

export default function ModalBasic({ size, show, setShow, title, children }) {
  const onClose = () => {
    setShow(false);
  };

  return (
    <div>
      <Modal size={size} open={show} onClose={onClose} className="modal-basic">
        {title && <Modal.Header> {title}</Modal.Header>}
        {children}
      </Modal>
    </div>
  );
}
