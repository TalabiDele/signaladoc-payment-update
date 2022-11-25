import React from "react";
import { BgHero, VsmBgHero } from "./style";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div>
      {/* <BgHero>
        <div className=" bg-primary w-full h-[100vh] mix-blend-multiply relative"></div>
        <div className=" text-white absolute top-[20rem] text-center w-2/6 mx-auto right-0 left-0">
          <h1 className=" text-7xl font-bold mb-4 ss:text-5xl">
            A Doctor In Your Pocket
          </h1>
          <p className="">
            With our telemedicine app, you can consult with a doctor wherever
            you are on the go, 24/7.
          </p>
          <button className=" bg-input-blue p-5 rounded-lg text-primary font-bold mt-5">
            Activate Telemedicine
          </button>
        </div>
      </BgHero> */}
      <VsmBgHero>
        <div className=" bg-primary w-full h-[100vh] mix-blend-multiply relative"></div>
        <div className=" text-white absolute top-[20rem] text-center w-2/6 mx-auto right-0 left-0 ss:w-[90%] xs:w-[90%] sm:w-[80%] lg:w-[60%] xl:w-[60%]">
          <h1 className=" text-5xl font-bold mb-4 ss:text-4xl">
            Monitor Your Vital Signs Just By Looking At Your Phone!
          </h1>
          <Link to="/vsm">
            <button className=" bg-input-blue p-5 rounded-lg text-primary font-bold mt-5">
              Activate VSM
            </button>
          </Link>
        </div>
      </VsmBgHero>
    </div>
  );
};

export default Hero;
