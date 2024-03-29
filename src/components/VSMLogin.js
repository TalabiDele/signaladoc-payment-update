import React, { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
// import { Link } from "react-router-dom";
import { Navigate, Link } from "react-router-dom";

import { GrFormViewHide, GrFormView } from "react-icons/gr";
import Validation from "./Validation";

// import { GoogleLogin } from "react-google-login";
// import GoogleLogin from "react-google-login";

const VSMLogin = () => {
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [show, setShow] = useState(false);
  const [userData, setUserData] = useState();

  const {
    login,
    userId,
    emailCode,
    loading,
    setMessage,
    setError,
    setIsLogin,
    setIsEmail,
    vsmLogin,
    setIsForgot,
    setUserExists,
    token,
    setToken,
    googleLogin,
    setLoading,
    firstname,
    setFirstname,
    surname,
    setSurname,
    photo,
    setPhoto,
    email,
    setEmail,
    user,
  } = useContext(AuthContext);

  const handleLogin = (e) => {
    e.preventDefault();
    vsmLogin({
      username,
      password,
    });
  };

  const handleForgot = () => {
    setIsForgot(true);
    setIsLogin(false);
  };

  const handleRegister = () => {
    setIsLogin(false);
    setIsEmail(true);
  };

  const handleGoogleSignin = (
    tokenId,
    initial,
    username,
    lastname,
    picture
  ) => {
    googleLogin({
      token: tokenId,
      firstname: initial,
      surname: lastname,
      photo: picture,
      email: username,
    });
  };

  return (
    <>
      {user && <Navigate to="/activate/vsm/checkout" replace={true} />}

      <div className=" w-2/4 h-[100vh] overflow-y-scroll xs:w-full ss:w-full ss:h-[90vh] xs:h-[90vh] sm:h-[90vh]">
        <div className=" relative top-[3rem] left-20 right-0 w-[80%] sm:left-10 xs:w-[80%] xs:left-0 xs:top-[2rem] xs:mx-auto ss:w-[80%] ss:left-0 ss:mx-auto ss:top-[3rem] sm:top-[1rem]">
          <form
            action=" "
            className="grid mt-5 ss:mt-[5rem] xs:mt-[5rem]"
            onSubmit={handleLogin}
          >
            <p className=" mb-5 text-[20px] font-bold">Login</p>
            <Validation />

            <GoogleLogin
              onSuccess={(credentialResponse) => {
                const decoded = jwt_decode(credentialResponse.credential);
                setUserData(decoded);
                const tokenId = credentialResponse.credential;
                const initial = decoded.given_name;
                const username = decoded.email;
                const lastname = decoded.family_name;
                const picture = decoded.picture;

                handleGoogleSignin(
                  tokenId,
                  initial,
                  username,
                  lastname,
                  picture
                );
              }}
              onError={() => {
                console.log("Login Failed");
              }}
              useOneTap
            />

            <div className=" flex items-center mt-5">
              <div className=" h-[1px] w-[50%] bg-input-blue"></div>
              <p className="font-bold text-[20px] mx-4">or</p>
              <div className=" h-[1px] w-[50%] bg-input-blue"></div>
            </div>
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
              className=" border-none bg-input-blue rounded-md py-5 px-5 w-full mb-2 lg:w-full sm:w-full xs:w-full ss:w-full  "
            />
            <label
              htmlFor="password"
              className=" text-grey-text text-[12px] mb-2"
            >
              Password
            </label>
            <div className=" relative">
              <div className="absolute right-5 top-5 text-3xl">
                {show ? (
                  <GrFormViewHide
                    onClick={() => setShow(false)}
                    className="text-primary"
                    color="#1665D2"
                  />
                ) : (
                  <GrFormView
                    onClick={() => setShow(true)}
                    className="text-primary"
                    color="#1665D2"
                  />
                )}
              </div>
              <input
                type={show ? "text" : "password"}
                id="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder={`*********`}
                className=" border-none bg-input-blue rounded-md py-5 px-5 w-full mb-2 lg:w-full sm:w-full xs:w-full ss:w-full "
              />
            </div>

            <div className=" flex justify-between">
              <p
                className=" xs:text-sm ss:text-sm cursor-pointer font-bold mb-4 hover:text-primary"
                onClick={handleForgot}
              >
                Forgot Password?
              </p>

              <p className="mb-10 text-right xs:text-sm ss:text-sm">
                Don't have an account?{" "}
                <Link to="/activate/vsm/register">
                  <span
                    className=" font-bold text-primary hover:text-grad-light cursor-pointer transition-all duration-300 ease-in-out"
                    onClick={handleRegister}
                  >
                    Sign up
                  </span>{" "}
                </Link>
              </p>
            </div>
            {loading ? (
              <button
                disabled
                type="button"
                className="py-4 w-2/4 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center"
              >
                <svg
                  role="status"
                  class="inline mr-2 w-4 h-4 text-gray-200 animate-spin dark:text-gray-600"
                  viewBox="0 0 100 101"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                    fill="currentColor"
                  />
                  <path
                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                    fill="#1C64F2"
                  />
                </svg>
                Loading...
              </button>
            ) : (
              <button className="bg-gradient-to-b from-grad-light to-grad-dark text-[20px] text-white w-1/4 py-4 rounded-md">
                Login
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default VSMLogin;
