import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Steps = () => {
  const {
    stepOne,
    stepTwo,
    stepThree,
    isSuccess,
    isForgot,
    isCodeReset,
    isReset,
    isVsmReset,
    isLogin,
  } = useContext(AuthContext);

  return (
    <div>
      <div
        className={`${
          isSuccess ||
          isForgot ||
          isCodeReset ||
          isReset ||
          isVsmReset ||
          isLogin
            ? "hidden"
            : ""
        } flex w-[30rem] items-center sm:w-[20rem] xs:w-[15rem] ss:w-[18rem]`}
      >
        <p
          className={` ${
            stepOne
              ? ""
              : "bg-gradient-to-r from-light-blue to-light-blue text-gray-500"
          } rounded-full font-bold text-white w-[3rem] h-[3rem] sm:w-[2rem] sm:h-[2rem] ss:w-[2rem] ss:h-[2rem] bg-gradient-to-r from-grad-light to-grad-dark text-center grid items-center`}
        >
          1
        </p>
        <div className="w-[5rem] h-[0.1rem] mx-5 bg-primary"></div>
        <p
          className={` ${
            stepTwo
              ? "bg-gradient-to-r from-grad-light to-grad-dark"
              : "bg-gradient-to-r from-light-blue to-light-blue text-gray-500"
          } rounded-full font-bold text-white w-[3rem] h-[3rem]  text-center grid items-center sm:w-[2rem] sm:h-[2rem] ss:w-[2rem] ss:h-[2rem]`}
        >
          2
        </p>
        <div className="w-[5rem] h-[0.1rem] mx-5 bg-primary"></div>
        <p
          className={` ${
            stepThree
              ? ""
              : "bg-gradient-to-r from-light-blue to-light-blue text-gray-500"
          } rounded-full font-bold text-white w-[3rem] h-[3rem] bg-gradient-to-r from-grad-light to-grad-dark text-center grid items-center sm:w-[2rem] sm:h-[2rem] ss:w-[2rem] ss:h-[2rem]`}
        >
          3
        </p>
      </div>
    </div>
  );
};

export default Steps;
