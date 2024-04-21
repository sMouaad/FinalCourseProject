/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Modal from "./components/Modal/index";
import Assistance from "./assets/dashboard/assistance.svg";
import { MdDashboard } from "react-icons/md";
import Home from "./assets/dashboard/home.svg";
import Community from "./assets/dashboard/community.svg";
import ProfilePic from "./assets/dashboard/pfp.svg";
import History from "./assets/dashboard/history.svg";
import Message from "./assets/dashboard/message.svg";
import Privacy from "./assets/dashboard/privacy.svg";
import Profile from "./assets/dashboard/profile.svg";
import Settings from "./assets/dashboard/settings.svg";
import Support from "./assets/dashboard/support.svg";
export default function Dashboard() {
  const [modalAssistantOpen, setAssistantModalOpen] = useState(false);
  const [modalDoctorOpen, setDoctorModalOpen] = useState(false);
  const [modalDeleteOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmation, setDelete] = useState("");
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@email.com");
  const [assistantEmail, setAssistantEmail] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const closeAssistant = () => setAssistantModalOpen(false);
  const openAssistant = () => setAssistantModalOpen(true);
  const closeDoctor = () => setDoctorModalOpen(false);
  const openDoctor = () => setDoctorModalOpen(true);
  const closeDelete = () => setDeleteModalOpen(false);
  const openDelete = () => setDeleteModalOpen(true);
  // Axios.defaults.withCredentials = true;
  // const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/verify").then((res) => {
      if (res.data.status) {
        setName(res.data.name);
        setEmail(res.data.email);
      }
      console.log(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <Sidebar />
      <section className="flex-[6] flex flex-col">
        <nav className="grid-rows-2 px-12 py-4 gap-4 shadow-lg z-[2] grid">
          <div className="items-center justify-between gap-12 flex">
            <div className="flex shrink gap-4 basis-[75%]">
              <div className="items-center flex">
                <img className="h-[20px]" src="assets/search.svg" alt="" />
              </div>
            </div>
            <div className="pr-4 items-center gap-6 flex">
              <img className="h-[25px] button" src="assets/bell.svg" alt="" />
              <img
                className="bg-yellow-300 rounded-full h-[40px]"
                src={ProfilePic}
                alt=""
              />
              <p className="font-bold">{name}</p>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <div className="gap-4 flex">
              <img
                className="bg-yellow-300  h-[60px] rounded-full"
                src={ProfilePic}
                alt=""
              />
              <div className="flex flex-col justify-center gap-1">
                <p className="font-bold text-[0.8rem]">Hi there,</p>
                <h1 className="text-lg">
                  {name} &#40;{email}&#41;
                </h1>
              </div>
            </div>
          </div>
        </nav>
        <main className="flex-1 p-4 bg-contrast grid">
          <div className="flex flex-col bg-white rounded-xl pt-0">
            <table className=" border-collapse">
              <tr className="text-sm h-16 text-black tracking-widest">
                <th className="w-1/5 text-left border-none tracking-normal text-lg font-bold">
                  PATIENTS
                </th>
                <th className="w-1/6 border-none ">
                  <motion.button
                    onClick={() =>
                      modalAssistantOpen ? closeAssistant() : openAssistant()
                    }
                    whileTap={{ scale: 0.95 }}
                    className=" bg-[#00e5bd] hover:bg-[#01cba9] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
                  >
                    Invite Assistants
                  </motion.button>

                  <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                  >
                    {modalAssistantOpen && (
                      <Modal
                        modalAssistantOpen={modalAssistantOpen}
                        handleClose={closeAssistant}
                        text={
                          <div>
                            <form id="assistantForm" action="">
                              <label htmlFor="assistantEmail">
                                Enter Assistant&apos;s Email
                              </label>
                              <input
                                onChange={(e) => {
                                  setAssistantEmail(e.target.value);
                                }}
                                id="assistantEmail"
                                autoComplete="off"
                                className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                placeholder="Name"
                              />
                              <div className="flex justify-center">
                                <button
                                  form="forget"
                                  type="submit"
                                  className=" bg-[#00e5bd] text-white text-[12px] py-[5px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                                >
                                  Invite
                                </button>
                              </div>
                            </form>
                          </div>
                        }
                      />
                    )}
                  </AnimatePresence>
                </th>
                <th className="w-1/6 border-none ">
                  <motion.button
                    onClick={() =>
                      modalDoctorOpen ? closeDoctor() : openDoctor()
                    }
                    whileTap={{ scale: 0.95 }}
                    className=" bg-[#00e5bd] hover:bg-[#01cba9] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
                  >
                    Add Doctors
                  </motion.button>

                  <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                  >
                    {modalDoctorOpen && (
                      <Modal
                        modalDoctorOpen={modalDoctorOpen}
                        handleClose={closeDoctor}
                        text={
                          <div>
                            <form id="doctorForm" action="">
                              <label htmlFor="doctorEmail">
                                Enter Doctor&apos;s Email
                              </label>
                              <input
                                onChange={(e) => {
                                  setDoctorEmail(e.target.value);
                                }}
                                id="doctorEmail"
                                autoComplete="off"
                                className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                placeholder="Name"
                              />
                              <div className="flex justify-center">
                                <button
                                  form="forget"
                                  type="submit"
                                  className=" bg-[#00e5bd] text-white text-[12px] py-[5px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                                >
                                  Invite
                                </button>
                              </div>
                            </form>
                          </div>
                        }
                      />
                    )}
                  </AnimatePresence>
                </th>
                <th className=" border-none ">&nbsp;</th>

                <th className=" border-none ">
                  <motion.button
                    onClick={() =>
                      modalDeleteOpen ? closeDelete() : openDelete()
                    }
                    whileTap={{ scale: 0.95 }}
                    className="hover:cursor-pointer w-[100px] rounded-full py-[8px]  px-2 bg-red-700 text-background font-bold text-sm hover:bg-red-800 transition-all ease-linear duration-100"
                  >
                    Delete
                  </motion.button>

                  <AnimatePresence
                    initial={false}
                    mode="wait"
                    onExitComplete={() => null}
                  >
                    {modalDeleteOpen && (
                      <Modal
                        modalDeleteOpen={modalDeleteOpen}
                        handleClose={closeDelete}
                        text={
                          <div>
                            <form id="DeleteForm" action="">
                              <label htmlFor="DeleteEmail">
                                Type &quot;Delete Patient&quot; to confirm.
                              </label>
                              <input
                                onChange={(e) => {
                                  setDelete(e.target.value);
                                }}
                                id="DeleteEmail"
                                autoComplete="off"
                                className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                placeholder="Confirm"
                              />
                              <div className="flex justify-center">
                                <button
                                  form="forget"
                                  type="submit"
                                  className=" bg-red-800 text-white text-[12px] py-[5px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                                >
                                  I am sure!
                                </button>
                              </div>
                            </form>
                          </div>
                        }
                      />
                    )}
                  </AnimatePresence>
                </th>
              </tr>
              <tr className="text-xs text-slate-500 tracking-widest">
                <th className="text-left">PATIENT</th>
                <th>ASSISTANT</th>
                <th>DOCTOR</th>
                <th>SOCIAL SKILLS</th>
                <th>TRACK PATIENT</th>
              </tr>
              <form action="" className="border-4 border-black">
                hello
              </form>
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
              <Row />
            </table>
          </div>
        </main>
      </section>
    </div>
  );
}

function Row({ patient, assistant, doctor }) {
  return (
    <tr className="h-16">
      <td>
        <input
          type="checkbox"
          className="rounded-full mr-2 text-green-400 p-2 transition-all focus:ring-green-500 appearance-none"
        />
        Patient
      </td>
      <td>data</td>
      <td>data</td>
      <td className="text-center px-2">
        <button className=" bg-[#0067e5] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer">
          Improve Social Skills
        </button>
      </td>
      <td className="text-center px-2">
        <button className=" bg-[#0067e5] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer">
          Track your Patient
        </button>
      </td>
    </tr>
  );
}

function SidebarButton({ name, img }) {
  return (
    <li className="flex hover:cursor-pointer items-center list-none mb-4 w-max font-bold">
      <img className="h-[20px] w-auto pr-4" src={img} alt="" />
      {name}
    </li>
  );
}

function User({ img, name, job }) {
  return (
    <div className="flex items-center gap-2">
      <img className="h-[50px] rounded-full" src={img} alt="" />
      <div>
        <p className="text-green-600">{name}</p>
        <p className="text-[#36454f]">{job}</p>
      </div>
    </div>
  );
}

function Sidebar() {
  return (
    <section className=" pt-4 bg-sidebar text-white flex-col shrink-0 min-w-[200px] px-4 flex">
      <div className=" mx-auto md:mx-0 items-center md:fixed flex">
        <MdDashboard className="h-[40px] w-auto mr-2" />
        <p className="text-[1.4rem] font-bold">Dashboard</p>
      </div>
      <div className="static md:top-[56px] md:fixed">
        <ul className="md:block flex flex-wrap gap-4 justify-around md:pt-12 md:ml-2 pt-2">
          <SidebarButton name="Home" img={Home} />
          <SidebarButton name="Profile" img={Profile} />
          <SidebarButton name="Assistance Hub" img={Assistance} />
          <SidebarButton name="Messages" img={Message} />
          <SidebarButton name="History" img={History} />
          <SidebarButton name="Communities" img={Community} />
        </ul>
      </div>
      <div className="static md:top-[320px] md:fixed">
        <ul className="md:block flex flex-wrap gap-4 justify-around md:pt-12 md:ml-2 pt-2">
          <SidebarButton name="Settings" img={Settings} />
          <SidebarButton name="Support" img={Support} />
          <SidebarButton name="Privacy" img={Privacy} />
        </ul>
      </div>
    </section>
  );
}
