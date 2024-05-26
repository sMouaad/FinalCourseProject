import useAuth from "./hooks/useAuth";
import Axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import airplane from "./assets/dashboard/airplane.svg";
import { Sidebar } from "./Dashboard";

export default function Support() {
  const [email, setEmail] = useState("user@email.com");
  const [role, setRole] = useState("user");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setEmail(res.data.email);
        setRole(res.data.type);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const sendMessage = () => {
    Axios.post("http://localhost:3000/auth/support", {
      email,
      message,
      subject,
    }).then((res) => {
      if (res.data.status) {
        alert("success");
      } else {
        setError(res.data.message);
      }
    });
  };
  const { setAuth } = useAuth();
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <Sidebar setAuth={setAuth} role={role} />
      <section className="bg-slate-100 flex-[6] flex justify-center flex-col gap-8 p-8">
        <div className="font-bold text-lg">Your message</div>
        <input
          onChange={(e) => {
            if (error) setError("");
            setSubject(e.target.value);
          }}
          className="rounded-md"
          type="text"
          placeholder="Message Subject"
          name=""
          id=""
        />
        <textarea
          onChange={(e) => {
            if (error) setError("");
            setMessage(e.target.value);
          }}
          className="rounded-md"
          name=""
          placeholder="A description of your issue..."
          id=""
          cols="30"
          rows="10"
        ></textarea>
        <div className="">
          <motion.button
            onClick={() => {
              if (message && subject) sendMessage();
              else setError("Fill all the fields...");
            }}
            whileTap={{ scale: 0.95 }}
            className="flex gap-3 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-[12px] border-[1px] px-4 border-transparent min-h-12 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
          >
            <img className="h-7" src={airplane} alt="" />
            Send Message
          </motion.button>
        </div>
        <div className="px-2 text-smt text-red-800">{error}</div>
        <div className="mt-auto mx-auto text-slate-600">
          We will send you a response to your email as quickly as possible
          shortly after sending your message.
        </div>
      </section>
    </div>
  );
}
