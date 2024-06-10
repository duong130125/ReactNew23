import axios from "axios";
import { useEffect } from "react";

export default function GetStudentId() {
  useEffect(() => {
    axios
      .get("http://localhost:8080/students/5")
      .then((response) => {
        if (response.data) {
          console.log(response.data);
        } else {
          console.log("Không tìm thấy bản ghi");
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 404) {
          console.log("Không tìm thấy bản ghi");
        } else {
          console.error("Đã có lỗi xảy ra:", error);
        }
      });
  }, []);
  return <div>GetStudentId</div>;
}
