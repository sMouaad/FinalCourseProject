import React from "react";
import ReactDOM from "react-dom/client";
import Sidebar from "./Sidebar.jsx";
import Content from "./Content.jsx";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sidebar />
    <Content />
  </React.StrictMode>
);
