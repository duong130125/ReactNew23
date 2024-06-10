import React from "react";
import "./Modal.css";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">
        <h2>Xác nhận xóa</h2>
        <p>Bạn có chắc chắn muốn xóa sinh viên này không?</p>
        <button onClick={onClose}>Hủy</button>
        <button onClick={onConfirm}>Xóa</button>
      </div>
    </div>
  );
};

export default Modal;
