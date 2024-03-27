import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
export default function Dashboard() {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/verify").then((res) => {
      if (res.data.status) {
        console.log(res.data.message);
      } else {
        navigate("/login");
      }
      console.log(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <div>Dashboard</div>;
}
