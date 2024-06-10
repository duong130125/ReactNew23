import axios from "axios";
import { useEffect } from "react";

export default function UpdateStudentId() {
  useEffect(() => {
    let updateStudent = {
      name: "Pham Thi Q",
      email: "phamthiq@example.com",
      address: "888 JKL Vt, Hanoi",
      phone: "0909997755",
      status: "inactive",
      created_at: "2000-17-06",
    };
    axios
      .put("http://localhost:8080/students/7", updateStudent)
      .then((response) => console.log(response.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>UpdateStudentId</div>;
}
