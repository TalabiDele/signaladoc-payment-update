import React, { useContext } from "react";
import AuthContext from "../Context/AuthContext";
import moment from "moment";
import { RAVE_KEY } from "../Config";
import { useFlutterwave, closePaymentModal } from "flutterwave-react-v3";

const VSMCheckout = () => {
  //   const [paymentError, setPaymentError] = useState();

  const {
    plans,
    user,
    discountId,
    ref,
    setRef,
    setIsSuccess,
    setIsCheckout,
    isPaid,
    setIsPaid,
    selected,
    setSelected,
  } = useContext(AuthContext);

  const config = {
    public_key: RAVE_KEY,
    tx_ref: Date.now(),
    amount: selected.amount,
    currency: "NGN",
    payment_options: "card,mobilemoney,ussd",
    customer: {
      email: user.email,
      phone_number: user.username,
      name: user.name,
    },
    customizations: {
      title: "Subscription",
      description: "Payment for VSM",
    },
  };

  const handleFlutterPayment = useFlutterwave(config);

  return (
    <div className=" w-[60%] mx-auto">
      {plans && (
        <div className=" bg-white mt-10 shadow-lg w-[30rem] p-10 rounded-md text-xl xs:w-[25rem] ss:w-[20rem] xs:mt-[5rem] ss:mt-[5rem] mx-auto">
          <p className=" text-2xl mb-5">Order Summary</p>
          <p className=" mb-3">
            Date: {moment(Date.now()).format("MMMM Do YYYY")}
          </p>
          <p className=" mb-3">Plan: {selected.period_string}</p>
          <p className=" mb-5">
            Price: <span className="">₦{selected.amount}</span>
          </p>
          <div className=" h-[0.5px] w-full bg-[#ccc] mb-5"></div>
          <div className=" font-bold flex items-center justify-between">
            <h2>Total:</h2>
            <span className=" text-primary">₦{selected.amount}</span>
          </div>
          <button
            onClick={() => {
              handleFlutterPayment({
                callback: (response) => {
                  setRef(response.tx_ref);
                  if (response.status === "successful") {
                    setIsPaid(true);
                    setIsSuccess(true);
                    setIsCheckout(false);
                  } else {
                    setIsPaid(false);
                  }

                  closePaymentModal();
                },
                onClose: () => {},
              });
            }}
            className=" bg-gradient-to-b from-grad-light to-grad-dark text-[20px] text-white w-full py-4 rounded-md mt-5"
          >
            Payment with Flutterwave
          </button>
        </div>
      )}
    </div>
  );
};

export default VSMCheckout;
