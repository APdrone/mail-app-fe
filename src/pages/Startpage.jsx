import React from "react";
import { Link } from "react-router-dom";
import LoginNavbar from "../components/LoginNavbar";

const Startpage = () => {
  return (
    <div>
      <LoginNavbar />
      <div className="flex items-center ">
        <div className="basis-1/2 px-32 font-medium antialiased flex flex-col gap-11">
          <h1 className="text-7xl">Secure, smart, and easy to use email</h1>
          <p className="text-xl text-slate-500 font-normal">
            Get more done with Gmail. Now integrated with Google Chat, Google
            Meet, and more, all in one place.
          </p>
          <Link to="/register">
            <button className="text-white bg-blue-500 self-start px-6 py-4 rounded-md font-medium">
              Create an account
            </button>
          </Link>
        </div>
        <div className="basis-1/2">
          <img
            src="https://lh3.googleusercontent.com/wu38duO7lcEY0BCo6qTkwcrOx5oFwFNLHRYud6POTb-URmZ2jlXHLq5PAUFGCUcVew7zCK-C4aNKuMSF-SQxU-5Vu4fjM_E2WWp-S_Y=rw-e365-w2880"
            alt="google logo"
          />
        </div>
      </div>
    </div>
  );
};

export default Startpage;
