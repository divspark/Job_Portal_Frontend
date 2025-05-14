import React from "react";
import Navbar from "../../components/recruiter-view/navbar";
import LogInComponent from "../../components/recruiter-view/log-in";

const Login = () => {
  return (
    <div className="flex flex-col w-full">
      <Navbar />
      <LogInComponent />
    </div>
  );
};

export default Login;
