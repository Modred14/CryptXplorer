import React, { useState, useEffect } from "react";
// import Loading from "./Loading";
import "firebase/auth";
import { sendPasswordResetEmail } from "firebase/auth";
import { FaEnvelope } from "react-icons/fa";
import { auth } from "./firebase";
import ThreeDBackground from "./ThreeDBackground";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState(1);

  const sendEmail = async () => {
    await sendPasswordResetEmail(auth, email);
    setGoodMessage(
      "Another password reset email has been sent to your email. Kindly check your email."
    );
    setMessage("")
  };

  const handleEmailSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://app-scissors-api.onrender.com/users`
      );
      const data = await response.json();
      const userExists = data.some((user) => user.email === email);

      if (!userExists) {
        setGoodMessage("The email exists, loading user credentials.");
        setMessage("")
        await sendPasswordResetEmail(auth, email);
        setStep(2);
      } else {
        setMessage(
          "Email does not exist. Please check your email and try again, or enter another email."
        );
        setGoodMessage("")
        return;
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setMessage("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    // return <Loading />;
  }

  return (
    <div className="w-full">
      <ThreeDBackground />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="flex justify-center rounded-2xl items-center">
          <div className=" p-6 bg-black shadow-2xl mb-24 w-96 rounded-2xl outline-white  text-white">
            {message && (
              <div className="bg-red-700 mt-5 p-1 rounded-md text-center">
                {message}
              </div>
            )}
            {goodMessage && (
              <div className="bg-green-700 mt-5 p-1 rounded-md text-center">
                {goodMessage}
              </div>
            )}
            {step == 1 ? (
              <div className="py-10">
                <form onSubmit={handleEmailSubmit}>
                  <h2 className="mb-8 -mt-3 text-2xl font-bold text-center ">
                    Forgot Passcode
                  </h2>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-base font-medium "
                  >
                    Enter your email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`mt-2 h-12 block w-full px-3 py-2 text-gray-400 bg-gray-900 border border-slate-300 rounded-md text-xl shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-gry-500 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             `}
                  />
                  <div className="w-full flex justify-end">
                    <button
                      type="submit"
                      className=" px-5 py-1 bg-gray-900 border mt-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
                    border-slate-300 shadow-sm"
                    >
                      Submit
                    </button>
                  </div>
                </form>
                <p className="mt-1">
                  Go back to <a href="/">Sign in</a> page
                </p>
              </div>
            ) : (
              <div className="flex  flex-col items-center">
                <FaEnvelope className="text-green-800 text-7xl mb-2" />
                <h2 className="text-2xl font-semibold mb-2">
                  Check Your Email
                </h2>
                <p className="text-gray-400 text-center max-w-xl mx-2">
                  We have sent a password reset link to your email address{" "}
                  <b>&quot;{email}&quot;</b>. Please check your inbox and follow
                  the instructions to reset your password.
                </p>
                <br />
                <p className="text-gray-400 text-center max-w-xl mx-2">
                  Click this{" "}
                  <a
                    className="underline hover:no-underline"
                    onClick={sendEmail}
                  >
                    link
                  </a>{" "}
                  if you didn't receive the email to request another one.
                </p>
              </div>
            )}
          </div>{" "}
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;
