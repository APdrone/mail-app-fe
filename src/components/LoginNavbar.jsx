import React from "react";
import { Link } from "react-router-dom";

const LoginNavbar = () => {
  return (
    <div>
      <div className="navbar shadow-lg">
        <div className="flex justify-between items-center p-3 mx-3  ">
          <div className="logo-container flex justify-start items-center gap-1.5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <h2 className="text-3xl">Mail</h2>
          </div>
          <div className="flex gap-3">
            <Link to="/login">
              <button className="px-6 py-3 border-2 text-blue-500 font-medium rounded-md">
                Sign in
              </button>
            </Link>
            <Link to="/register">
              <button className="px-6 py-3 border-2 text-white font-medium bg-blue-500 rounded-md">
                Create an account
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginNavbar;
