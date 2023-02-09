import { createContext, useEffect, useState } from "react";
import { json } from "react-router-dom";
import { API_URL, AUTH_API, TELEMEDICINE_URL } from "../Config";
import jwt from "jwt-decode";
import Cookies from "universal-cookie";
import { Navigate } from "react-router-dom";
import cookie from "cookie";
import useLocalStorage from "../components/hooks/useLocalStorage";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [stepOne, setStepOne] = useState(true);
  const [stepTwo, setStepTwo] = useState(false);
  const [stepThree, setStepThree] = useState(false);
  const [isEmail, setIsEmail] = useState(true);
  const [isCode, setIsCode] = useState(false);
  const [isDetails, setIsDetails] = useState(false);
  const [userExists, setUserExists] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [emailCode, setEmailCode] = useState(null);
  const [userId, setUserId] = useState(null);
  const [approved, setApproved] = useState(false);
  const [isPlan, setIsPlan] = useState(false);
  const [token, setToken] = useState("");
  const [plans, setPlans] = useState();
  const [isCheckout, setIsCheckout] = useState(false);
  const [user, setUser] = useState(null);
  const [discountId, setDiscountId] = useState();
  const [showBg, setShowBg] = useState(true);
  const [ref, setRef] = useState();
  const [isSuccess, setIsSuccess] = useState(false);
  const [username, setUsername] = useState("");
  const [isForgot, setIsForgot] = useState(false);
  const [isReset, setIsReset] = useState(false);
  const [isCodeReset, setIsCodeReset] = useState(false);
  const [isPaid, setIsPaid] = useState(false);
  const [isLogin, setIsLogin] = useState(false);
  const [selected, setSelected] = useLocalStorage("plan", null);
  const [type, setType] = useState();
  const [isType, setIsType] = useState("");
  const [regType, setRegType] = useState();
  const [firstname, setFirstname] = useState("");
  const [surname, setSurname] = useState("");
  const [photo, setPhoto] = useState("");
  const [email, setEmail] = useState("");
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const cookies = new Cookies();

  useEffect(() => {
    checkUserLoggedIn();
  }, []);

  // const navigate = Navigate();

  const validateEmail = async ({ username, type }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/user/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, type }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.exists) {
        setApproved(true);
        setUserExists(true);
        setIsEmail(false);
        // navigate("/login");

        setMessage(`${data.message}`);

        // setIsEmail(true);
        setIsCode(false);

        setTimeout(() => {
          setMessage("");
        }, 6000);
      } else {
        setApproved(true);
        setMessage(`${data.message}`);
        setIsType(data.data.type_string);
        setRegType(data.data.type);
        setUserExists(false);
        setTimeout(() => {
          setApproved(false);
          setMessage("");
        }, 6000);

        setEmailCode(data.data.code);

        setUserId(data.data.id);
        setIsCode(true);

        setIsDetails(true);
      }
    } else {
      setError(true);
      if (data.username) {
        setMessage(data.username[0]);

        setTimeout(() => {
          setError(false);
        }, 3000);

        setLoading(false);
      }

      setMessage(data.email[0]);

      setTimeout(() => {
        setError(false);
      }, 3000);

      setLoading(false);
    }

    setTimeout(() => {
      setError(false);
    }, 3000);

    setLoading(false);
  };

  const validateTeleEmail = async ({ username }) => {
    setLoading(true);

    const res = await fetch(`${TELEMEDICINE_URL}/user/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    if (res.ok) {
      if (data.exists) {
        setError(true);

        setMessage(`This user already exists. Login`);

        setIsCode(false);

        setTimeout(() => {
          setError(false);
        }, 6000);
      } else {
        setApproved(true);
        setMessage(`${data.message}`);
        setUserExists(false);
        setTimeout(() => {
          setApproved(false);
          setMessage("");
        }, 6000);

        setEmailCode(data.data.code);

        setUserId(data.data.id);
        setIsCode(true);

        setIsDetails(true);
      }
    } else {
      setError(true);

      setMessage(data.email[0]);

      setTimeout(() => {
        setMessage("");
      }, 3000);
    }

    setTimeout(() => {
      setError(false);
    }, 3000);

    setLoading(false);
  };

  const register = async ({
    firstName,
    surname,
    password,
    userId,
    emailCode,
    username,
    isType,
    regType,
  }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/user/auth/register/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registration_id: userId,
        first_name: firstName,
        surname: surname,
        password,
        code: emailCode,
        username,
        type: isType,
        registration_type: regType,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // setUser(data.user);
      cookie.serialize("jwt_authorization", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 1825,
        sameSite: "strict",
        path: "/",
      });

      setToken(data.access_token);
      setApproved(true);
      setMessage("Account created successfully!");
      setIsLogin(true);
      // setIsPlan(true);
      setIsDetails(false);
      setUser(data.user);
      setStepTwo(true);
      setIsLoggedOut(false);
      setTimeout(() => {
        setApproved(false);
        setMessage("");
      }, 4000);
    } else {
      if (data.first_name && data.surname && data.password) {
        setMessage(`All fields are required!`);
      } else if (data.first_name && data.surname) {
        setMessage("The first name & surname fields are required!");
      } else if (data.first_name && data.password) {
        setMessage("The first name & password fields are required!");
      } else if (data.surname && data.password) {
        setMessage("The surname & password fields are required!");
      } else if (data.surname) {
        setMessage(`${data.surname[0]}`);
      } else if (data.password) {
        setMessage(`${data.password[0]}`);
      } else if (data.first_name) {
        setMessage(`${data.surname[0]}`);
      }

      setError(true);

      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 4000);
    }

    setLoading(false);
  };

  const registerTele = async ({
    firstName,
    surname,
    password,
    userId,
    emailCode,
  }) => {
    setLoading(true);

    const res = await fetch(`${TELEMEDICINE_URL}/user/create`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        registration_id: userId,
        first_name: firstName,
        surname: surname,
        password,
        code: emailCode,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      // setUser(data.user);
      setApproved(true);
      setMessage("Account created successfully!");
      setIsPlan(true);
      setIsDetails(false);
      setUser(data.user);
      setStepTwo(true);
      setToken(data.access_token);
      setTimeout(() => {
        setApproved(false);
        setMessage("");
      }, 4000);
    } else {
      if (data.first_name && data.surname && data.password) {
        setMessage(`All fields are required!`);
      } else if (data.first_name && data.surname) {
        setMessage("The first name & surname fields are required!");
      } else if (data.first_name && data.password) {
        setMessage("The first name & password fields are required!");
      } else if (data.surname && data.password) {
        setMessage("The surname & password fields are required!");
      } else if (data.surname) {
        setMessage(`${data.surname[0]}`);
      } else if (data.password) {
        setMessage(`${data.password[0]}`);
      } else if (data.first_name) {
        setMessage(`${data.surname[0]}`);
      }

      setError(true);

      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 4000);
    }

    setLoading(false);
  };

  const verifyUser = async ({ username, password }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/user/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setApproved(true);
      setMessage(data.message);
      setIsCode(false);
      setIsEmail(false);
      setIsDetails(false);
      setStepTwo(true);
      setUserExists(false);
      setUser(data.user);
      setIsPlan(true);
      setToken(data.access_token);

      setTimeout(() => {
        setMessage("");
        setApproved(false);
      }, 4000);
    } else {
      setError(true);
      setMessage(data.error);

      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 4000);
    }

    setTimeout(() => {
      setMessage("");
      setApproved(false);
    }, 4000);

    setLoading(false);
  };

  const verifyTeleUser = async ({ username, password }) => {
    setLoading(true);

    const res = await fetch(`${TELEMEDICINE_URL}/user/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setApproved(true);
      setMessage(data.message);
      setIsCode(false);
      setIsEmail(false);
      setIsDetails(false);
      setStepTwo(true);
      setUserExists(false);
      setUser(data.user);
      setIsPlan(true);
      setToken(data.access_token);

      setTimeout(() => {
        setMessage("");
        setApproved(false);
      }, 4000);
    } else {
      setError(true);
      setMessage(data.error);

      setTimeout(() => {
        setError(false);
        setMessage("");
      }, 4000);
    }

    setTimeout(() => {
      setMessage("");
      setApproved(false);
    }, 4000);

    setLoading(false);
  };

  const submitVsmPayment = async ({ ref, discountId }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/subscription/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tx_ref: ref,
        discount_id: discountId,
      }),
    });

    const data = await res.json();
  };

  const submitTelePayment = async ({ ref, discountId }) => {
    setLoading(true);

    const res = await fetch(`${TELEMEDICINE_URL}/subscription/verify`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        tx_ref: ref,
        discount_id: discountId,
      }),
    });

    const data = await res.json();
  };

  const forgotPassword = async ({ username }) => {
    setLoading(true);

    const res = await fetch(`${AUTH_API}/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username }),
    });

    const data = await res.json();

    setUserId(data.user_id);

    if (res.ok) {
      setApproved(true);
      setMessage(data.message);
      setEmailCode(data.code);
      setUserId(data.user_id);

      setTimeout(() => {
        setApproved(false);
        setIsCodeReset(true);
        setIsForgot(false);
      }, 3000);
    } else {
      setError(true);
      setMessage(data.error);

      setTimeout(() => {
        setError(false);
      }, 3000);
    }
    setUserId(data.user_id);

    setLoading(false);
  };

  const resetVsmPassword = async ({ userId, password }) => {
    setLoading(true);

    const res = await fetch(`${AUTH_API}/forgot-password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setApproved(true);
      setMessage("Password reset successful! You can now login");

      setTimeout(() => {
        setApproved(false);
        setIsLogin(true);
        setIsCodeReset(false);
        setIsReset(false);
      }, 4000);
    } else {
      setError(true);
      setMessage(data.password[0]);

      setTimeout(() => {
        setError(false);
      }, 7000);
    }

    setLoading(false);
  };

  const resetTelePassword = async ({ userId, password }) => {
    setLoading(true);

    const res = await fetch(`${TELEMEDICINE_URL}/user/forgot-password/reset`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user_id: userId, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setApproved(true);
      setMessage("Password reset successful! You can now login");

      setTimeout(() => {
        setApproved(false);
        setUserExists(true);
        setIsReset(false);
      }, 4000);
    } else {
      setError(true);
      setMessage(data.password[0]);

      setTimeout(() => {
        setError(false);
      }, 7000);
    }

    setLoading(false);
  };

  const resendCode = async ({ userId }) => {
    setLoading(true);

    const res = await fetch(`${AUTH_API}/forgot-password/resend-code`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: userId }),
    });

    const data = await res.json();

    setIsCodeReset(true);

    setApproved(true);
    setMessage(data.message);

    setTimeout(() => {
      setApproved(false);
    }, 4000);
  };

  const login = async ({ username, password }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/user/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setApproved(true);
      setMessage(data.message);

      setUser(data.user);

      setIsLoggedOut(false);

      // navigate("/plans");

      setTimeout(() => {
        setApproved(false);
      }, 4000);
    } else {
      if (data.username) {
        setError(true);
        setMessage("Username field is required!");

        setTimeout(() => {
          setError(false);
        }, 4000);
      } else if (data.password) {
        setError(true);
        setMessage("Password field is required");

        setTimeout(() => {
          setError(false);
        }, 4000);
      } else {
        setError(true);
        setMessage(data.error);

        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    }

    setLoading(false);
  };

  const vsmLogin = async ({ username, password }) => {
    setLoading(true);

    const res = await fetch(`${API_URL}/user/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (res.ok) {
      setApproved(true);
      setMessage(data.message);

      setUser(data.user);

      setIsLoggedOut(false);

      setToken(data.access_token);

      cookie.serialize("jwt_authorization", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 1825,
        sameSite: "strict",
        path: "/",
      });

      setTimeout(() => {
        setApproved(false);
      }, 4000);

      setUser(data.user);

      // setIsPlan(true);
      setIsLogin(false);
    } else {
      if (data.username && data.password) {
        setError(true);
        setMessage("The ssername & password fields are required!");

        setTimeout(() => {
          setError(false);
        }, 4000);
      } else if (data.password) {
        setError(true);
        setMessage(data.password[0]);

        setTimeout(() => {
          setError(false);
        }, 4000);
      } else if (data.username) {
        setError(true);
        setMessage(data.username[0]);

        setTimeout(() => {
          setError(false);
        }, 4000);
      } else {
        setError(true);
        setMessage(data.error);

        setTimeout(() => {
          setError(false);
        }, 4000);
      }
    }

    setLoading(false);
  };

  const googleLogin = async ({ token, firstname, surname, photo, email }) => {
    setLoading(true);

    const res = await fetch(`${AUTH_API}/social/google`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        id_token: token,
        first_name: firstname,
        surname,
        photo,
        email,
        id: Math.floor(Math.random() * (999 - 100 + 1) + 100),
      }),
    });

    const data = await res.json();

    if (res.ok) {
      setUser(data.user);
      setToken(data.access_token);

      cookie.serialize("jwt_authorization", data.access_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV !== "development",
        maxAge: 60 * 60 * 24 * 1825,
        sameSite: "strict",
        path: "/",
      });

      setIsEmail(false);
      setIsLogin(false);
      setIsPlan(true);
    }

    setLoading(false);

    return <Navigate to="/activate/vsm/checkout" replace={true} />;
  };

  const checkUserLoggedIn = async () => {
    setToken(cookies.get("jwt_authorization"));

    const res = await fetch(`${API_URL}/user/detail`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${cookies.get("jwt_authorization")}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
      },
    });

    const data = await res.json();

    setUser(data.detail);
  };

  const logout = () => {
    setUser(null);
    // cookies.remove("jwt_authorization", "", {
    //   expires: new Date(0),
    // });

    cookie.serialize("jwt_authorization", "", {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      expires: new Date(0),
      sameSite: "strict",
      path: "/",
    });

    setIsLoggedOut(true);
    setUser(null);

    return <Navigate to="/activate/vsm/register" replace={true} />;
  };

  return (
    <AuthContext.Provider
      value={{
        stepOne,
        setStepOne,
        stepTwo,
        setStepTwo,
        stepThree,
        setStepThree,
        isEmail,
        setIsEmail,
        isCode,
        setIsCode,
        isDetails,
        setIsDetails,
        validateEmail,
        emailCode,
        setEmailCode,
        loading,
        setLoading,
        approved,
        setApproved,
        error,
        setError,
        message,
        setMessage,
        register,
        userId,
        verifyUser,
        userExists,
        setUserExists,
        isPlan,
        setIsPlan,
        plans,
        setPlans,
        token,
        isCheckout,
        setIsCheckout,
        user,
        discountId,
        setDiscountId,
        showBg,
        setShowBg,
        ref,
        setRef,
        isSuccess,
        setIsSuccess,
        submitTelePayment,
        verifyTeleUser,
        validateTeleEmail,
        registerTele,
        username,
        setUsername,
        forgotPassword,
        resetVsmPassword,
        resetTelePassword,
        isForgot,
        setIsForgot,
        isReset,
        setIsReset,
        setIsCodeReset,
        isCodeReset,
        resendCode,
        isPaid,
        setIsPaid,
        submitVsmPayment,
        isLogin,
        setIsLogin,
        login,
        vsmLogin,
        selected,
        setSelected,
        googleLogin,
        type,
        setType,
        isType,
        setIsType,
        regType,
        setRegType,
        email,
        setEmail,
        photo,
        setPhoto,
        surname,
        setSurname,
        firstname,
        setFirstname,
        setToken,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
