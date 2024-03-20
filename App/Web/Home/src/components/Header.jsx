export default function Header({ onNewChat }) {
  return (
    <div className="flex flex-row p-4 bg-slate-500 rounded-xl my-4">
      <p className="text-3xl font-Poppins text-slate-200 font-semibold grow">
        GPT<span className="text-Chat">Dhakira</span>
      </p>
      <button
        className="bg-green-500 transition-all hover:bg-green-600 text-white py-2 px-4 font-Poppins rounded"
        onClick={onNewChat}
      >
        New chat
      </button>
    </div>
  );
}
