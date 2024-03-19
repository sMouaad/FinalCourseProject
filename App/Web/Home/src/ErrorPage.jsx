import Lottie from "lottie-react";
import animation from "./assets/error.json";
const ErrorPage = () => {
  return (
    <div className="py-10 border-4 border-primary shadow-inner shadow-green-400 px-4 h-screen flex flex-col justify-center items-center">
      <h1 className="font-Poppins text-center text-3xl">
        Oh no, this page does not exist!
      </h1>
      <Lottie className="h-4/5" size="" animationData={animation} />
    </div>
  );
};

export default ErrorPage;
