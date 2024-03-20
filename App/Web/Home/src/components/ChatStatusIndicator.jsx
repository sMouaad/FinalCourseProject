import { SiOpenai } from "react-icons/si";

export default function ChatStatusIndicator({ status }) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center text-green-300">
        <div className="m-2 animate-spin">
          <SiOpenai />
        </div>
        <div>{status}</div>
      </div>
    </div>
  );
}
