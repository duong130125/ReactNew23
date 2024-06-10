import axios from "axios";
import { useEffect } from "react";

export default function CreateStudent() {
  useEffect(() => {
    let newStudent = {
      name: "Pham Thi L",
      email: "phamthil@example.com",
      address: "107 JKL St, Hanoi",
      phone: "0904567777",
      status: "inactive",
      created_at: "2020-11-07",
    };
    axios
      .post("http://localhost:8080/students", newStudent)
      .then((response) => {
        console.log("Đã thêm sinh viên thành công:", response.data);
      })
      .catch((error) => {
        console.error("Đã có lỗi xảy ra khi thêm sinh viên:", error);
      });
  });
  return <div>CreateStudent</div>;
}
