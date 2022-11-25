import React, { useEffect, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { FaThumbsUp } from "react-icons/fa";

const VSMSuccess = () => {
  const { isPaid, submitVsmPayment, ref, discountId } = useContext(AuthContext);

  useEffect(() => {
    if (isPaid) {
      submitVsmPayment({ ref, discountId });
    }
  }, [isPaid, ref, discountId]);

  return (
    <div className=" text-center mt-20">
      <div className=" text-center text-primary text-4xl w-20 mx-auto mb-5">
        <FaThumbsUp />
      </div>
      <p className=" text-center text-3xl">Payment Successful</p>

      <a href="https://bit.ly/vitalsm">
        <button className=" bg-gradient-to-b from-grad-light to-grad-dark text-[20px] text-white w-full py-4 rounded-md mt-5">
          Download VSM App
        </button>
      </a>
    </div>
  );
};

export default VSMSuccess;
