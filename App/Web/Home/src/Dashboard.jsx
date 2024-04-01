/* eslint-disable react/prop-types */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Axios from "axios";
import Assistance from "./assets/dashboard/assistance.svg";
import { MdDashboard } from "react-icons/md";
import Home from "./assets/dashboard/home.svg";
import Community from "./assets/dashboard/community.svg";
import Eye from "./assets/dashboard/eye.svg";
import Fork from "./assets/dashboard/fork.svg";
import History from "./assets/dashboard/history.svg";
import Message from "./assets/dashboard/message.svg";
import Privacy from "./assets/dashboard/privacy.svg";
import Profile from "./assets/dashboard/profile.svg";
import Settings from "./assets/dashboard/settings.svg";
import Star from "./assets/dashboard/star.svg";
import Support from "./assets/dashboard/support.svg";
export default function Dashboard() {
  Axios.defaults.withCredentials = true;
  const navigate = useNavigate();
  useEffect(() => {
    Axios.get("http://localhost:3000/auth/verify").then((res) => {
      if (res.data.status) {
        console.log(res.data.message);
      } else {
        navigate("/login");
      }
      console.log(res);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex-wrap flex font-Roboto">
      <Sidebar />
      <section className="flex-[6] grid">
        <nav className=" grid-rows-2 px-12 py-4 gap-4 shadow-lg z-[2] grid">
          <div className="items-center justify-between gap-12 flex">
            <div className="flex shrink gap-4 basis-[75%]">
              <div className="items-center flex">
                <img className="h-[20px]" src="assets/search.svg" alt="" />
              </div>
            </div>
            <div className="pr-4 items-center gap-6 flex">
              <img className="h-[25px] button" src="assets/bell.svg" alt="" />
              <img
                className="rounded-full h-[40px]"
                src="https://cdn.discordapp.com/avatars/684441534766252115/6a8822a10520f8bfd81dd53973275b54?size=1024"
                alt=""
              />
              <p className="font-bold">Mouaad Sadi</p>
            </div>
          </div>
          <div className="flex gap-4 justify-between items-center">
            <div className="gap-4 flex">
              <img
                className="h-[60px] rounded-full"
                src="https://cdn.discordapp.com/avatars/684441534766252115/6a8822a10520f8bfd81dd53973275b54?size=1024"
                alt=""
              />
              <div className="flex flex-col justify-center gap-1">
                <p className="font-bold text-[0.8rem]">Hi there,</p>
                <h1 className="text-lg">Mouaad Sadi &#40;@grreatest&#41;</h1>
              </div>
            </div>
            <div className="flex flex-wrap justify-evenly gap-6">
              <button className="hover:cursor-pointer border-none w-[100px] rounded-lg py-[8px] px-2 bg-sidebar text-background font-bold text-sm">
                New
              </button>
              <button className="hover:cursor-pointer border-none w-[100px] rounded-lg py-[8px] px-2 bg-sidebar text-background font-bold text-sm">
                Upload
              </button>
              <button className="hover:cursor-pointer border-none w-[100px] rounded-lg py-[8px] px-2 bg-sidebar text-background font-bold text-sm">
                Share
              </button>
            </div>
          </div>
        </nav>
        <main className="multiple p-4 bg-contrast grid">
          <div className="flex flex-col spanning2">
            <h3 className="my-4 font-bold text-lg">My Projects</h3>
            <div className="gap-8 mr-8 projects flex-1 grid">
              <Card
                title="Some title"
                msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    mollitia dolores fugiat error magni commodi, illo minima
                    neque ipsum quis. Dolorem at labore molestias illo
                    dignissimos modi, ex dolorum sed."
              />
              <Card
                title="Some title"
                msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    mollitia dolores fugiat error magni commodi, illo minima
                    neque ipsum quis. Dolorem at labore molestias illo
                    dignissimos modi, ex dolorum sed."
              />
              <Card
                title="Some title"
                msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    mollitia dolores fugiat error magni commodi, illo minima
                    neque ipsum quis. Dolorem at labore molestias illo
                    dignissimos modi, ex dolorum sed."
              />
              <Card
                title="Some title"
                msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                    mollitia dolores fugiat error magni commodi, illo minima
                    neque ipsum quis. Dolorem at labore molestias illo
                    dignissimos modi, ex dolorum sed."
              />
              <Card
                title="Some title"
                msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                  mollitia dolores fugiat error magni commodi, illo minima
                  neque ipsum quis. Dolorem at labore molestias illo
                  dignissimos modi, ex dolorum sed."
              />
              <Card
                title="Some title"
                msg="Lorem ipsum dolor sit amet consectetur adipisicing elit. Ea
                mollitia dolores fugiat error magni commodi, illo minima
                neque ipsum quis. Dolorem at labore molestias illo
                dignissimos modi, ex dolorum sed."
              />
            </div>
          </div>
          <div className="flex-col flex">
            <h3 className="my-4">Announcements</h3>
            <div className="flex-1 bg-background border-none rounded-md shadow-md flex flex-col p-8">
              <Announcement
                title="New Projects"
                msg="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Natus eos atque, excepturi s."
              />
              <Announcement
                title="New Projects"
                msg="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Natus eos atque, excepturi s."
              />
              <Announcement
                title="New Projects"
                msg="Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Natus eos atque, excepturi s."
              />
            </div>
          </div>
          <div className="my-8 flex flex-col">
            <h3 className="my-4">Trending</h3>
            <div className="flex-1 bg-background border-none rounded-md shadow-md py-4 flex flex-col p-8 justify-evenly">
              <User name="Mouaad" job="Web Developer" />
              <User name="Mouaad" job="Web Developer" />
              <User name="Mouaad" job="Web Developer" />
              <User name="Mouaad" job="Web Developer" />
            </div>
          </div>
        </main>
      </section>
    </div>
  );
}

function Card({ title, msg }) {
  return (
    <div className="bg-background py-8 px-4 rounded-md border-solid border-l-8 border-l-card pb-8 shadow-lg flex-col justify-between flex ">
      <div>
        <h4 className="font-bold">{title}</h4>
        <p className="text-[#36454f]">{msg}</p>
      </div>
      <div className="flex justify-end gap-8 mr-2 ">
        <img
          className="h-[25px] mt-4 hover:cursor-pointer"
          src="assets/star.svg"
          alt=""
        />
        <img
          className="h-[25px] mt-4 hover:cursor-pointer"
          src="assets/eye.svg"
          alt=""
        />
        <img
          className="h-[25px] mt-4 hover:cursor-pointer"
          src="assets/fork.svg"
          alt=""
        />
      </div>
    </div>
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
function Announcement({ title, msg }) {
  return (
    <div className="last:border-none flex flex-col items-center flex-1 p-2 border-b-[#36454f] border-b-[1px] border-solid">
      <h5>{title}</h5>
      <p className="text-[#36454f] text-sm my-2">{msg}</p>
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
