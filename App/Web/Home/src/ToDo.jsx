import { useEffect, useState } from "react";
import { BsFillCheckCircleFill, BsCircleFill } from "react-icons/bs";
import Sidebar from "./Sidebar";
import { useParams } from "react-router-dom";
import Axios from "axios";

export default function ToDo() {
  const [todos, setTodos] = useState([]);
  const { patientId } = useParams();
  const [update, setUpdate] = useState(false);
  const handleCheck = (taskId) => {
    Axios.post(`http://localhost:3000/auth/check/`, { taskId, patientId }).then(
      (res) => {
        console.log(res);
        if (res.data.status) {
          setUpdate(!update);
        }
      }
    );
  };
  useEffect(() => {
    Axios.get(`http://localhost:3000/auth/get/${patientId}`).then((res) => {
      if (res.data.status) {
        setTodos(res.data.instructions);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [update]);
  return (
    <>
      <Sidebar patientId={patientId} />
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="w-full max-w-lg">
          {todos.length === 0 ? (
            <div className="text-center">
              <h2>NO TASKS ASSIGNED BY THE DOCTOR YET.</h2>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className="flex items-center justify-between bg-gray-100 p-2 mb-2 rounded"
              >
                <div className="flex items-center">
                  {todo.done ? (
                    <BsFillCheckCircleFill
                      onClick={() => {
                        handleCheck(todo._id);
                      }}
                      className="mr-2 text-green-500"
                    />
                  ) : (
                    <BsCircleFill
                      onClick={() => {
                        handleCheck(todo._id);
                      }}
                      className="mr-2 hover:cursor-pointer text-gray-500"
                    />
                  )}
                  <p className={todo.done ? "line-through" : null}>
                    {todo.task}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
}
