import { useEffect } from "react";
import brain from "./assets/cerveau_idea.png";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";

export default function Login() {
  useEffect(() => {
    const container = document.getElementById("container");
    const registerBtn = document.getElementById("register");
    const loginBtn = document.getElementById("login");

    // Add dynamic sign-up form
    registerBtn.addEventListener("click", () => {
      container.classList.add("active");
    });

    loginBtn.addEventListener("click", () => {
      container.classList.remove("active");
    });
  }, []);
  return (
    <div id="login-form">
      <div
        className="flex items-center bg-white container rounded-[30px] shadow-lg relative overflow-hidden w-[768px] max-w-full min-h-[480px]"
        id="container"
      >
        <div className="form-container left-0 w-1/2 opacity-0 z-[1] sign-up">
          <form className="bg-white flex items-center justify-center flex-col py-0 px-[40px] h-full">
            <h1 className="text-3xl font-bold">Create Account</h1>
            <div className="my-[20px] mx-0">
              <a
                className=" border-[1px] border-[#ccc] inline-flex justify-center items-center rounded-[20%] my-0 mx-[3px] w-[40px] h-[40px]
                text-[#333] text-[13px] no-underline mt-[15px] mb-[10px]"
                href="#"
              >
                <FaFacebook size={20} />
              </a>
              <a
                className=" border-[1px] border-[#ccc] inline-flex justify-center items-center rounded-[20%] my-0 mx-[3px] w-[40px] h-[40px]
                text-[#333] text-[13px] no-underline mt-[15px] mb-[10px]"
                href="#"
              >
                <AiFillGoogleCircle size={20} />
              </a>
            </div>
            <span className=" text-[12px]">
              or use your email for registration
            </span>
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              type="text"
              placeholder="Name"
            />
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              type="email"
              placeholder="e-mail"
            />
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              type="password"
              placeholder="Password"
            />
            <button className=" bg-[#00e5bd] text-white text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer">
              Sign Up
            </button>
          </form>
        </div>
        <div className="absolute top-0 h-full transition-all duration-[0.6s] ease-in-out left-0 w-1/2 z-[2] sign-in">
          <form className="bg-white flex items-center justify-center flex-col py-0 px-[40px] h-full">
            <h1 className="text-3xl font-bold">Sign In</h1>
            <div className="my-[20px] mx-0">
              <a
                className=" border-[1px] border-[#ccc] inline-flex justify-center items-center rounded-[20%] my-0 mx-[3px] w-[40px] h-[40px]
                text-[#333] text-[13px] no-underline mt-[15px] mb-[10px]"
                href="#"
              >
                <FaFacebook size={20} />
              </a>
              <a
                className=" border-[1px] border-[#ccc] inline-flex justify-center items-center rounded-[20%] my-0 mx-[3px] w-[40px] h-[40px]
                text-[#333] text-[13px] no-underline mt-[15px] mb-[10px]"
                href="#"
              >
                <AiFillGoogleCircle size={20} />
              </a>
            </div>
            <span className=" text-[12px]">or use your email password</span>
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              type="email"
              placeholder="Email"
            />
            <input
              className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
              type="password"
              placeholder="Password"
            />
            <a
              className="text-[#333] text-[13px] no-underline mt-[15px] mx-0 mb-[10px]"
              href="#"
            >
              Forget Your Password?
            </a>
            <button className=" bg-[#00e5bd] text-white text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer">
              Sign In
            </button>
          </form>
        </div>
        <div className="toggle-container border-t-0 border-b-0 absolute top-0 left-1/2 w-1/2 h-full overflow-hidden transition-all duration-[0.6s] ease-in-out border-y-[50px] border-x-0 z-[1000]">
          <div className="toggle bg-[#00e5bd] h-full text-white relative -left-full w-[200%] translate-x-0 transition-all duration-[0.6s] ease-in-out">
            <div className="absolute w-1/2 h-full flex items-center justify-center flex-col py-0 px-[30px] text-center top-0 transition-all duration-[0.6s] ease-in-out translate-x-[-200%] toggle-left">
              <h1 className="text-3xl font-bold">Welcome Back!</h1>
              <p className="text-[14px] tracking-[0.3px] leading-[20px] my-5 mx-0">
                Enter your personal details to use all of site features
              </p>
              <button
                className="bg-[#58cc02] text-white text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                id="login"
              >
                Sign In
              </button>
            </div>
            <div className="absolute w-1/2 h-full flex items-center justify-center flex-col py-0 px-[30px] text-center top-0 transition-all duration-[0.6s] ease-in-out right-0 translate-x-0">
              <img
                className="w-[200px] h-[200px]"
                src={brain}
                alt="Dhakira logo"
              />
              <h1 className="text-3xl font-bold">Dhakira</h1>
              <p className="text-[14px] tracking-[0.3px] leading-[20px] my-5 mx-0">
                Register with your personal details to use all of site features
              </p>
              <button
                className="toggle-right bg-[#58cc02] text-white text-[12px] py-[10px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                id="register"
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
