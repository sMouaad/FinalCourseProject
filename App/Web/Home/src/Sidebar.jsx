import Brain from "./assets/brain.svg";
import { IoIosApps } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { RiNotification3Fill } from "react-icons/ri";
import { MdOutlineSupportAgent } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
function Sidebar() {
  return (
    <div className="fixed z-10 h-screen bg-BgColor w-20 sidebar-shadow">
      <div className="relative z-10 gap-12 rounded-xl top-10 left-1 sm:left-7 h-sidebar w-16 m-0 flex flex-col bg-primary text-white shadow-lg pt-4 pb-4">
        <SidebarIcon clickable={false} icon={<img src={Brain} />} />
        <div className="flex flex-col gap-1">
          <Link to="/">
            <SidebarIcon msg={"Home"} icon={<FaHome size="30" />} />
          </Link>
          <Link to="/apps">
            <SidebarIcon msg={"Apps"} icon={<IoIosApps size="30" />} />
          </Link>
          <Link to="/games">
            <SidebarIcon msg={"Games"} icon={<IoGameController size="30" />} />
          </Link>
          <Link to="/notifications">
            <SidebarIcon
              msg={"Notifications"}
              icon={<RiNotification3Fill size="30" />}
            />
          </Link>
        </div>
        <div className="flex flex-col">
          <Link to="/support">
            <SidebarIcon
              msg={"Support"}
              icon={<MdOutlineSupportAgent size="30" />}
            />
          </Link>
          <Link to="/to-do-list">
            <SidebarIcon msg={"To-do list"} icon={<LuListTodo size="30" />} />
          </Link>
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
