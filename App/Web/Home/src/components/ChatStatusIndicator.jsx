import { SiOpenai } from "react-icons/si";

// eslint-disable-next-line react/prop-types
export default function ChatStatusIndicator({ status }) {
  return (
    <div className="flex justify-center">
      <div className="flex flex-row items-center font-Poppins text-green-800">
        <div className="m-2 animate-spin">
          <SiOpenai />
        </div>
        <div>{status}</div>
      </div>
    </div>
  );
}
