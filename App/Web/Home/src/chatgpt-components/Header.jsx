export default function Header({ onNewChat }) {
  return (
    <div className="flex flex-row p-4 bg-slate-500 rounded-xl my-4">
      <p className="text-3xl text-slate-200 font-semibold grow">
        GPT<span className="text-Chat">Dhakira</span>
      </p>
      <button
        className="bg-green-500 transition-all hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        onClick={onNewChat}
      >
        New chat
      </button>
    </div>
  );
}
