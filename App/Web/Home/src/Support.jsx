import useAuth from "./hooks/useAuth";
import Axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import message from "./assets/dashboard/airplane.svg";
import { Sidebar } from "./Dashboard";

export default function Support() {
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
      <section className="bg-slate-100 flex-[6] flex justify-center flex-col gap-8 p-8">
        <div className="font-bold text-lg">Your message</div>
        <input
          className="rounded-md"
          type="text"
          placeholder="Message Subject"
          name=""
          id=""
        />
        <textarea
          className="rounded-md"
          name=""
          placeholder="A description of your issue..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div className="">
          <motion.button
            whileTap={{ scale: 0.95 }}
            className="flex gap-3 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-[12px] border-[1px] px-4 border-transparent min-h-12 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
          >
            <img className="h-7" src={message} alt="" srcSet="" />
            Send Message
          </motion.button>
        </div>
        <div className="mt-auto mx-auto text-slate-600">
          We will send you a response to your email as quickly as possible
          shortly after sending your message.
        </div>
      </section>
    </div>
  );
}
