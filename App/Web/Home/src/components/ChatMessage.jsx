import { SiOpenai } from "react-icons/si";

export default function ChatMessage({ message, role }) {
  const roleIcon =
    role === "user" ? (
      <div className="rounded-full h-8 w-8 bg-blue-600 flex items-center justify-center font-semibold text-slate-300 shrink-0">
        M
      </div>
    ) : (
      <div className="rounded-full h-8 w-8 bg-green-500 flex items-center justify-center font-semibold text-slate-50 shrink-0">
        <SiOpenai />
      </div>
    );

  const roleName = role === "user" ? "Metwa77ad" : "Assistant";

  return (
    <div className="flex flex-row mx-2 my-4">
      {roleIcon}
      <div className="p-1 ml-2">
        <div className="flex-col">
          <p className="font-semibold text-black">{roleName}</p>
          <p className="text-black">{message}</p>
        </div>
      </div>
    </div>
  );
}
