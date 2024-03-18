import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./Sidebar.jsx";
import Games from "./Games.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sidebar />
    <Games />
  </React.StrictMode>
);
