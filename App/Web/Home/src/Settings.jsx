import useAuth from "./hooks/useAuth";
import Axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProfilePic from "./assets/dashboard/pfp.svg";
import { Sidebar } from "./Dashboard";

export default function Settings() {
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@email.com");
  const [role, setRole] = useState("user");
  const [updateName, setUpdateName] = useState("user");
  const [updateEmail, setUpdateEmail] = useState("user@email.com");
  const [image, setImage] = useState();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [picture, setPicture] = useState("");
  const [error, setError] = useState("");
  const [update, setUpdate] = useState(true);
  const [success, setSuccess] = useState("");
  const updateInfo = () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("email", updateEmail);
    formData.append("name", updateName);
    formData.append("password", password);
    formData.append("phone", phone);
    Axios.post("http://localhost:3000/auth/update", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
      .then((res) => {
        if (res.data.status) {
          setUpdate(!update);
          setSuccess("Your informations have been updated successfully!");
        } else {
          alert("errror!");
          setError(res.data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.type);
        setUpdateName(res.data.name);
        setUpdateEmail(res.data.email);
        setPicture(res.data.picture);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
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
          <div className="rounded-full bg-yellow-300 w-[100px] h-[100px] overflow-hidden">
            <img
              className="w-full h-auto align-bottom"
              src={picture ? `http://localhost:3000/${picture}` : ProfilePic}
              alt=""
            />
          </div>

          <motion.button
            whileTap={{ scale: 0.95 }}
            className=" bg-[#008de5] hover:bg-[#0184cb] py-2 text-white text-[12px] border-[1px] border-transparent rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
          >
            <input
              id="profilepic"
              onChange={(e) => {
                setImage(e.target.files[0]);
                console.log(image);
              }}
              className="size-0"
              type="file"
              name=""
            />
            <label
              className="h-full w-full py-2 px-16 hover:cursor-pointer"
              htmlFor="profilepic"
            >
              Change Profile Picture
            </label>
          </motion.button>
        </div>
        <div className="my-auto">
          <form autoComplete="false" onChange={() => setError("")}>
            <div className="flex pb-12 items-center justify-center gap-32">
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Full Name
                </label>
                <input
                  className="my-[8px] rounded-[8px] outline-none"
                  type="text"
                  placeholder="Name"
                  onChange={(e) => {
                    setUpdateName(e.target.value);
                  }}
                  value={updateName}
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Phone Number
                </label>
                <input
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  className="my-[8px] rounded-[8px] outline-none"
                  type="tel"
                  placeholder="+213xxxxxxxx"
                  pattern="[567][0-9]{8}"
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
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
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
                  onChange={(e) => {
                    setUpdateEmail(e.target.value);
                  }}
                  value={updateEmail}
                  placeholder="example@example.eg"
                  autoComplete="false"
                />
              </div>
              <div className="flex flex-col">
                <label className="text-sm font-bold text-slate-600" htmlFor="">
                  Confirm Email
                </label>
                <input
                  onChange={(e) => {
                    setConfirmEmail(e.target.value);
                  }}
                  className="my-[8px] rounded-[8px] outline-none"
                  type="email"
                  placeholder="example@example.eg"
                  autoComplete="false"
                />
              </div>
            </div>
            <div
              className={`flex ${
                success ? "text-green-400" : "text-red-800"
              } text-sm font-bold justify-center min-h-8`}
            >
              {success || error}
            </div>
            <div className="flex justify-center">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={(e) => {
                  e.preventDefault();
                  setError("");
                  setSuccess("");
                  if (
                    password === confirmPassword &&
                    updateEmail === confirmEmail
                  ) {
                    updateInfo();
                  } else if (password === confirmPassword) {
                    setError("Emails are not matching");
                  } else {
                    setError("Passwords are not matching");
                  }
                }}
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
