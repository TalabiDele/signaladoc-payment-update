import React, { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import logo from "../imgs/logo.png";
import { useLocation, Navigate, Link, useNavigate } from "react-router-dom";

const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();

  const { logout, user, isLoggedOut } = useContext(AuthContext);

  const location = useLocation();

  const handleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
    navigate("/activate/vsm/login");

    setIsOpen(false);
  };

  return (
    <div className="">
      {isLoggedOut && <Navigate to="/activate/vsm/register" />}
      <div className=" xs:bg-primary ss:bg-primary h-20 left-0 right-0 fixed bg-none z-[100]">
        <div className="flex justify-between items-center mx-auto w-[95%] fixed left-0 right-0 top-5 z-[60]">
          <img src={logo} alt="" />
          <div
            className={` cursor-pointer relative z-[100]`}
            onClick={() => handleOpen()}
          >
            <div
              className={` ${
                isOpen
                  ? "rotate-[45deg] mb-0 right-0 bottom-2 xs:bg-primary ss:bg-primary"
                  : "xs:bg-white ss:bg-white"
              } ${
                location.pathname === "/" && !isOpen ? "bg-white" : "bg-primary"
              } h-[4px] w-[40px] rounded-sm mb-2 absolute right-0 bottom-2 transition-all duration-200 ease-in-out`}
            ></div>
            <div
              className={` ${
                isOpen
                  ? "rotate-[135deg] mb-0 right-0 bottom-2 xs:bg-primary ss:bg-primary"
                  : "xs:bg-white ss:bg-white"
              } ${
                location.pathname === "/" && !isOpen ? "bg-white" : "bg-primary"
              } h-[4px] w-[40px] rounded-sm mb-2 absolute right-0 bottom-0`}
            ></div>
            <div
              className={` ${isOpen ? " hidden" : ""} ${
                location.pathname === "/" && !isOpen ? "bg-white" : "bg-primary"
              } h-[4px] w-[40px] xs:bg-white ss:bg-white rounded-sm absolute right-0 bottom-0`}
            ></div>
          </div>
        </div>
        <ul
          className={`${
            isOpen ? "translate-x-0" : "translate-x-96"
          } justify-between w-1/5 fixed h-[100vh] top-0 bottom-0 right-0 text-right bg-white shadow-lg z-[50] transition-all duration-300 ease-in-out pt-20 pr-16 xs:w-3/5 ss:w-4/5 sm:w-2/5`}
        >
          <li className=" mb-10">
            <a
              href="https://www.signaladoc.com/about"
              className=" text-[16px] hover:border-b-2 hover:border-b-primary pb-3 transition-all duration-75 ease-in-out"
            >
              About us
            </a>
          </li>
          <li className=" mb-10 ">
            <a
              href="https://www.signaladoc.com/faq"
              className=" text-[16px] hover:border-b-2 hover:border-b-primary pb-3 transition-all duration-75 ease-in-out"
            >
              FAQ
            </a>
          </li>
          <li className=" mb-10 ">
            <a
              href="https://www.signaladoc.com/privacy-policy"
              className=" text-[16px] hover:border-b-2 hover:border-b-primary pb-3 transition-all duration-75 ease-in-out"
            >
              Privacy Policy
            </a>
          </li>
          <li className=" mb-10 ">
            <a
              href="https://signaladoc.com/vitalsignsmonitoring/terms-and-conditions"
              className=" text-[16px] hover:border-b-2 hover:border-b-primary pb-3 transition-all duration-75 ease-in-out"
            >
              Terms & Conditions
            </a>
          </li>
          {user && (
            <li className=" mt-[10rem]  ">
              {/* <Link to="/activate/vsm/register"> */}
              <button
                className=" text-[16px] hover:border-b-2 hover:border-b-primary pb-3 transition-all duration-75 ease-in-out text-primary font-bold"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
              {/* </Link> */}
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Nav;
