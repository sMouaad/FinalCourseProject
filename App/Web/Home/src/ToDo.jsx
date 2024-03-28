import { useEffect, useState } from "react";
import {
  BsFillCheckCircleFill,
  BsCircleFill,
  BsFillTrashFill,
} from "react-icons/bs";

function ToDo() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/todo/get")
      .then((response) => response.json())
      .then((data) => setTodos(data))
      .catch((err) => console.log(err));
  }, []);

  const handleEdit = (id) => {
    fetch(`http://localhost:3000/todo/update/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ done: true }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:3000/todo/delete/${id}`, {
      method: "DELETE",
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-center font-bold mb-4">TODAY</h1>
      <div className="w-full max-w-lg">
        {todos.length === 0 ? (
          <div className="text-center">
            <h2>NO RECORD</h2>
          </div>
        ) : (
          todos.map((todo) => (
            <div
              key={todo._id}
              className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded"
            >
              <div
                className="flex items-center"
                onClick={() => handleEdit(todo._id)}
              >
                {todo.done ? (
                  <BsFillCheckCircleFill className="mr-2 text-green-500" />
                ) : (
                  <BsCircleFill className="mr-2 text-gray-500" />
                )}
                <p className={todo.done ? "line-through" : ""}>{todo.task}</p>
              </div>
              <div>
                <BsFillTrashFill
                  className="cursor-pointer"
                  onClick={() => handleDelete(todo._id)}
                />
              </div>
            </div>
          ))
        )}
      </div>
      <Create />
    </div>
  );
}

const Create = () => {
  const [task, setTask] = useState("");

  const handleAdd = () => {
    fetch("http://localhost:3000/todo/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task: task }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        location.reload();
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="border-2 bg-white border-green-400 rounded-xl p-2 flex flex-row m-2 h-20 w-90">
      <input
        className="rounded-xl w-full focus:outline-none"
        type="text"
        placeholder="enter task"
        onChange={(e) => setTask(e.target.value)}
      />
      <button type="button" onClick={handleAdd}>
        ADD
      </button>
    </div>
  );
};

export default ToDo;
