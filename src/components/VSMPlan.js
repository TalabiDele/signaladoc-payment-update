import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { API_URL } from "../Config";
import VSMSide from "./VSMSide";
import { useNavigate } from "react-router-dom";

const VSMPlan = () => {
  const {
    plans,
    setPlans,
    token,
    setLoading,
    loading,
    setIsPlan,
    setIsCheckout,
    setStepThree,
    setSelected,
    user,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    subscriptions();
  }, []);

  const subscriptions = async () => {
    setLoading(true);

    const res = await fetch(`${API_URL}/finance/subscription?env=dev`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
        "Access-Control-Allow-Headers":
          "Origin, X-Requested-With, Content-Type, Accept, x-client-key, x-client-token, x-client-secret, Authorization",
      },
    });

    const data = await res.json();

    setPlans(data.vsm);
    setLoading(false);
  };

  const handleCheckout = (e) => {
    setSelected(e);

    if (user) {
      navigate("/activate/vsm/checkout");
      setLoading(false);
    } else {
      navigate("/activate/vsm/register");
      setLoading(false);
    }

    // setIsPlan(false);
    // setIsCheckout(true);
    // setStepThree(true);
  };

  return (
    <div className="flex fixed right-0 left-0 -z-10 xs:flex-col ss:flex-col xs:h-[90vh] ss:h-[100vh] overflow-y-scroll mt-[3rem] pb-[4rem]">
      <VSMSide />
      <div className=" mt-5 w-[70%] mx-auto ss:my-[5rem] xs:my-[5rem] ss:w-[100%] xs:w-[100%]">
        {loading && !plans && (
          <div className=" w-[20rem] h-[100vh] mx-auto grid justify-items-center items-center">
            <button
              disabled
              type="button"
              className="py-4 w-2/4 mx-auto px-5 mr-2 text-4xl font-medium text-gray-900 bg-white rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-2 focus:ring-blue-700 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 items-center"
            >
              <svg
                role="status"
                className="inline mr-2 w-10 h-10 text-gray-200 animate-spin dark:text-gray-600"
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
            </button>
          </div>
        )}
        <div className=" flex gap-10 xs:flex-col ss:flex-col w-[70%] mx-auto">
          {plans &&
            plans.map((e) => (
              <div
                key={e.id}
                className=" grid justify-items-center bg-gradient-to-b from-grad-light to-grad-dark text-white w-2/4 rounded-lg px-10 shadow-xl py-10 mx-auto ss:w-full xs:w-full sm:w-full sm:py-5 sm:px-10 lg:py-5 lg:w-full"
              >
                <h2 className=" text-[24px] mb-5 capitalize">
                  {e.type_string}
                </h2>
                <div className=" h-[10rem] w-[10rem] rounded-full bg-white text-primary grid text-center items-center mb-10 sm:mb-5">
                  <p className=" text-center text-[28px] leading-none grid">
                    ₦{e.amount} <br />{" "}
                    <small className=" text-[16px]">{e.period_string}</small>
                  </p>
                </div>

                <ul className="text-[20px] mb-5">
                  <li className=" list-disc mb-3">Respiratory Rate</li>
                  <li className=" list-disc mb-3">Mental Stress Levels</li>
                  <li className=" list-disc mb-3">Oxygen Saturation</li>
                  <li className=" list-disc mb-3">Blood Pressure</li>
                </ul>

                <button
                  className=" bg-white text-primary py-3 w-[100%] rounded-md text-[20px]"
                  onClick={() => handleCheckout(e)}
                >
                  Choose Plan
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default VSMPlan;
