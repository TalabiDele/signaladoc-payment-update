import React, { useContext, useEffect } from "react";
import AuthContext from "../Context/AuthContext";
import { API_URL } from "../Config";

const VSMPlan = () => {
  const {
    plans,
    setPlans,
    token,
    setLoading,
    setIsPlan,
    setIsCheckout,
    setStepThree,
    setDiscountId,
    selected,
    setSelected,
  } = useContext(AuthContext);

  useEffect(() => {
    subscriptions();
  }, []);

  const subscriptions = async () => {
    setLoading(true);

    const res = await fetch(`${API_URL}/finance/subscription?env=dev`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    console.log(data.vsm);

    setPlans(data.vsm);

    // data.fees.forEach((e) => {
    //   setPlans(e);
    //   setDiscountId(e.id);
    // });
  };

  const handleCheckout = (e) => {
    setSelected(e);

    console.log(e);

    console.log(selected);

    setIsPlan(false);
    setIsCheckout(true);
    setStepThree(true);
  };

  return (
    <div>
      <div className=" mt-5 w-[90%] mx-auto">
        <p className=" text-center text-2xl mb-5">
          {/* Enjoy Amazing discount on every consultation */}
        </p>
        <div className=" flex gap-10">
          {plans &&
            plans.map((e) => (
              <div
                key={e.id}
                className=" grid justify-items-center bg-gradient-to-b from-grad-light to-grad-dark text-white w-2/4 rounded-lg px-10 shadow-xl py-10 mx-auto ss:w-full xs:w-full sm:w-full sm:py-5 sm:px-10 lg:py-5 lg:w-full"
              >
                <h2 className=" text-[24px] mb-5 capitalize">
                  {e.type_string}
                  {console.log(e)}
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
