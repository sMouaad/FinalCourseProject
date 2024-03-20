import Lottie from "lottie-react";
import animation from "../assets/brain-loading.json";
export default function Loading() {
  return (
    <div className="text-center">
      <Lottie className="brain-loading" animationData={animation} />
    </div>
  );
}
