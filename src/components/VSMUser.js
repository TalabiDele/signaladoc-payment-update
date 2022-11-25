import React, { useState, useContext } from "react";
import { useEffect } from "react";
import AuthContext from "../Context/AuthContext";

const VSMUser = () => {
  const [password, setPassword] = useState("");

  const {
    verifyUser,
    setError,
    setMessage,
    setApproved,
    username,
    setUsername,
    setIsForgot,
    setUserExists,
  } = useContext(AuthContext);

  useEffect(() => {
    setTimeout(() => {
      setApproved(false);
    }, 3000);
  }, []);

  const handleVerifyUser = (e) => {
    e.preventDefault();

    if (username === "") {
      setError(true);
      setMessage("Username field is required!");

      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (password === "") {
      setError(true);
      setMessage("Password field is required!");

      setTimeout(() => {
        setError(false);
      }, 3000);
    } else if (password === "" && username === "") {
      setError(true);
      setMessage("Password and username fields required!");

      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      verifyUser({ username, password });
    }
  };

  const handleForgot = () => {
    setIsForgot(true);
    setUserExists(false);
  };

  return (
    <div>
      <div className="" onSubmit={handleVerifyUser}>
        <form action=" " className="grid mt-10">
          <p className=" mb-5 text-[20px]">Enter your password to continue</p>
          <label
            htmlFor="username"
            className=" text-grey-text text-[12px] mb-2"
          >
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="johndoe@email.com"
            className=" border-none bg-input-blue rounded-md py-5 w-3/4 mb-10"
          />
          <label
            htmlFor="password"
            className=" text-grey-text text-[12px] mb-2"
          >
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="**********"
            className=" border-none bg-input-blue rounded-md py-5 w-3/4 mb-2"
          />

          <p
            className=" cursor-pointer font-bold mb-4 hover:text-primary"
            onClick={handleForgot}
          >
            Forgot Password?
          </p>

          <button className="bg-gradient-to-b from-grad-light to-grad-dark text-[20px] text-white w-1/4 py-4 rounded-md">
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default VSMUser;
