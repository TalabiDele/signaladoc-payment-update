import React, { useEffect } from "react";
import VSMEmail from "../components/VSMEmail";

const VSM = () => {
  useEffect(() => {
    document.title = "SignalADoc Vital Signs Monitoring";
  }, []);

  return (
    <div>
      <VSMEmail />
    </div>
  );
};

export default VSM;
