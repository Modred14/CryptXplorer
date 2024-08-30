import React, { useState } from "react";
import ThreeDBackground from "./ThreeDBackground";
import { IoEyeOff, IoEye } from "react-icons/io5";
import { auth } from "./firebase";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";

const LandingPage = () => {
  const [password, setPassword] = useState("");
  const [maskPassword, setMaskPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const [goodMessage, setGoodMessage] = useState("");
  const navigate = useNavigate();

  const handlePasswordChange = (e) => {
    const realPassword = e.target.value;
    if (realPassword.length <= 15) {
      setPassword(realPassword);
      const masked = "*".repeat(realPassword.length);
      setMaskPassword(masked);
    }
  };

  const togglePassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setGoodMessage("User signed in successfully");
      setMessage("");
      setTimeout(() => {
        navigate("/vault");
        window.location.reload();
      }, 1500);
    } catch (error) {
      if (error.code === "auth/invalid-credential") {
        setMessage(`Sign-in error: Invalid credentials`);
        setGoodMessage("");
      } else {
        setMessage(`Sign-in error: ${error.message}`);
        setGoodMessage("");
      }
    }
  };

  return (
    <div>
      <ThreeDBackground />
      <div className="absolute top-1/4 left-1/2 transform -translate-x-1/2 w-full max-w-md">
        <div className="flex justify-center rounded-2xl items-center">
          <div className=" p-6 bg-black shadow-2xl mb-24 w-96 rounded-2xl outline-white  text-white">
            <div>
              <p
                className={`text-2xl flex justify-center font-bold font-serif ${
                  message || goodMessage ? "mt-5" : "mt-5"
                }`}
              >
                CryptXplorer - Sign In
              </p>
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
              <form onSubmit={handleSubmit}>
                <div className="mt-5">
                  <p className="flex justify-start font-bold font-serif text-gray-400">
                    Email
                  </p>
                  <input
                    type="email"
                    placeholder="cryptxplorer@example.com"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`mt-2 h-12 block w-full px-3 py-2 text-gray-400 bg-gray-900 border border-slate-300 rounded-md text-xl shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-gry-500 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
             `}
                  />
                </div>
                <div className="mt-5 relative">
                  <p className="flex justify-start font-bold font-serif text-gray-400">
                    Passcode
                  </p>
                  <a
                    href="/passcode-reset"
                    className="ml-48 -mt-6 absolute"
                    style={{ paddingLeft: "2px" }}
                  >
                    Forgot Passcode?
                  </a>
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    required
                    value={password}
                    onChange={handlePasswordChange}
                    className={`mt-2 h-12 block w-full px-3   bg-gray-900 border border-slate-300 rounded-md shadow-sm placeholder-slate-400
              focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
              disabled:bg-gry-500 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none
              ${password.length == 0 ? "pt-2" : "py-2"} ${
                      showPassword && password.length > 0
                        ? "text-gray-400 text-xl"
                        : "text-gray-900 text-3xl "
                    }
                  `}
                  />
                  <div style={{ pointerEvents: "none" }}>
                    {!showPassword && (
                      <p
                        className={`absolute -mt-10 ml-3 text-3xl text-gray-400 ${
                          showPassword ? "hidden" : "block"
                        }`}
                        style={{ paddingTop: "3px" }}
                      >
                        {maskPassword}
                      </p>
                    )}
                  </div>
                  <div
                    className="flex absolute justify-end ml-72 -mt-8 -pt-1"
                    style={{ paddingLeft: "13px", marginTop: "-33px" }}
                  >
                    {showPassword ? (
                      <div
                        className="icon-container-1"
                        onClick={togglePassword}
                      >
                        <IoEyeOff size={19} />
                      </div>
                    ) : (
                      <div
                        className="icon-container-2"
                        onClick={togglePassword}
                      >
                        <IoEye size={19} />
                      </div>
                    )}
                  </div>
                </div>

                <a href="/signup" className="mt-8 absolute">
                  Sign Up
                </a>
                <div className="flex justify-end ">
                  <button
                    className="bg-gray-900 border mt-5 focus:outline-none focus:border-sky-500 focus:ring-1 focus:ring-sky-500
         border-slate-300 shadow-sm"
                  >
                    Enter
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
