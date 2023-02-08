import React from "react";
import ReactDOM, { createRoot } from "react-dom/client";
import "./index.css";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./Context/AuthContext";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_AUTH_KEY } from "./Config";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

root.render(
  <AuthProvider>
    {/* <Router> */}
    <GoogleOAuthProvider clientId={GOOGLE_AUTH_KEY}>
      <App />
    </GoogleOAuthProvider>
    {/* </Router> */}
  </AuthProvider>
);
