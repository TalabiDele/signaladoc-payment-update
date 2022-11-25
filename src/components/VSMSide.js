import React, { useContext } from "react";
import { VsmBg } from "./style";
import AuthContext from "../Context/AuthContext";

const VSMSide = () => {
  const { showBg, setShowBg } = useContext(AuthContext);

  return (
    <>
      <VsmBg>
        <div className=" bg-primary mix-blend-multiply w-[100%] h-[100vh] xs:h-[70vh] ss:h-[70vh] relative"></div>
        <div className=" xs:block ss:block hidden text-white absolute top-56 text-center w-3/4 mx-auto right-0 left-0">
          <h1 className=" text-5xl font-bold mb-4 ss:text-4xl">
            Monitor Your Vital Signs Just By Looking At Your Phone!
          </h1>
        </div>
      </VsmBg>
      <button
        className={`${
          !showBg ? "hidden" : ""
        } bg-gradient-to-b from-grad-light to-grad-dark text-[20px] text-white w-2/4 py-4 rounded-md mt-5 mx-auto hidden xs:block ss:block`}
        onClick={() => setShowBg(false)}
      >
        Get Started
      </button>
    </>
  );
};

export default VSMSide;
