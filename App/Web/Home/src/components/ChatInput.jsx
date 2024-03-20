/* eslint-disable react/prop-types */
import { MdSend } from "react-icons/md";
import { useState } from "react";

export default function ChatInput({ disabled, onSend }) {
  const [message, setMessage] = useState("");
  return (
    <form
      className="border-2 bg-white border-green-400 rounded-lg p-2 flex flex-row m-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSend(message);
        setMessage("");
      }}
      autoComplete="off"
    >
      <input
        name="message"
        placeholder="Start talking with me!"
        className="w-full focus:outline-none "
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        disabled={disabled}
        className="bg-Chat transition-all font-bold py-2 px-4 rounded hover:bg-green-400 disabled:bg-green-800 disabled:text-slate-400"
      >
        <MdSend />
      </button>
    </form>
  );
}
