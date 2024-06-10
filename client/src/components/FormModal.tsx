import React from "react";
import "./FormModal.css";

interface Students {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  created_at: string;
}

interface FormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  student: Students;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  typeSubmit: string;
}

const FormModal: React.FC<FormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  student,
  handleChange,
  typeSubmit,
}) => {
  if (!isOpen) return null;

  return (
    <div className="form-modal-overlay">
      <div className="form-modal">
        <h3>{typeSubmit === "add" ? "Thêm mới" : "Cập nhật"} sinh viên</h3>
        <form onSubmit={onSubmit}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              value={student.name}
              onChange={handleChange}
              name="name"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={student.email}
              onChange={handleChange}
              name="email"
              type="email"
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              value={student.address}
              onChange={handleChange}
              name="address"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="phone">Phone</label>
            <input
              value={student.phone}
              onChange={handleChange}
              name="phone"
              type="text"
            />
          </div>
          <button type="submit">
            {typeSubmit === "add" ? "Thêm mới" : "Cập nhật"}
          </button>
          <button type="button" onClick={onClose}>
            Hủy
          </button>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
