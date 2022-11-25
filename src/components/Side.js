import React, { useContext } from "react";
import { Bg } from "./style";
import AuthContext from "../Context/AuthContext";

const Side = () => {
  const { showBg, setShowBg } = useContext(AuthContext);

  return (
    <>
      <Bg>
        <div className=" bg-primary mix-blend-multiply w-[100%] h-[100vh] xs:h-[70vh] ss:h-[70vh] relative"></div>
        <div className=" xs:block ss:block hidden text-white absolute top-56 text-center w-3/4 mx-auto right-0 left-0">
          <h1 className=" text-7xl font-bold mb-4 ss:text-5xl">
            A Doctor In Your Pocket
          </h1>
          <p className="">
            With our telemedicine app, you can consult with a doctor wherever
            you are on the go, 24/7.
          </p>
        </div>
      </Bg>
      <button
        className={`${
          !showBg ? "hidden" : ""
        } bg-gradient-to-b from-grad-light to-grad-dark text-[20px] text-white w-2/4 py-4 rounded-md mt-5 mx-auto hidden xs:block ss:block`}
        onClick={() => setShowBg(false)}
      >
        Start Consulting
      </button>
    </>
  );
};

export default Side;
