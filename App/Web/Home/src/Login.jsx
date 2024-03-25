import { useEffect } from "react";
import brain from "./assets/cerveau_idea.png";
import { FaFacebook } from "react-icons/fa";
import { AiFillGoogleCircle } from "react-icons/ai";
import "./styles/LOGIN.css";

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
    <div className="container" id="container">
      <div className="form-container sign-up">
        <form>
          <h1 className="text-3xl font-bold">Create Account</h1>
          <div className="social-icons">
            <a href="#">
              <FaFacebook size={20} />
            </a>
            <a href="#">
              <AiFillGoogleCircle size={20} />
            </a>
          </div>
          <span>or use your email for registration</span>
          <input type="text" placeholder="Name" />
          <input type="email" placeholder="e-mail" />
          <input type="password" placeholder="Password" />
          <button>Sign Up</button>
        </form>
      </div>
      <div className="form-container sign-in">
        <form>
          <h1 className="text-3xl font-bold">Sign In</h1>
          <div className="social-icons">
            <a href="#">
              <FaFacebook size={20} />
            </a>
            <a href="#">
              <AiFillGoogleCircle size={20} />
            </a>
          </div>
          <span>or use your email password</span>
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <a href="#">Forget Your Password?</a>
          <button>Sign In</button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1 className="text-3xl font-bold">Welcome Back!</h1>
            <p>Enter your personal details to use all of site features</p>
            <button className="hiddened" id="login">
              Sign In
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <img src={brain} alt="Dhakira logo" />
            <h1 className="text-3xl font-bold">Dhakira</h1>
            <p>
              Register with your personal details to use all of site features
            </p>
            <button className="hiddened" id="register">
              Sign Up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
