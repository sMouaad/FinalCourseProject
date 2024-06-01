/* eslint-disable react/prop-types */
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import Lottie from "lottie-react";
import animation from "./assets/search.json";
import useAuth from "./hooks/useAuth";
import { Dropdown } from "./Sidebar";
import { Link } from "react-router-dom";
import Axios from "axios";
import Modal from "./components/Modal/index";
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
import { ImCross } from "react-icons/im";
export default function Dashboard() {
  const [modalAssistantOpen, setAssistantModalOpen] = useState(false);
  const [modalDoctorOpen, setDoctorModalOpen] = useState(false);
  const [modalPatientOpen, setPatientModalOpen] = useState(false);
  const [modalDeleteOpen, setDeleteModalOpen] = useState(false);
  const [modalInstructionsOpen, setInstructionsModalOpen] = useState(false);
  const [modalListAssistantsOpen, setListAssistantsModalOpen] = useState(false);
  const [modalListDoctorsOpen, setListDoctorsModalOpen] = useState(false);
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
  const [patients, setPatients] = useState([]);
  const [open, setOpen] = useState(false);
  const [instruction, setInstruction] = useState("");
  const [instructions, setInstructions] = useState([]);
  const [image, setImage] = useState("");
  const [thread, setThread] = useState("");
  const [threadName, setThreadName] = useState("");
  const [currentPatient, setCurrentPatient] = useState([]);
  const [owner, setOwner] = useState(false);
  const { setAuth } = useAuth();

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

  const openListAssistants = () => setListAssistantsModalOpen(true);
  const openListDoctors = () => setListDoctorsModalOpen(true);
  const closeListAssistants = () => setListAssistantsModalOpen(false);
  const closeListDoctors = () => setListDoctorsModalOpen(false);

  const closeInstructions = () => {
    setInstructionsModalOpen(false);
    setInstruction("");
    setThread("");
    setThreadName("");
  };

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
  const handleTodoDelete = (taskid, patientid) => {
    Axios.post("http://localhost:3000/auth/delete", {
      taskid: taskid,
      patientid: patientid,
    })
      .then((res) => {
        setUpdateDash(!updateDash);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleAssistants = (currentPatient, operationtype) => {
    Axios.get(`http://localhost:3000/auth/patientdata/${currentPatient}`).then(
      (res) => {
        setCurrentPatient(res.data.patient);
        operationtype !== "doctor" ? openListAssistants() : openListDoctors();
      }
    );
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
      instruction,
      thread,
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
      })
      .finally(() => {
        setAssistantEmail("");
        setDoctorEmail("");
        setPatientDate("");
        setPatientName("");
        setCondition("alzheimer");
        setDelete("");
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
    Axios.get(`http://localhost:3000/auth/get/${thread}`).then((res) => {
      if (res.data.status) {
        setInstructions(res.data.instructions);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thread, updateDash]);
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setTableRows(res.data.patientsCreated);
        console.log(res.data.patientsCreated);
        setSecondaryRows(res.data.secondaryPatients);
        setPatients(res.data.patients);
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
        setImage(res.data.picture);
        setNotifications(res.data.notifications);
      }
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
        closeInstructions();
        closeListAssistants();
        closeListDoctors();
      }
    });
  }, []);
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalListAssistantsOpen && (
          <Modal
            modalListAssistantsOpen={modalListAssistantsOpen}
            handleClose={closeListAssistants}
            text={
              <>
                <div className="absolute top-8 text-lg font-bold">
                  Secondary Assistants
                </div>
                {currentPatient.assistants.length === 0 ? (
                  <div className="text-center">No Secondary Assistants Yet</div>
                ) : (
                  <div className="flex w-full px-4 flex-col gap-4">
                    {currentPatient.assistants.map((data) => {
                      return (
                        <div className="flex justify-between bg-white px-4 py-2 shadow-md rounded-lg">
                          <div className="flex items-center justify-center gap-4">
                            <div className="h-8 w-8 bg-white shadow-sm rounded-full overflow-hidden">
                              <img
                                src={`http://localhost:3000/${data.image}`}
                                alt=""
                              />
                            </div>

                            <div className="font-bold">{data.name}</div>
                            <div>&#40;{data.email}&#41;</div>
                            <div className="flex justify-center items-center font-bold text-sm text-slate-400">
                              {data.phone
                                ? "+213" + data.phone
                                : "No phone number"}
                            </div>
                          </div>

                          {owner ? (
                            <motion.button
                              whileTap={{ scale: 0.95 }}
                              onClick={() => {
                                Axios.post(
                                  "http://localhost:3000/auth/dissociate",
                                  {
                                    patientId: currentPatient._id,
                                    assistantId: data.id,
                                  }
                                ).then(() => {
                                  setUpdateDash(!updateDash);
                                  handleAssistants(currentPatient._id);
                                });
                              }}
                              className=" bg-red-700 hover:bg-red-800 text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
                            >
                              Dissociate
                            </motion.button>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                )}
              </>
            }
          />
        )}
      </AnimatePresence>
      <AnimatePresence initial={false} mode="wait" onExitComplete={() => null}>
        {modalListDoctorsOpen && (
          <Modal
            modalListDoctorsOpen={modalListDoctorsOpen}
            handleClose={closeListDoctors}
            text={
              <>
                <div className="absolute top-8 text-lg font-bold">Doctor</div>
                <div className="flex w-full px-4 flex-col gap-4">
                  {currentPatient.doctorData ? (
                    <div className="flex justify-between bg-white px-4 py-2 shadow-md rounded-lg">
                      <div className="flex items-center justify-center gap-4">
                        <div className="h-8 w-8 bg-white shadow-sm rounded-full overflow-hidden">
                          <img
                            src={`http://localhost:3000/${currentPatient.doctorData.image}`}
                            alt=""
                          />
                        </div>
                        {currentPatient.doctorData.name}
                        <div className="flex justify-center items-center font-bold text-sm text-slate-400">
                          {currentPatient.doctorData.phone
                            ? "+213" + currentPatient.doctorData.phone
                            : "No phone number"}
                        </div>
                      </div>

                      {owner ? (
                        <motion.button
                          whileTap={{ scale: 0.95 }}
                          onClick={() => {
                            Axios.post(
                              "http://localhost:3000/auth/dissociate",
                              {
                                patientId: currentPatient._id,
                                doctorId: currentPatient.doctorData.id,
                              }
                            ).then(() => {
                              handleAssistants(currentPatient._id, "doctor");
                              setUpdateDash(!updateDash);
                            });
                          }}
                          className=" bg-red-700 hover:bg-red-800 text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
                        >
                          Dissociate
                        </motion.button>
                      ) : null}
                    </div>
                  ) : (
                    <div className="text-center">No doctor assigned.</div>
                  )}
                </div>
              </>
            }
          />
        )}
      </AnimatePresence>
      <form id="mainForm" onSubmit={handleForm}></form>
      <Sidebar setAuth={setAuth} role={role} />
      <section className="flex-[6] flex flex-col">
        <nav className="grid-rows-2 px-12 py-4 gap-4 shadow-lg z-[2] grid">
          <div className="items-center justify-between gap-12 flex">
            <div className="flex shrink gap-4 basis-[75%]">
              <div className="items-center flex">
                <div></div>
              </div>
            </div>
            <div className="pr-4 items-center gap-6 flex">
              <div className="rounded-full bg-yellow-300 w-[40px] h-[40px] overflow-hidden">
                <img
                  className="w-full h-auto align-bottom"
                  src={image ? `http://localhost:3000/${image}` : ProfilePic}
                  alt=""
                />
              </div>

              <p className="font-bold">{name}</p>
            </div>
          </div>

          <div className="flex gap-12 justify-between items-center">
            <div className="gap-4 flex">
              <div className="rounded-full bg-yellow-300 w-[60px] h-[60px] overflow-hidden">
                <img
                  className="w-full h-auto align-bottom"
                  src={image ? `http://localhost:3000/${image}` : ProfilePic}
                  alt=""
                />
              </div>

              <div className="flex flex-col justify-center gap-1">
                <p className="font-bold text-[0.8rem]">Hi there,</p>
                <h1 className="text-lg">
                  {role === "doctor" ? "Dr " : null}
                  {name} &#40;{email}&#41;
                </h1>
              </div>
            </div>

            <div
              onClick={() => setOpen(!open)}
              className="flex cursor-pointer absolute right-14 justify-center hover:bg-slate-200 self-center h-12 w-12 transition-all ease-linear rounded-full items-center ml-auto mr-2"
            >
              <img className="w-8" src={Bell} alt="notifications" />
              {notifications.length !== 0 ? (
                <div className="absolute flex justify-center items-center font-bold right-0 bottom-0 rounded-full bg-yellow-300 w-5 h-5">
                  {notifications.length}
                </div>
              ) : null}
            </div>
            {open && (
              <div className="px-4 absolute overflow-y-auto z-50 bg-[#F7FBFE] shadow-xl rounded-lg min-w-96 w-96 top-[9.2rem] right-4 h-96">
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
        <main className="flex-1 gap-2 flex flex-col p-4 bg-contrast">
          <div className="flex flex-1 flex-col  bg-white rounded-xl pt-0">
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
                      <span>
                        <div className="mt-auto  flex gap-8">
                          <motion.button
                            onClick={() =>
                              modalInstructionsOpen
                                ? closeInstructions()
                                : openInstructions()
                            }
                            whileTap={{ scale: 0.95 }}
                            className=" bg-[#00e5bd] hover:bg-[#01cba9] text-white text-[12px] border-[1px] px-4 border-transparent min-h-8 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100"
                          >
                            Add Instructions
                          </motion.button>
                          <AnimatePresence
                            initial={false}
                            mode="wait"
                            onExitComplete={() => null}
                          >
                            {modalInstructionsOpen && (
                              <Modal
                                styleAdd="h-5/6 w-5/6 py-4 rounded-lg bg-slate-100"
                                modalInstructionsOpen={modalInstructionsOpen}
                                handleClose={closeInstructions}
                                text={
                                  <>
                                    <div className="text-2xl text-center">
                                      Instructions
                                    </div>
                                    <div className="bg-slate-100 flex flex-1 p-4 gap-4 h-full">
                                      <div className="flex flex-col rounded-md bg-white shadow-xl h-full flex-[2]">
                                        <div className="flex justify-between shadow-sm p-4  text-lg">
                                          <div>To-do List</div>
                                          <div className="font-bold tracking-widest">
                                            {threadName}
                                          </div>
                                          <div>
                                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                          </div>
                                        </div>
                                        {!thread ? (
                                          <div
                                            className={`flex ${
                                              !thread
                                                ? "font-light h-full"
                                                : null
                                            } items-center justify-center`}
                                          >
                                            Select a Patient
                                          </div>
                                        ) : (
                                          <ul className="px-8 flex flex-col gap-2 py-4 font-thin h-full overflow-auto">
                                            {instructions.map((element) => {
                                              return (
                                                <Instruction
                                                  key={element._id}
                                                  element={element}
                                                  handler={handleTodoDelete}
                                                  thread={thread}
                                                />
                                              );
                                            })}
                                          </ul>
                                        )}
                                        <div className="transition-all ease-linear flex items-center gap-2 p-4 border-t-2 border-slate-200 mt-auto w-full self-center">
                                          <input
                                            placeholder="Task..."
                                            className="border-none rounded-full w-full bg-slate-200"
                                            type="text"
                                            onChange={(e) => {
                                              setInstruction(e.target.value);
                                            }}
                                          />
                                          <motion.button
                                            form="mainForm"
                                            onClick={(e) => {
                                              if (!thread) {
                                                e.preventDefault();

                                                setDeleteError(
                                                  "Select a patient first."
                                                );
                                              } else if (!instruction) {
                                                e.preventDefault();

                                                setDeleteError(
                                                  "Fill empty field."
                                                );
                                              } else {
                                                setOperation("instruction");
                                              }
                                            }}
                                            whileTap={{ scale: 0.95 }}
                                            className={` flex gap-3 items-center justify-center bg-blue-500 hover:bg-blue-600 text-white text-[12px] border-[1px] px-4 border-transparent py-1 rounded-full font-[600] tracking-[0.5px] uppercase cursor-pointer transition-all ease-linear duration-100 `}
                                          >
                                            Add
                                          </motion.button>
                                        </div>
                                      </div>
                                      <div className="rounded-md px-2 bg-white shadow-xl flex-1 ">
                                        <table className="w-full h-full  border-collapse">
                                          <thead>
                                            <th className="block text-center py-4 border-none text-2xl font-bold">
                                              Patients
                                            </th>
                                          </thead>
                                          {patients.length === 0 ? (
                                            <div className="h-full flex flex-col items-center justify-center text-2xl mt-8">
                                              <Lottie
                                                className="h- mb-8"
                                                animationData={animation}
                                              />
                                              <div className="text-slate-800">
                                                No patients yet...
                                              </div>
                                              <div className="text-sm text-slate-600">
                                                Ask assistants to invite you
                                              </div>
                                            </div>
                                          ) : null}
                                          {patients.map((element) => {
                                            return (
                                              <>
                                                <PatientRow
                                                  element={element}
                                                  thread={thread}
                                                  setThread={setThread}
                                                  setThreadName={setThreadName}
                                                />
                                              </>
                                            );
                                          })}
                                          <tbody className="overflow-y-auto flex flex-col h-full "></tbody>
                                        </table>
                                      </div>
                                    </div>
                                  </>
                                }
                              />
                            )}
                          </AnimatePresence>
                        </div>
                      </span>
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
                                      onClick={(e) => {
                                        if (!assistantEmail) {
                                          e.preventDefault();
                                          setDeleteError(
                                            "Make sure you typed the assistant's email"
                                          );
                                        } else if (tableData.length === 0) {
                                          e.preventDefault();
                                          setDeleteError(
                                            "Check at least one patient."
                                          );
                                        }
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
                                      onClick={(e) => {
                                        if (!doctorEmail) {
                                          e.preventDefault();
                                          setDeleteError(
                                            "Make sure you typed the doctor's email"
                                          );
                                        } else if (tableData.length === 0) {
                                          e.preventDefault();
                                          setDeleteError(
                                            "Check at least one patient."
                                          );
                                        }
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

                  <th
                    className={`border-none ${
                      role === "doctor" ? "text-end pr-4" : ""
                    }`}
                  >
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
                  {role === "assistant" ? (
                    <>
                      <th>SOCIAL SKILLS</th>
                      <th>TRACK PATIENT</th>
                    </>
                  ) : (
                    <>
                      <th>&nbsp;</th>
                      <th>&nbsp;</th>
                    </>
                  )}
                </tr>
                {role === "assistant" &&
                  tableRows.map((element) => {
                    return (
                      <Row
                        key={element._id}
                        patientId={element._id}
                        handleCheck={handleCheck}
                        patient={element.name}
                        assistant={element.assistants}
                        doctor={element.doctors}
                        doctorImage={element.doctorImage}
                        role={role}
                        modalListAssistantsOpen={modalListAssistantsOpen}
                        closeListAssistants={closeListAssistants}
                        modalListDoctorsOpen={modalListDoctorsOpen}
                        closeListDoctors={closeListDoctors}
                        setOwner={setOwner}
                        handleAssistants={handleAssistants}
                        owner={true}
                      />
                    );
                  })}
                {role === "doctor" &&
                  patients.map((element) => {
                    return (
                      <Row
                        key={element._id}
                        patientId={element._id}
                        handleCheck={handleCheck}
                        patient={element.name}
                        assistant={element.assistants}
                        doctor={element.doctors}
                        doctorImage={element.doctorImage}
                        role={role}
                        setOwner={setOwner}
                        modalListAssistantsOpen={modalListAssistantsOpen}
                        closeListAssistants={closeListAssistants}
                        handleAssistants={handleAssistants}
                      />
                    );
                  })}
              </table>
              {role === "doctor" && patients.length === 0 ? (
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
              {role === "assistant" &&
              tableRows.length === 0 &&
              secondaryRows.length !== 0 ? (
                <div className="h-full flex items-center text-slate-500 justify-center text-md mt-8">
                  <div>No patients created yet.</div>
                </div>
              ) : null}
              {role === "assistant" && secondaryRows.length !== 0 ? (
                <>
                  <div className="flex justify-center text-slate-700 tracking-wider font-Poppins text-lg mt-8">
                    <div className="border-b-slate-200 flex-1 border-b-2"></div>
                    <div>Secondary Patients</div>
                    <div className="border-b-slate-200 flex-1 border-b-2"></div>
                  </div>
                  <table className="border-collapse">
                    <tr className="text-sm h-16 text-black tracking-widest">
                      <th className="w-1/5 text-left border-none tracking-normal text-lg font-bold">
                        &nbsp;
                      </th>
                      <th className="w-1/6 border-none ">&nbsp;</th>
                      <th className="w-1/6 border-none ">&nbsp;</th>
                      <th className=" border-none ">&nbsp;</th>
                      <th className=" border-none ">&nbsp;</th>
                    </tr>
                    {role === "assistant" &&
                      secondaryRows.map((element) => {
                        return (
                          <Row
                            key={element._id}
                            patientId={element._id}
                            handleCheck={handleCheck}
                            assistant={element.assistants}
                            doctor={element.doctors}
                            doctorImage={element.doctorImage}
                            patient={element.name}
                            role={role}
                            modalListAssistantsOpen={modalListAssistantsOpen}
                            closeListAssistants={closeListAssistants}
                            handleAssistants={handleAssistants}
                            setOwner={setOwner}
                            owner={false}
                          />
                        );
                      })}
                  </table>
                </>
              ) : null}
              {role === "assistant" &&
              tableRows.length === 0 &&
              secondaryRows.length === 0 ? (
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
  doctorImage,
  handleCheck,
  role,
  modalListAssistantsOpen,
  closeListAssistants,
  handleAssistants,
  modalListDoctorsOpen,
  closeListDoctors,
  owner = false,
  setOwner,
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
          <div
            className={`relative hover:w-[34px] hover:h-[34px] transition-all cursor-pointer border-slate-300 border-2 w-8 h-8 ${
              assistant.length > 0 && !assistant[0].image
                ? "bg-yellow-300"
                : "bg-slate-200"
            } rounded-full overflow-hidden`}
            onClick={() => {
              setOwner(owner);
              handleAssistants(patientId);
              modalListAssistantsOpen ? closeListAssistants() : null;
            }}
          >
            {assistant.length > 0 ? (
              <img
                src={
                  assistant[0].image
                    ? `http://localhost:3000/${assistant[0].image}`
                    : ProfilePic
                }
                alt=""
              />
            ) : (
              <div className="text-[8px] flex  justify-center items-center h-full w-full">
                Empty
              </div>
            )}
          </div>
          {assistant.length > 1 ? (
            <div
              onClick={() => {
                setOwner(owner);
                handleAssistants(patientId);
                modalListAssistantsOpen ? closeListAssistants() : null;
              }}
              className="relative hover:w-[34px] hover:h-[34px] transition-all cursor-pointer border-slate-300 border-2 z-[2] right-3 w-8 h-8 bg-yellow-300 rounded-full overflow-hidden"
            >
              <img
                src={
                  assistant[1].image
                    ? `http://localhost:3000/${assistant[1].image}`
                    : ProfilePic
                }
                alt=""
              />
            </div>
          ) : null}
          {assistant.length > 2 ? (
            <div
              onClick={() => {
                setOwner(owner);
                handleAssistants(patientId);
                modalListAssistantsOpen ? closeListAssistants() : null;
              }}
              className="relative hover:w-[34px] hover:h-[34px] transition-all cursor-pointer border-slate-300 border-2 z-[3] right-6 w-8 h-8 bg-yellow-300 text-center text-gray-400 rounded-full overflow-hidden"
            >
              <img
                src={
                  assistant[2].image
                    ? `http://localhost:3000/${assistant[2].image}`
                    : ProfilePic
                }
                alt=""
              />
            </div>
          ) : null}
          {assistant.length > 3 ? (
            <div className="flex justify-center items-center relative border-slate-300 border-2 z-[4] right-8 w-6 h-6 bg-slate-200 text-xs font-bold rounded-full">
              {assistant.length - 3}+
            </div>
          ) : null}
        </div>
      </td>
      <td>
        <div className="flex select-none">
          <div
            onClick={() => {
              setOwner(owner);
              handleAssistants(patientId, "doctor");
              modalListDoctorsOpen ? closeListDoctors() : null;
            }}
            className={` border-slate-300 border-2 w-8 h-8 ${
              !doctorImage && doctor ? "bg-yellow-300" : "bg-slate-200"
            } rounded-full hover:w-[34px] hover:h-[34px] transition-all cursor-pointer overflow-hidden`}
          >
            {doctor ? (
              <img
                src={
                  doctorImage
                    ? `http://localhost:3000/${doctorImage}`
                    : ProfilePic
                }
                alt=""
              />
            ) : (
              <div className="text-[8px] flex cursor-default justify-center items-center h-full w-full">
                Empty
              </div>
            )}
          </div>
        </div>
      </td>
      {role === "assistant" ? (
        <>
          <td className="text-center px-2">
            <Link to={`/home/${patientId}`}>
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
        </>
      ) : (
        <>
          <td>&nbsp;</td>
          <td>&nbsp;</td>
        </>
      )}
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
          <SidebarButton route="/messages" name="Messages" img={Message} />
          <SidebarButton route="/settings" name="Settings" img={Settings} />
          <SidebarButton route="/support" name="Support" img={Support} />
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

function PatientRow({ element, thread, setThread, setThreadName }) {
  return (
    <tr
      className={`border-none flex-none h-16 flex ${
        thread === element._id ? null : "hover:bg-slate-50"
      } ${
        thread === element._id ? "bg-slate-100" : null
      } rounded-md hover:cursor-pointer transition-all`}
    >
      <td
        style={{ padding: 0 }}
        className="border-none block flex-1 text-lg rounded-md  ease-linear h-16"
      >
        <label
          htmlFor={element._id}
          className="flex justify-between items-center px-2  hover:cursor-pointer w-full h-full"
        >
          {element.name}
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
function Instruction({ element, handler, thread }) {
  return (
    <li
      className={`shadow-sm justify-between flex   transition-all rounded-md bg-green-50 p-2 ${
        element.done ? "line-through" : null
      }`}
    >
      {element.task}
      <button
        onClick={(e) => {
          e.preventDefault();
          handler(element._id, thread);
        }}
      >
        <ImCross className="h-3" color="green" />
      </button>
    </li>
  );
}
