import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    {/* <Router> */}
    <GoogleOAuthProvider clientId="598136990860-etprh808l9cfpuq8sblqgqoj6q5takpn.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
    {/* </Router> */}
  </AuthProvider>
);
