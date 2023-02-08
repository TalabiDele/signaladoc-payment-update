import React from "react";
import VSMCheckout from "../components/VSMCheckout";
import VSMSide from "../components/VSMSide";

const Checkout = () => {
  return (
    <div className="flex fixed right-0 left-0 -z-10 xs:flex-col ss:flex-col">
      <VSMSide />
      <VSMCheckout />
    </div>
  );
};

export default Checkout;
