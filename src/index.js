import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    {/* <Router> */}
    <App />
    {/* </Router> */}
  </AuthProvider>
);
