/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation from "./assets/search.json";
import { Navigate, useNavigate } from "react-router-dom";
import useAuth from "./hooks/useAuth";
import { Dropdown } from "./Sidebar";
import { Link } from "react-router-dom";
import Axios from "axios";
import Modal from "./components/Modal/index";
import Assistance from "./assets/dashboard/assistance.svg";
import { MdDashboard } from "react-icons/md";
import Home from "./assets/dashboard/home.svg";
import Bell from "./assets/dashboard/bell.svg";
import ProfilePic from "./assets/dashboard/pfp.svg";
import Logout from "./assets/dashboard/logout.svg";
import Message from "./assets/dashboard/message.svg";
import Profile from "./assets/dashboard/profile.svg";
import Settings from "./assets/dashboard/settings.svg";
import Support from "./assets/dashboard/support.svg";
import Check from "./assets/dashboard/check.svg";
import Cross from "./assets/dashboard/cross.svg";
export default function Dashboard() {
  const [modalAssistantOpen, setAssistantModalOpen] = useState(false);
  const [modalDoctorOpen, setDoctorModalOpen] = useState(false);
  const [modalPatientOpen, setPatientModalOpen] = useState(false);
  const [modalDeleteOpen, setDeleteModalOpen] = useState(false);
  const [modalInstructionsOpen, setInstructionsModalOpen] = useState(false);
  const [condition, setCondition] = useState("alzheimer");
  const [deleteConfirmation, setDelete] = useState("");
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@email.com");
  const [patientDate, setPatientDate] = useState();
  const [patientName, setPatientName] = useState("");
  const [assistantEmail, setAssistantEmail] = useState("");
  const [doctorEmail, setDoctorEmail] = useState("");
  const [role, setRole] = useState("user");
  const [operation, setOperation] = useState("");
  const [tableData, setTableData] = useState([]);
  const [tableRows, setTableRows] = useState([]);
  const [secondaryRows, setSecondaryRows] = useState([]);
  const [updateDash, setUpdateDash] = useState(false);
  const [updateNotif, setUpdateNotif] = useState(false);
  const [deleteError, setDeleteError] = useState("");
  const [notifications, setNotifications] = useState([]);
  const [open, setOpen] = useState(false);
  const { setAuth } = useAuth();

  const handleLogout = () => {
    Axios.get("http://localhost:3000/auth/logout")
      .then((res) => {
        console.log("here!");
        if (res.data.status) console.log("cookies cleared");
        setAuth({});
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const closeAssistant = () => {
    setAssistantModalOpen(false);
    setDelete("");
    setDeleteError("");
  };
  const openInstructions = () => setInstructionsModalOpen(true);
  const openAssistant = () => setAssistantModalOpen(true);
  const closeDoctor = () => {
    setDoctorModalOpen(false);
    setDelete("");
    setDeleteError("");
  };
  const openDoctor = () => setDoctorModalOpen(true);
  const closeInstructions = () => setInstructionsModalOpen(false);
  const closeDelete = () => {
    setDeleteModalOpen(false);
    setDelete("");
    setDeleteError("");
  };
  const openDelete = () => setDeleteModalOpen(true);
  const closePatient = () => {
    setPatientModalOpen(false);
    setDelete("");
    setDeleteError("");
  };
  const openPatient = () => setPatientModalOpen(true);
  Axios.defaults.withCredentials = true;
  // const navigate = useNavigate();

  //for handling checkbox logic
  const handleCheck = (data) => {
    if (tableData.includes(data)) {
      setTableData(tableData.filter((a) => a !== data));
    } else {
      setTableData([...tableData, data]);
    }
  };
  const handleForm = (e) => {
    e.preventDefault();
    Axios.post("http://localhost:3000/auth/operation", {
      email,
      condition,
      operation,
      patientDate,
      patientName,
      assistantEmail,
      doctorEmail,
      tableData,
    })
      .then((res) => {
        if (res.data.status) {
          if (operation === "delete") {
            setTableData([]);
          }
          closeAssistant();
          closeDelete();
          closeDoctor();
          setUpdateDash(!updateDash);
        } else {
          setDeleteError("The email you provided is invalid.");
        }
      })
      .catch((err) => {
        setDeleteError("The email you provided is invalid.");
      });
  };

  //we use UseEffect to fetch json data of patients of a the current user then display it on the dashboard, postponed to decide on which db to use.
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setNotifications(res.data.notifications);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateNotif]);
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setTableRows(res.data.patientsCreated);
        setSecondaryRows(res.data.secondaryPatients);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [updateDash, updateNotif]);

  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.type);
        setNotifications(res.data.notifications);
      }
      console.log(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //Add escape as button to quit the modal
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAssistant();
        closeDoctor();
        closeDelete();
        closePatient();
      }
    });
  }, []);
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <form id="mainForm" onSubmit={handleForm}></form>
      {role === "assistant" ? <Sidebar setAuth={setAuth} role={role} /> : null}
      <section className="flex-[6] flex flex-col">
        <nav
          className={
            role === "doctor"
              ? "grid-rows-1 px-12 py-4 gap-4 shadow-lg z-[2] grid"
              : "grid-rows-2 px-12 py-4 gap-4 shadow-lg z-[2] grid"
          }
        >
          {role === "assistant" ? (
            <div className="items-center justify-between gap-12 flex">
              <div className="flex shrink gap-4 basis-[75%]">
                <div className="items-center flex">
                  <div></div>
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
          ) : null}
          <div className="flex gap-12 justify-between items-center">
            <div className="gap-4 flex">
              <img
                className="bg-yellow-300  h-[60px] rounded-full"
                src={ProfilePic}
                alt=""
              />
              <div className="flex flex-col justify-center gap-1">
                <p className="font-bold text-[0.8rem]">Hi there,</p>
                <h1 className="text-lg">
                  {role === "doctor" ? "Dr " : null}
                  {name} &#40;{email}&#41;
                </h1>
              </div>
            </div>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className=" bg-[#008de5] hover:bg-[#0184cb] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
            >
              Chat with Groups
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.95 }}
              className=" bg-[#0063e5] hover:bg-[#0152cb] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
            >
              Chat with Assistants
            </motion.button>
            <div
              onClick={() => setOpen(!open)}
              className="flex absolute right-14 justify-center hover:bg-slate-200 self-center h-12 w-12 transition-all ease-linear rounded-full items-center ml-auto mr-2"
            >
              <img className="w-8" src={Bell} alt="notifications" />
            </div>
            <div
              onClick={handleLogout}
              className="flex justify-center hover:bg-slate-200 self-center h-12 w-12 transition-all ease-linear rounded-full items-center ml-auto mr-2"
            >
              <img className="w-8" src={Logout} alt="logout" />
            </div>
            {open && (
              <div
                className={
                  role === "doctor"
                    ? "px-4 absolute overflow-y-auto z-50 bg-[#F7FBFE] shadow-xl rounded-lg min-w-96 w-96 top-20 right-4 h-96"
                    : "px-4 absolute overflow-y-auto z-50 bg-[#F7FBFE] shadow-xl rounded-lg min-w-96 w-96 top-[9.2rem] right-4 h-96"
                }
              >
                <Dropdown>
                  <div className="text-2xl text-center font-Roboto font-bold mt-4">
                    Notifications
                  </div>
                  {notifications.length == 0 ? (
                    <div className="text-center my-8 text-slate-400 tracking-wider">
                      You have no notifications
                    </div>
                  ) : (
                    notifications.map((element) => {
                      return (
                        <Notification
                          key={element._id}
                          message={element.message}
                          email={email}
                          notificationId={element._id}
                          updateNotif={updateNotif}
                          setUpdateNotif={setUpdateNotif}
                        />
                      );
                    })
                  )}
                </Dropdown>
              </div>
            )}
          </div>
        </nav>
        <main className="flex-1 p-4 bg-contrast grid">
          <div className="flex flex-col bg-white rounded-xl pt-0">
            <>
              <table className=" border-collapse">
                <tr className="text-sm h-16 text-black tracking-widest">
                  <th className="w-1/5 text-left border-none tracking-normal text-lg font-bold">
                    {role === "assistant" ? (
                      <>
                        <motion.button
                          onClick={() =>
                            modalPatientOpen ? closePatient() : openPatient()
                          }
                          whileTap={{ scale: 0.95 }}
                          className=" bg-[#00e5bd] hover:bg-[#01cba9] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
                        >
                          Create Patient
                        </motion.button>
                        <AnimatePresence
                          initial={false}
                          mode="wait"
                          onExitComplete={() => null}
                        >
                          {modalPatientOpen && (
                            <Modal
                              modalPatientOpen={modalPatientOpen}
                              handleClose={closePatient}
                              text={
                                <div>
                                  <div className="flex justify-center">
                                    <label
                                      htmlFor="assistantEmail"
                                      className="text-center"
                                    >
                                      Enter Patient&apos;s Informations
                                    </label>
                                  </div>
                                  <div
                                    className="my-[20px] flex gap-8 justify-center"
                                    id="checkboxes"
                                  >
                                    <input
                                      form="mainForm"
                                      type="radio"
                                      name="type"
                                      id="assistant"
                                      className="absolute opacity-0 w-0 h-0"
                                      defaultChecked="true"
                                    />
                                    <label
                                      onClick={() => {
                                        setCondition("alzheimer");
                                      }}
                                      htmlFor="assistant"
                                      className="selected text-sm"
                                    >
                                      Alzheimer
                                    </label>
                                    <input
                                      form="mainForm"
                                      type="radio"
                                      name="type"
                                      id="doctor"
                                      className="absolute opacity-0 w-0 h-0"
                                    />
                                    <label
                                      onClick={() => {
                                        setCondition("autism");
                                      }}
                                      htmlFor="doctor"
                                      className="selected text-sm"
                                    >
                                      Autism
                                    </label>
                                  </div>
                                  <input
                                    onChange={(e) => {
                                      setPatientName(e.target.value);
                                    }}
                                    id="patientName"
                                    autoComplete="off"
                                    className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                    placeholder="Name"
                                  />
                                  <input
                                    onChange={(e) => {
                                      setPatientDate(e.target.value);
                                      console.log(typeof patientDate);
                                      console.log(patientDate);
                                      setDeleteError("");
                                    }}
                                    id="patientDate"
                                    type="date"
                                    min={0}
                                    max={100}
                                    autoComplete="off"
                                    className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                    placeholder="Age"
                                  />
                                  <div className="flex justify-center">
                                    <button
                                      onClick={() => {
                                        setOperation("patient");
                                        closePatient();
                                      }}
                                      form="mainForm"
                                      type="submit"
                                      className=" bg-blue-600 text-white text-[12px] py-[5px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                                    >
                                      Create
                                    </button>
                                  </div>
                                </div>
                              }
                            />
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </th>
                  <th className="w-1/6 border-none ">
                    {role === "assistant" ? (
                      <>
                        <motion.button
                          onClick={() =>
                            modalAssistantOpen
                              ? closeAssistant()
                              : openAssistant()
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
                                  <label htmlFor="assistantEmail">
                                    Enter Assistant&apos;s Email
                                  </label>
                                  <input
                                    onChange={(e) => {
                                      setAssistantEmail(e.target.value);
                                      setDeleteError("");
                                    }}
                                    id="assistantEmail"
                                    autoComplete="off"
                                    className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                    placeholder="example@example.eg"
                                  />
                                  <div className="h-8 min-h-0">
                                    {deleteError ? (
                                      <span className="text-red-700 text-xs tracking-normal">
                                        {deleteError}
                                      </span>
                                    ) : null}
                                  </div>
                                  <div className="flex justify-center">
                                    <button
                                      onClick={() => {
                                        setOperation("assistant");
                                      }}
                                      form="mainForm"
                                      type="submit"
                                      className=" bg-[#00e5bd] text-white text-[12px] py-[5px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                                    >
                                      Invite
                                    </button>
                                  </div>
                                </div>
                              }
                            />
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <span>&nbsp;</span>
                    )}
                  </th>
                  <th className="w-1/6 border-none ">
                    {role === "assistant" ? (
                      <>
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
                                  <label htmlFor="doctorEmail">
                                    Enter Doctor&apos;s Email
                                  </label>
                                  <input
                                    onChange={(e) => {
                                      setDoctorEmail(e.target.value);
                                      setDeleteError("");
                                    }}
                                    id="doctorEmail"
                                    autoComplete="off"
                                    className="bg-[#eee] border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                    placeholder="example@example.eg"
                                  />
                                  <div className="h-8 min-h-0">
                                    {deleteError ? (
                                      <span className="text-red-700 text-xs tracking-normal">
                                        {deleteError}
                                      </span>
                                    ) : null}
                                  </div>
                                  <div className="flex justify-center">
                                    <button
                                      onClick={() => {
                                        setOperation("doctor");
                                      }}
                                      form="mainForm"
                                      type="submit"
                                      className=" bg-[#00e5bd] text-white text-[12px] py-[5px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                                    >
                                      Invite
                                    </button>
                                  </div>
                                </div>
                              }
                            />
                          )}
                        </AnimatePresence>
                      </>
                    ) : (
                      <span>&nbsp;</span>
                    )}
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
                              <label htmlFor="DeleteEmail">
                                Type &quot;Delete Patient&quot; to confirm.
                              </label>
                              <input
                                onChange={(e) => {
                                  setDeleteError("");
                                  setDelete(e.target.value);
                                }}
                                id="DeleteEmail"
                                autoComplete="off"
                                className="bg-[#eee] text-slate-700 border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                                placeholder="Confirm"
                              />
                              <div className="h-8 min-h-0">
                                {deleteError ? (
                                  <span className="text-red-700 text-xs tracking-normal">
                                    {deleteError}
                                  </span>
                                ) : null}
                              </div>
                              <div className="flex justify-center">
                                <button
                                  onClick={(e) => {
                                    if (tableData.length === 0) {
                                      e.preventDefault();
                                      setDeleteError(
                                        "Check at least one patient."
                                      );
                                    } else if (
                                      deleteConfirmation === "Delete Patient"
                                    ) {
                                      setOperation("delete");
                                    } else {
                                      e.preventDefault();
                                      setDeleteError(
                                        "Mismatch, verify your spelling."
                                      );
                                    }
                                  }}
                                  form="mainForm"
                                  type="submit"
                                  className=" bg-red-800 text-white text-[12px] py-[5px] px-[45px] border-[1px] border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase mt-[10px] cursor-pointer"
                                >
                                  I am sure!
                                </button>
                              </div>
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
                {tableRows.map((element) => {
                  return (
                    <Row
                      key={element._id}
                      patientId={element._id}
                      handleCheck={handleCheck}
                      patient={element.name}
                    />
                  );
                })}
              </table>
              {tableRows.length === 0 && secondaryRows.length !== 0 ? (
                <div className="h-full flex items-center text-slate-500 justify-center text-md mt-8">
                  <div>No patients created yet.</div>
                </div>
              ) : null}
              {secondaryRows.length !== 0 ? (
                <>
                  <div className="flex justify-center text-slate-700 tracking-wider font-Poppins text-lg mt-8">
                    <div className="border-b-slate-200 flex-1 border-b-2"></div>
                    <div>Secondary Patients</div>
                    <div className="border-b-slate-200 flex-1 border-b-2"></div>
                  </div>
                  <table className=" border-collapse">
                    <tr className="text-sm h-16 text-black tracking-widest">
                      <th className="w-1/5 text-left border-none tracking-normal text-lg font-bold">
                        &nbsp;
                      </th>
                      <th className="w-1/6 border-none ">&nbsp;</th>
                      <th className="w-1/6 border-none ">&nbsp;</th>
                      <th className=" border-none ">&nbsp;</th>
                      <th className=" border-none ">&nbsp;</th>
                    </tr>
                    {secondaryRows.map((element) => {
                      return (
                        <Row
                          key={element._id}
                          patientId={element._id}
                          handleCheck={handleCheck}
                          patient={element.name}
                        />
                      );
                    })}
                  </table>
                </>
              ) : null}
              {tableRows.length === 0 && secondaryRows.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-2xl mt-8">
                  <div>No patients found yet.</div>
                  <div
                    onClick={() => role === "assistant" && openPatient(true)}
                    className=" transition-all text-slate-400 text-sm hover:cursor-pointer hover:text-slate-500"
                  >
                    {role === "assistant" ? (
                      <span>try creating one</span>
                    ) : (
                      <span>Try giving your email to a caregiver.</span>
                    )}
                  </div>
                  <Lottie className="h-96 mb-8" animationData={animation} />
                </div>
              ) : null}
            </>
          </div>
          {role === "doctor" ? (
            <div className="flex gap-8">
              <motion.button
                onClick={() =>
                  modalInstructionsOpen
                    ? closeInstructions()
                    : openInstructions()
                }
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-[#1ba8ff] h-16 hover:bg-[#0184cb] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
              >
                Instructions
              </motion.button>
              <AnimatePresence
                initial={false}
                mode="wait"
                onExitComplete={() => null}
              >
                {modalInstructionsOpen && (
                  <Modal
                    modalInstructionsOpen={modalInstructionsOpen}
                    handleClose={closeInstructions}
                    text={
                      <div className="py-3 h-full w-4/5 flex flex-col gap-4">
                        <div className="text-center text-3xl font-bold">
                          Instructions
                        </div>
                        <input
                          autoComplete="off"
                          className="bg-slate-200 text-slate-700 focus:text-black font-bold border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                          placeholder="Instruction..."
                          type="text"
                        />
                        <textarea
                          className="bg-slate-200 flex-1 resize-none text-slate-700 focus:text-black font-bold border-none my-[8px] mx-0 py-[10px] px-[15px] text-[13px] rounded-[8px] w-full outline-none"
                          name=""
                          id=""
                          cols="30"
                          rows="10"
                          placeholder="Details..."
                        ></textarea>
                        <div className="text-center">
                          <button className=" bg-green-500 py-4 px-8 text-white text-[12px] self-center basis-1/2 border-transparent rounded-[8px] font-[600] tracking-[0.5px] uppercase cursor-pointer">
                            Add
                          </button>
                        </div>
                      </div>
                    }
                  />
                )}
              </AnimatePresence>
              <motion.button
                whileTap={{ scale: 0.95 }}
                className="flex-1 bg-[#00e500] h-16 hover:bg-[#2ca92c] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
              >
                Tests
              </motion.button>
            </div>
          ) : null}
        </main>
      </section>
    </div>
  );
}

function Row({
  patient = "patient",
  patientId,
  assistant,
  doctor,
  handleCheck,
}) {
  return (
    <tr className="h-16">
      <td>
        <input
          onChange={() => {
            handleCheck(patientId);
          }}
          type="checkbox"
          className="rounded-full mr-2 text-green-400 p-2 transition-all focus:ring-green-500 appearance-none"
          value={patientId}
          name="patient"
        />
        {patient}
      </td>
      <td>
        <div className="flex select-none w-max">
          <div className="relative border-slate-300 border-2 w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
            <img src={Profile} alt="" />
          </div>
          <div className="relative border-slate-300 border-2 z-[2] right-3 w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
            <img src={Profile} alt="" />
          </div>
          <div className="relative border-slate-300 border-2 z-[3] right-6 w-8 h-8 bg-slate-200 text-center text-gray-400 rounded-full">
            ...
          </div>
        </div>
      </td>
      <td>
        <div className="flex select-none">
          <div className=" border-slate-300 border-2 w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
            <img src={Profile} alt="" />
          </div>
        </div>
      </td>
      <td className="text-center px-2">
        <Link to="/home">
          <button className=" bg-[#0067e5] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer">
            Improve Social Skills
          </button>
        </Link>
      </td>
      <td className="text-center px-2">
        <Link to="/maps">
          <button className=" bg-[#0067e5] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer">
            Track your Patient
          </button>
        </Link>
      </td>
    </tr>
  );
}

export function SidebarButton({ name, img, route }) {
  return (
    <Link
      to={route}
      className="flex hover:cursor-pointer items-center list-none mb-4 w-max font-bold"
    >
      <img className="h-[20px] w-auto pr-4" src={img} alt="" />
      {name}
    </Link>
  );
}

export function Sidebar({ role, setAuth }) {
  const handleLogout = () => {
    Axios.get("http://localhost:3000/auth/logout")
      .then((res) => {
        console.log("here!");
        if (res.data.status) console.log("cookies cleared");
        setAuth({});
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <section className=" pt-4 bg-sidebar text-white flex-col shrink-0 min-w-[200px] px-4 flex">
      <div className=" mx-auto md:mx-0 items-center md:fixed flex">
        <MdDashboard className="h-[40px] w-auto mr-2" />
        <p className="text-[1.4rem] font-bold">Dashboard</p>
      </div>
      <div className="static md:top-[56px] md:fixed">
        <ul className="md:block flex flex-wrap gap-4 justify-around md:pt-12 md:ml-2 pt-2">
          <SidebarButton route="/dashboard" name="Home" img={Home} />
          <SidebarButton name="Messages" img={Message} />
          <SidebarButton route="/settings" name="Settings" img={Settings} />
          <SidebarButton name="Support" img={Support} />
        </ul>
      </div>
      <div className="static md:bottom-[25px] md:fixed">
        <ul
          onClick={handleLogout}
          className="md:block flex flex-wrap gap-4 justify-around md:pt-12 md:ml-2 pt-2"
        >
          <SidebarButton route={"/"} name="Log out" img={Logout} />
        </ul>
      </div>
    </section>
  );
}
function Notification({
  profilepic = Profile,
  message = "Invitation d'un utilisateur",
  email,
  notificationId,
  setUpdateNotif,
  updateNotif,
}) {
  return (
    <div className="gap-3 my-4 flex items-center">
      <div className="relative border-slate-300 border-2 min-w-8 min-h-8 w-8 h-8 bg-slate-200 rounded-full overflow-hidden">
        <img src={profilepic} alt="" />
      </div>
      <div className="text-sm font-Poppins font-light">{message}</div>
      <button
        onClick={(e) => {
          e.preventDefault();
          Axios.post("http://localhost:3000/auth/notifications", {
            email,
            notificationId,
            accept: true,
          })
            .then((res) => {
              setUpdateNotif(!updateNotif);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <img
          className="min-w-6 min-h-6 h-6 w-6 hover:min-w-7 hover:min-h-7 transition-all"
          src={Check}
          alt=""
        />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          Axios.post("http://localhost:3000/auth/notifications", {
            email,
            notificationId,
            accept: false,
          })
            .then((res) => {
              setUpdateNotif(!updateNotif);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      >
        <img
          className="min-w-6 min-h-6 h-6 w-6 hover:min-w-7 hover:min-h-7 transition-all"
          src={Cross}
          alt=""
        />
      </button>
    </div>
  );
}
