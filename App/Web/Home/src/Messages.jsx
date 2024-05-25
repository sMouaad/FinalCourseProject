import useAuth from "./hooks/useAuth";
import Axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProfilePic from "./assets/dashboard/pfp.svg";
import { Sidebar } from "./Dashboard";

export default function Messages() {
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@email.com");
  const [role, setRole] = useState("user");
  const [picture, setPicture] = useState("");

  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.type);
        setPicture(res.data.picture);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { setAuth } = useAuth();
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <Sidebar setAuth={setAuth} role={role} />
      <section className="bg-slate-100 flex-[6] flex  flex-col">
        <div>test</div>
      </section>
    </div>
  );
}
