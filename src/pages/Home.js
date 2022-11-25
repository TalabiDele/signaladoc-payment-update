import React from "react";
import { useEffect } from "react";
import EmailComponent from "../components/EmailComponent";

const Home = () => {
  useEffect(() => {
    document.title = "SignalADoc Telemedicine";
  }, []);

  return (
    <div>
      <EmailComponent />
    </div>
  );
};

export default Home;
