import React, { useEffect, useState } from "react";
import "./StudentList.css";
import axios from "axios";
import Modal from "./Modal";
import FormModal from "./FormModal";

interface Students {
  id: number;
  name: string;
  email: string;
  address: string;
  phone: string;
  status: string;
  created_at: string;
}

export default function StudentList() {
  const [students, setStudents] = useState<Students[]>([]);
  const [typeSubmit, setTypeSubmit] = useState<string>("add");
  const [student, setStudent] = useState<Students>({
    id: Math.ceil(Math.random() * 1000000),
    name: "",
    email: "",
    address: "",
    phone: "",
    status: "",
    created_at: new Date().toISOString(),
  });
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [studentToDelete, setStudentToDelete] = useState<number | null>(null);
  const [isFormVisible, setIsFormVisible] = useState<boolean>(false);

  const loadData = () => {
    axios
      .get("http://localhost:8080/students")
      .then((res) => setStudents(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleDelete = (id: number) => {
    setIsModalOpen(true);
    setStudentToDelete(id);
  };

  const confirmDelete = () => {
    if (studentToDelete !== null) {
      axios
        .delete(`http://localhost:8080/students/${studentToDelete}`)
        .then((response) => {
          if (response.status === 200) {
            loadData();
          }
        })
        .catch((error) => console.log(error))
        .finally(() => {
          setIsModalOpen(false);
          setStudentToDelete(null);
        });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setStudent({
      ...student,
      [name]: value,
    });
  };

  const reset = () => {
    setStudent({
      id: Math.ceil(Math.random() * 1000000),
      name: "",
      email: "",
      address: "",
      phone: "",
      status: "",
      created_at: new Date().toISOString(),
    });
    setTypeSubmit("add");
    setIsFormVisible(false);
  };

  const validateForm = () => {
    const { name, email, phone } = student;
    if (!name || !email) {
      alert("Tên và Email không được để trống.");
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      alert("Email không đúng định dạng.");
      return false;
    }
    const phonePattern = /^\d+$/;
    if (!phonePattern.test(phone)) {
      alert("Số điện thoại chỉ được phép nhập số.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (typeSubmit === "add") {
      axios
        .post("http://localhost:8080/students", student, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 201) {
            loadData();
            reset();
          }
        })
        .catch((error) => console.log(error));
    } else {
      axios
        .put(`http://localhost:8080/students/${student.id}`, student, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          if (response.status === 200) {
            reset();
            loadData();
            setTypeSubmit("add");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  const handleGetInfo = (id: number) => {
    setTypeSubmit("update");

    axios
      .get(`http://localhost:8080/students/${id}`)
      .then((response) => {
        setStudent(response.data);
        setIsFormVisible(true);
      })
      .catch((error) => console.log(error));
  };

  const handleAddStudentClick = () => {
    reset();
    setIsFormVisible(true);
  };

  return (
    <>
      <div>
        <div className="container">
          <h2>Quản lý sinh viên</h2>
          <button onClick={handleAddStudentClick}>Thêm mới sinh viên</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Tên sinh viên</th>
              <th>Email</th>
              <th>Địa chỉ</th>
              <th>Số điện thoại</th>
              <th>Lựa chọn</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student: Students) => (
              <tr key={student.id}>
                <td>{student.name}</td>
                <td>{student.email}</td>
                <td>{student.address}</td>
                <td>{student.phone}</td>
                <td>
                  <button onClick={() => handleGetInfo(student.id)}>Sửa</button>
                  <button onClick={() => handleDelete(student.id)}>Xóa</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <FormModal
        isOpen={isFormVisible}
        onClose={() => setIsFormVisible(false)}
        onSubmit={handleSubmit}
        student={student}
        handleChange={handleChange}
        typeSubmit={typeSubmit}
      />
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
