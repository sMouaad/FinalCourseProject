import Brain from "./assets/brain.svg";
import { IoIosApps } from "react-icons/io";
import { FaHome } from "react-icons/fa";
import { IoGameController } from "react-icons/io5";
import { RiNotification3Fill } from "react-icons/ri";
import { LuListTodo } from "react-icons/lu";
import { LuLogOut } from "react-icons/lu";
import { Link } from "react-router-dom";
import { GoCopilot } from "react-icons/go";
import { useMediaQuery } from "react-responsive";
import { useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";
import Axios from "axios";
function Sidebar() {
  const isDesktop = useMediaQuery({
    query: "(min-width: 640px)",
  });
  return (
    <div className="fixed top-0 z-10 sm:gap-10 sm:rounded-xl sm:top-10 sm:left-7 sm:h-sidebar w-screen sm:w-16 m-0 flex sm:flex-col bg-primary text-white shadow-lg pt-1 sm:pt-4 sm:pb-4">
      <SidebarIcon clickable={false} icon={<img src={Brain} />} />
      {isDesktop ? <DesktopIcons /> : <MobileIcons />}
    </div>
  );
}
// eslint-disable-next-line react/prop-types
function SidebarIcon({ route, icon, clickable = true, msg }) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 640px)",
  });
  let sidebarClass = "sidebar-icon group flex";
  if (clickable) sidebarClass += " sidebar-hover";
  return (
    <Link className="flex items-center font-Poppins font-bold" to={route}>
      <div className={sidebarClass}>
        {icon}
        {msg && isDesktop ? (
          <span className="sidebar-msg group-hover:scale-100">{msg}</span>
        ) : null}
      </div>
      {!isDesktop ? <span className="">{msg}</span> : null}
    </Link>
  );
}
export default Sidebar;

function DesktopIcons() {
  const handleLogout = () => {
    Axios.get("http://localhost:3000/auth/logout")
      .then((res) => {
        console.log("here!");
        if (res.data.status) console.log("cookies cleared");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <>
      <div className="flex sm:flex-col sm:gap-1">
        <SidebarIcon route="/home" msg={"Home"} icon={<FaHome size="30" />} />
        <SidebarIcon
          route="/apps"
          msg={"Apps"}
          icon={<IoIosApps size="30" />}
        />
        <SidebarIcon
          route="/games"
          msg={"Games"}
          icon={<IoGameController size="30" />}
        />
        <SidebarIcon
          route="notifications"
          msg={"Notifications"}
          icon={<RiNotification3Fill size="30" />}
        />
      </div>
      <div className="flex sm:flex-col">
        <SidebarIcon
          route="/assistant"
          msg={"Virtual Assistant"}
          icon={<GoCopilot size="30" />}
        />
        <SidebarIcon
          route="/to-do-list"
          msg={"To-do list"}
          icon={<LuListTodo size="30" />}
        />
      </div>
      <div onClick={handleLogout} className="sm:mt-auto">
        <SidebarIcon route="/" msg={"Exit"} icon={<LuLogOut size="30" />} />
      </div>
    </>
  );
}
function MobileIcons() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div className="flex font-Poppins items-center ">Dhakira</div>
      <div
        onClick={() => setOpen(!open)}
        className="flex justify-center sidebar-hover self-center h-10 w-10 transition-all ease-linear rounded-full items-center ml-auto mr-2"
      >
        <RxHamburgerMenu size={30} />
        {open && (
          <div className="fixed z-50 bg-primary rounded-lg w-full top-12">
            <Dropdown>
              <SidebarIcon route="/" msg={"Home"} icon={<FaHome size="30" />} />
              <SidebarIcon
                route="/apps"
                msg={"Apps"}
                icon={<IoIosApps size="30" />}
              />
              <SidebarIcon
                route="/games"
                msg={"Games"}
                icon={<IoGameController size="30" />}
              />
              <SidebarIcon
                route="notifications"
                msg={"Notifications"}
                icon={<RiNotification3Fill size="30" />}
              />
              <SidebarIcon
                route="/assistant"
                msg={"Virtual Assistant"}
                icon={<GoCopilot size="30" />}
              />
              <SidebarIcon
                route="/to-do-list"
                msg={"To-do list"}
                icon={<LuListTodo size="30" />}
              />
              <SidebarIcon msg={"Exit"} icon={<LuLogOut size="30" />} />
            </Dropdown>
          </div>
        )}
      </div>
    </>
  );
}
function Dropdown(props) {
  // eslint-disable-next-line react/prop-types
  return <div>{props.children}</div>;
}
