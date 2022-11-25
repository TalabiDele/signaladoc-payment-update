import React, { useState, useContext } from "react";
import AuthContext from "../Context/AuthContext";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [surname, setSurname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { registerTele, userId, emailCode, loading, setMessage, setError } =
    useContext(AuthContext);

  const handleRegister = (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("Passwords do no match!");
      setError(true);

      setTimeout(() => {
        setError(false);
      }, 3000);
    } else {
      registerTele({
        password,
        surname,
        firstName,
        userId,
        emailCode,
      });
    }
  };

  return (
    <div className=" w-full">
      <div className=" w-full">
        <form action=" " className="grid mt-10" onSubmit={handleRegister}>
          <p className=" mb-5 text-[28px] font-bold">Register</p>
          <label
            htmlFor="firstName"
            className=" text-grey-text text-[12px] mb-2"
          >
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="John"
            className=" border-none bg-input-blue rounded-md py-5 px-5 w-full mb-10 lg:w-full sm:w-full xs:w-full ss:w-full "
          />
          <label htmlFor="surname" className=" text-grey-text text-[12px] mb-2">
            Surname
          </label>
          <input
            type="text"
            id="surname"
            name="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
            placeholder="Doe"
            className=" border-none bg-input-blue rounded-md py-5 px-5 w-full mb-10 lg:w-full sm:w-full xs:w-full ss:w-full "
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
            className=" border-none bg-input-blue rounded-md py-5 px-5 w-full mb-10 lg:w-full sm:w-full xs:w-full ss:w-full "
          />
          <label
            htmlFor="confirmPassword"
            className=" text-grey-text text-[12px] mb-2"
          >
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="**********"
            className=" border-none bg-input-blue rounded-md py-5 px-5 w-full mb-10 lg:w-full sm:w-full xs:w-full ss:w-full "
          />
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
              Next
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default Register;
