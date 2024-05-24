import useAuth from "./hooks/useAuth";
import { Link } from "react-router-dom";
import Axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Dropdown } from "./Sidebar";
import ProfilePic from "./assets/dashboard/pfp.svg";
import { Sidebar } from "./Dashboard";

export default function Settings() {
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@email.com");
  const [role, setRole] = useState("user");
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.type);
      }
      console.log(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { setAuth } = useAuth();
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <Sidebar setAuth={setAuth} role={role} />
      <section className="bg-slate-100 flex-[6] flex  flex-col">
        <div className="flex shadow-lg bg-white flex-col items-center py-4 pt-8 justify-center min-h-1/6 gap-5">
          <h1 className=" font-bold text-2xl">{name}</h1>
          <div className="text-md flex flex-col justify-center items-center">
            <p className="text-slate-600">&#40;{email}&#41;</p>
          </div>
          <img className="bg-yellow-300 rounded-full" src={ProfilePic} alt="" />

          <motion.button
            whileTap={{ scale: 0.95 }}
            className=" bg-[#008de5] hover:bg-[#0184cb] py-2 text-white text-[12px] border-[1px] border-transparent rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
          >
            <input id="profilepic" className="size-0" type="file" name="" />
            <label
              className="h-full w-full py-2 px-16 hover:cursor-pointer"
              htmlFor="profilepic"
            >
              Change Profile Picture
            </label>
          </motion.button>
        </div>
        <div className="my-auto">
          <form autoComplete="false">
            <div className="flex pb-12 items-center justify-center gap-32">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Full Name
                </label>
                <input
                  className="my-[8px] rounded-[8px] outline-none"
                  type="text"
                  placeholder="Name"
                  value={name}
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Phone Number
                </label>
                <input
                  className="my-[8px] rounded-[8px] outline-none"
                  type="tel"
                  placeholder="+213xxxxxxxx"
                  autoComplete="false"
                />
              </div>
            </div>
            <div className="flex pb-12 items-center justify-center gap-32">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Password
                </label>
                <input
                  className="my-[8px] rounded-[8px] outline-none"
                  type="password"
                  placeholder="••••••••••"
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col">
                <label
                  className="text-sm font-bold text-slate-600 gap-32"
                  htmlFor=""
                >
                  Confirm Password
                </label>
                <input
                  className="my-[8px] rounded-[8px] outline-none"
                  type="password"
                  autoComplete="false"
                  placeholder="••••••••••"
                />
              </div>
            </div>
            <div className="flex pb-12 items-center justify-center gap-32">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Email
                </label>
                <input
                  className="my-[8px] rounded-[8px] outline-none"
                  type="email"
                  value={email}
                  placeholder="example@example.eg"
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Confirm Email
                </label>
                <input
                  className="my-[8px] rounded-[8px] outline-none"
                  type="email"
                  placeholder="example@example.eg"
                  autoComplete="false"
                />
              </div>
            </div>
            <div className="flex justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                className=" bg-emerald-500 hover:bg-emerald-600 text-white text-[12px] border-[1px] px-4 border-transparent min-h-12 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
              >
                Update Info
              </motion.button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
