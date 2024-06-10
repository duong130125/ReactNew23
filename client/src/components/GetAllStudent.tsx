import axios from "axios";
import { useEffect } from "react";

export default function GetAllStudent() {
  useEffect(() => {
    axios
      .get(" http://localhost:8080/students")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  }, []);
  return <div>GetAllStudent</div>;
}
