import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./styles/main.css";

document.body.classList.add("js-enabled");

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);