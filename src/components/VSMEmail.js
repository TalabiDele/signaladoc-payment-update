import React, { useContext } from "react";
import Steps from "./Steps";
import AuthContext from "../Context/AuthContext";
import VSMCode from "./VSMCode";
import VSMRegister from "./VSMRegister";
import VSMUser from "./VSMUser";
import VSMPlan from "./VSMPlan";
import VSMCheckout from "./VSMCheckout";
import VSMSide from "./VSMSide";
import VSMSuccess from "./VSMSuccess";
import ForgotVsmPassword from "./ForgotPassword";
import CodeReset from "./CodeReset";
import VsmReset from "./VsmReset";
import Login from "./UserLogin";
import VSMLogin from "./VSMLogin";
import VsmLogin from "./VSMLogin";
import { GoogleLogin } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";

const VSMEmail = () => {
  const { showBg } = useContext(AuthContext);

  const {
    isEmail,
    isCode,
    isDetails,
    validateEmail,
    userExists,
    isPlan,
    isCheckout,
    isSuccess,
    error,
    approved,
    message,
    setError,
    setMessage,
    loading,
    setLoading,
    isForgot,
    username,
    setUsername,
    isCodeReset,
    isReset,
    setIsLogin,
    setIsEmail,
    isLogin,
    setType,
    type,
    googleLogin,
  } = useContext(AuthContext);

  const handleChange = (e) => {
    setUsername(e.target.value);

    if (username.includes("@")) {
      setType("email");
    }

    if (username.includes("+234")) {
      setType("phone");
    }
  };

  const handleEmailVerify = (e) => {
    e.preventDefault();

    if (username.includes("@")) {
      setType("email");
    }

    if (username.includes("+234")) {
      setType("phone");
    }

    if (username === "") {
      setError(true);
      setMessage("Email field is required!");

      setTimeout(() => {
        setMessage("");
        setError(false);
        setLoading(false);
      }, 3000);
    }

    validateEmail({ username, type });
  };

  const handleLogin = () => {
    setIsLogin(true);
    setIsEmail(false);
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
    <div className="flex fixed right-0 left-0 -z-10 xs:flex-col ss:flex-col">
      {showBg && <VSMSide />}
      <div
        className={`${
          showBg ? "xs:hidden ss:hidden" : ""
        } w-2/4 h-[100vh] overflow-y-scroll xs:w-full ss:w-full ss:h-[90vh] xs:h-[90vh] sm:h-[90vh]`}
      >
        <div className=" relative top-[3rem] left-20 right-0 w-[80%] sm:left-10 xs:w-[80%] xs:left-0 xs:top-[2rem] xs:mx-auto ss:w-[80%] ss:left-0 ss:mx-auto ss:top-[3rem] sm:top-[1rem]">
          {isEmail && (
            <div className=" xs:hidden ss:hidden">
              <h1 className="font-bold text-5xl mb-10 lg:text-3xl sm:text-3xl sm:mb-5 ">
                <span className=" text-primary">Monitor Your Vital Signs</span>{" "}
                Just By Looking At Your Phone!
              </h1>
            </div>
          )}

          {/* <Steps /> */}

          {approved && (
            <div
              id="toast-success"
              className={` ${
                !approved ? "hidden" : ""
              } flex items-center p-4 my-4 w-full max-w-xl text-gray-500 bg-white rounded-lg shadow ss:mt-[5rem] xs:mt-[5rem]`}
              role="alert"
            >
              <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Check icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">{message}</div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-success"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          {error && (
            <div
              id="toast-danger"
              className="flex items-center p-4 my-4 w-full max-w-xl text-gray-500 bg-white rounded-lg shadow ss:mt-[5rem] xs:mt-[5rem]"
              role="alert"
            >
              <div className="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Error icon</span>
              </div>
              <div className="ml-3 text-sm font-normal">{message}</div>
              <button
                type="button"
                className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
                data-dismiss-target="#toast-danger"
                aria-label="Close"
              >
                <span className="sr-only">Close</span>
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
          )}

          {isEmail && (
            <form
              action=""
              className=" grid mt-10 ss:mt-[5rem] xs:mt-[5rem]"
              onSubmit={handleEmailVerify}
            >
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  const decoded = jwt_decode(credentialResponse.credential);
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

              <p className=" text-[20px] mb-5 ss:text-lg">
                Enter Your Email Address or Phone Number To Get Started!
              </p>

              <label
                htmlFor="username"
                className=" text-grey-text text-[12px] mb-2"
              >
                Email Address or Phone Number
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={username}
                onChange={(e) => handleChange(e)}
                placeholder="johndoe@email.com or +2348012345678"
                className=" border-none bg-input-blue rounded-md py-5 w-full mb-2 lg:w-full sm:w-full xs:w-full ss:w-full"
              />
              <p className="mb-10 text-right">
                Already have an account?{" "}
                <Link to="/activate/vsm/login">
                  <span
                    className=" font-bold text-primary hover:text-grad-light cursor-pointer transition-all duration-300 ease-in-out"
                    // onClick={handleLogin}
                  >
                    Login
                  </span>{" "}
                </Link>
              </p>
              {loading ? (
                <button
                  disabled
                  type="button"
                  className="py-4 px-5 mr-2 text-sm font-medium text-gray-900 bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 inline-flex items-center w-1/4"
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
                  Next
                </button>
              )}
            </form>
          )}

          {isCode && <VSMCode />}

          {/* {isDetails && <VSMRegister />} */}

          {userExists && <VSMUser />}

          {/* {isPlan && <VSMPlan />} */}

          {isCheckout && <VSMCheckout />}

          {isSuccess && <VSMSuccess />}

          {isForgot && <ForgotVsmPassword />}

          {isCodeReset && <CodeReset />}

          {isReset && <VsmReset />}

          {isLogin && <VsmLogin />}
        </div>
      </div>
    </div>
  );
};

export default VSMEmail;
