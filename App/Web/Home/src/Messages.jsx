import useAuth from "./hooks/useAuth";
import Axios from "axios";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animation from "./assets/search.json";
import messageanimation from "./assets/bloom-messaging.json";
import { useEffect, useRef, useState } from "react";
import airplane from "./assets/dashboard/airplane.svg";
import { Sidebar } from "./Dashboard";

export default function Messages() {
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@email.com");
  const [role, setRole] = useState("user");
  const [currentMessage, setCurrentMessage] = useState("");
  const [picture, setPicture] = useState("");
  const [patients, setPrimaryPatients] = useState([]);
  const [secondaryPatients, setSecondaryPatients] = useState([]);
  const [thread, setThread] = useState("");
  const [threadName, setThreadName] = useState("");
  const lastMessage = useRef(null);
  const { setAuth } = useAuth();
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.type);
        setPicture(res.data.picture);
        setPrimaryPatients(res.data.patientsCreated);
        setSecondaryPatients(res.data.secondaryPatients);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    lastMessage.current?.scrollIntoView({ behavior: "smooth" });
  }, [thread]);
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <Sidebar setAuth={setAuth} role={role} />
      <div className="bg-slate-100 flex flex-1 p-4 gap-4 max-h-full">
        <div className="flex flex-col rounded-md  max-h-full min-h-full h-full bg-white shadow-xl flex-[2]">
          <div className="flex justify-between shadow-sm p-4 text-lg">
            <div>Conversation</div>
            <div className="font-bold tracking-widest">{threadName}</div>
            <div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;
            </div>
          </div>
          <div
            className={`flex ${
              !thread
                ? "items-center justify-center"
                : "flex-col h-full overflow-y-scroll overflow-x-hidden p-2 gap-2"
            }`}
          >
            {!thread ? (
              <Lottie className="w-1/2" animationData={messageanimation} />
            ) : (
              <>
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <Message thread={thread} />
                <div className="border-none size-0" ref={lastMessage}></div>
              </>
            )}
          </div>
          <div className="transition-all ease-linear flex items-center gap-2 p-4 border-t-2 border-slate-200 mt-auto w-full self-center">
            <input
              placeholder="Aa"
              onChange={(e) => {
                setCurrentMessage(e.target.value);
              }}
              className="border-none rounded-full w-full bg-slate-200"
              type="text"
            />
            <motion.button
              whileTap={{ scale: 0.95 }}
              className={` flex gap-3 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-[12px] border-[1px] px-4 border-transparent py-1 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100 ${
                !currentMessage ? "pt-0 pr-0 pl-0 pb-0 border-none w-0" : null
              }`}
            >
              <img className="h-7" src={airplane} alt="" />
            </motion.button>
          </div>
        </div>
        <div className="rounded-md px-2 bg-white shadow-xl flex-1 ">
          <table className="w-full h-full  border-collapse">
            <thead>
              <th className="block text-start py-4 border-none text-2xl font-bold">
                Patients
              </th>
            </thead>
            {patients.length === 0 && secondaryPatients.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-2xl mt-8">
                <Lottie className="h-96 mb-8" animationData={animation} />
                <div className="text-slate-800">No conversations yet...</div>
                <div className="text-sm text-slate-600">
                  Try creating patients and inviting other assistants / doctor.
                </div>
              </div>
            ) : null}
            <tbody className="overflow-y-auto flex flex-col h-full ">
              {patients.length !== 0 ? (
                <div className="flex text-center mb-4">
                  <div className="flex-1 border-b-2 border-blue-200 rounded-l-lg"></div>
                  <div className="font-Poppins font-light">Your Groups</div>
                  <div className="flex-1 border-b-2 border-blue-200 rounded-r-lg"></div>
                </div>
              ) : null}
              {patients.map((element) => {
                return (
                  <>
                    <Thread
                      element={element}
                      thread={thread}
                      setThread={setThread}
                      setThreadName={setThreadName}
                    />
                  </>
                );
              })}
              {secondaryPatients.length !== 0 ? (
                <div className="flex text-center mt-4 mb-4">
                  <div className="flex-1 border-b-2 border-blue-200 rounded-l-lg"></div>
                  <div className="font-Poppins font-light">
                    Secondary Groups
                  </div>
                  <div className="flex-1 border-b-2 border-blue-200 rounded-r-lg"></div>
                </div>
              ) : null}
              {secondaryPatients.map((element) => {
                return (
                  <>
                    <Thread
                      element={element}
                      thread={thread}
                      setThread={setThread}
                      setThreadName={setThreadName}
                    />
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function Thread({ element, thread, setThread, setThreadName }) {
  return (
    <tr
      className={`border-none flex-none h-16 ${
        thread === element._id ? null : "hover:bg-slate-50"
      } ${
        thread === element._id ? "bg-slate-100" : null
      } rounded-md hover:cursor-pointer transition-all`}
    >
      <td
        style={{ padding: 0 }}
        className="border-none block text-lg rounded-md  ease-linear h-16"
      >
        <label
          htmlFor={element._id}
          className="flex justify-between items-center px-2  hover:cursor-pointer w-full h-full"
        >
          {element.name}
          <div className="w-12 h-12 border-2 overflow-hidden rounded-full mr-2">
            <img src={`http://localhost:3000/${element.primaryImage}`} alt="" />
          </div>
        </label>
      </td>
      <input
        id={element._id}
        type="radio"
        className="size-0 border-none outline-none opacity-0"
        name="patient"
        value={element._id}
        onChange={(e) => {
          setThread(e.target.value);
          setThreadName(element.name);
        }}
      />
    </tr>
  );
}

function Message({ thread, message, profilepic }) {
  return (
    <>
      <div className="">
        <div className="relative left-16 text-slate-600 text-sm top-1">
          User
        </div>
        <div className="flex items-end gap-2">
          <UserPicture profilepic={profilepic} />
          <div className="bg-slate-100 rounded-full p-2">message</div>
        </div>
      </div>
    </>
  );
}
function UserPicture({ profilepic }) {
  return (
    <div className="overflow-hidden border-slate-400 border-2 bg-slate-200 rounded-full w-12 h-12">
      <img src={profilepic} alt="" />
    </div>
  );
}
