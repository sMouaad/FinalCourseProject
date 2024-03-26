import { FaArrowLeft } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { token } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post(`http://localhost:3000/auth/reset-password/${token}`, {
      password,
    })
      .then((res) => {
        if (res.data.status) {
          alert("Email reset with success");
          navigate("/login");
        }
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="flex h-screen bg-[#f0f2f5] items-center justify-center">
      <div className="relative flex flex-col w-[768px] bg-white shadow-lg max-w-full min-h-[480px] rounded-[30px]">
        <Link
          className="flex absolute items-center left-8 text-slate-700 hover:text-green-400 transition-all ease-linear top-8 gap-2 cursor-pointer h-fit"
          to="/login"
        >
          <FaArrowLeft /> Go back
        </Link>
        <div className="flex gap-12 flex-col my-auto h-full justify-center items-center">
          <div>
            <h1 className="text-3xl font-bold">Reset Your Password</h1>
          </div>
          <form id="forget" action="" onSubmit={handleSubmit}>
            <label htmlFor="password">New Password:</label>
            <input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              id="password"
              type="password"
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              placeholder="•••••••••••••"
            />
            <div className="flex justify-center">
              <button
                form="forget"
                type="submit"
                className=" bg-[#00e5bd] text-white text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
              >
                Send
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
