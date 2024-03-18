import Brain from "./assets/brain.svg";
import { FaHome } from "react-icons/fa";
import { GoCopilot } from "react-icons/go";
import { IoGameController } from "react-icons/io5";
import { RiNotification3Fill } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
function Sidebar() {
  return (
    <div className="fixed z-10 h-screen bg-BgColor w-16 sidebar-shadow">
      <div className="relative z-10 gap-12 rounded-xl top-10 left-1 sm:left-7 h-sidebar w-16 m-0 flex flex-col bg-primary text-white shadow-lg pt-4 pb-4">
        <SidebarIcon clickable={false} icon={<img src={Brain} />} />
        <div className="flex flex-col gap-1">
          <SidebarIcon msg={"Home"} icon={<FaHome size="30" />} />
          <SidebarIcon msg={"Chat"} icon={<GoCopilot size="30" />} />
          <SidebarIcon msg={"Games"} icon={<IoGameController size="30" />} />
          <SidebarIcon
            msg={"Notifications"}
            icon={<RiNotification3Fill size="30" />}
          />
        </div>
        <div className="flex flex-col">
          <SidebarIcon
            msg={"Support"}
            icon={<MdOutlineSupportAgent size="30" />}
          />
          <SidebarIcon msg={"To-do list"} icon={<LuListTodo size="30" />} />
        </div>
        <div className="mt-auto">
          <SidebarIcon icon={<LuLogOut size="30" />} />
        </div>
      </div>
    </div>
  );
}
// eslint-disable-next-line react/prop-types
function SidebarIcon({ icon, clickable = true, msg }) {
  let sidebarClass = "sidebar-icon group ";
  if (clickable) sidebarClass += " sidebar-hover";
  return (
    <div className={sidebarClass}>
      {icon}
      {msg ? (
        <span className="sidebar-msg group-hover:scale-100">{msg}</span>
      ) : null}
    </div>
  );
}
export default Sidebar;
