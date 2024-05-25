import useAuth from "./hooks/useAuth";
import Axios from "axios";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import ProfilePic from "./assets/dashboard/pfp.svg";
import { Sidebar } from "./Dashboard";

export default function Messages() {
  const [name, setName] = useState("user");
  const [email, setEmail] = useState("user@email.com");
  const [role, setRole] = useState("user");
  const [picture, setPicture] = useState("");
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    Axios.get("http://localhost:3000/auth/userdata").then((res) => {
      if (res.data.status) {
        setName(res.data.name);
        setEmail(res.data.email);
        setRole(res.data.type);
        setPicture(res.data.picture);
        setPatients(
          res.data.patientsCreated.concat(res.data.secondaryPatients)
        );
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const { setAuth } = useAuth();
  return (
    <div className="flex-wrap h-screen flex font-Roboto">
      <Sidebar setAuth={setAuth} role={role} />
      <section className="bg-slate-100 flex-[6] flex  flex-col">
        <div className="flex flex-1 p-4 gap-4">
          <div className="rounded-md bg-white shadow-xl flex-[2]"></div>
          <div className="rounded-md bg-white shadow-xl flex-1 ">
            <table className="w-full border-collapse">
              <tr>
                <th className="text-start py-4 border-none text-2xl font-bold">
                  Patinets
                </th>
              </tr>

              {patients.map((element) => {
                return (
                  <tr key={element._id}>
                    <td className="text-lg transition-all ease-linear border-none hover:bg-slate-100 rounded-md hover:cursor-pointer h-16">
                      {element.name}
                    </td>
                  </tr>
                );
              })}
            </table>
          </div>
        </div>
      </section>
    </div>
  );
}
