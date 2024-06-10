import axios from "axios";
import { useEffect } from "react";

export default function RemoveStudentId() {
  useEffect(() => {
    axios
      .delete("http://localhost:8080/students/5")
      .then((response) => {
        console.log("Đã xóa thành công:", response.data);
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("Không tìm thấy bản ghi để xóa");
        } else {
          console.error("Đã có lỗi xảy ra:", error);
        }
      });
  });
  return <div>RemoveStudentId</div>;
}
