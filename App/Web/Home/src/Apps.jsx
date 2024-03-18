/* eslint-disable react/prop-types */
import { social } from "./data.jsx";
import { memory } from "./data.jsx";
import { focus } from "./data.jsx";
import ArrowL from "./assets/arrow-left.svg";
import ArrowR from "./assets/arrow-right.svg";
export default function Apps() {
  return (
    <div
      id="Games"
      className="ml-32 flex flex-col py-16 pb-32 pl-16 gap-8 min-h-screen "
    >
      <Row msg="Improve your Social Skills" dataset={social} />
      <Row msg="Improve your Memory" dataset={memory} />
      <Row msg="Improve your Focus" dataset={focus} />
    </div>
  );
}
function Row({ msg, dataset }) {
  return (
    <>
      <div className="relative flex flex-col flex-1">
        <p className="font-Poppins text-xl font-bold">{msg}</p>
        <div className="z-10 bg-slate-500 hover:cursor-pointer bg-opacity-50 rounded-full px-1 py-1 absolute left-2 top-1/2">
          <img src={ArrowL} alt="" />
        </div>
        <div className="z-10 bg-slate-500 hover:cursor-pointer bg-opacity-50 rounded-full px-1 py-1 absolute top-1/2 right-2">
          <img src={ArrowR} alt="" />
        </div>
        <div className="flex-1 basis-0 no-scrollbar overflow-x-scroll grid grid-cards">
          {dataset.items.map((data) => {
            return (
              <div
                onClick={() => {
                  GoToApp(data.link);
                }}
                key={data.title}
                className="grid hover:cursor-pointer group overflow-hidden rounded-xl grid-cards border-black border-4"
              >
                <img
                  className="relative h-full mx-auto bottom-10 group-hover:bottom-20 transition-all"
                  src={data.thumbnail}
                  alt=""
                ></img>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}
function GoToApp(url) {
  window.location.href = url;
}
