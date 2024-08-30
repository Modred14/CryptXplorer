import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./LandingPage";
import SignUp from "./SignUp";
import ForgetPassword from "./ForgetPassword";

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/vault" element={<App />} />  
        <Route path="/signup" element={<SignUp />} />
        <Route path="/passcode-reset" element={<ForgetPassword />} />
      </Routes>
    </Router>
  );
};
export default AppRouter;
