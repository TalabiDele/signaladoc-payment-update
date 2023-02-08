import React from "react";
import UserLogin from "../components/UserLogin";
import VSMSide from "../components/VSMSide";
import VSMLogin from "../components/VSMLogin";

const VsmLogin = () => {
  return (
    <div className="flex fixed right-0 left-0 -z-10 xs:flex-col ss:flex-col">
      <VSMSide />
      <VSMLogin />
    </div>
  );
};

export default VsmLogin;
