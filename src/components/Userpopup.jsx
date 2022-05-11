import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogoutUser } from "../store/UserSlice";

const Userpopup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    navigate("/");
    dispatch(setLogoutUser());
  };

  const email = useSelector((state) => state.user.userEmail);
  const name = email.split("@")[0];

  return (
    <div className="shadow-2xl shadow-slate-600 rounded-lg flex flex-col gap-4 w-72 p-5 items-center absolute top-10 right-8  bg-white">
      <div className="flex flex-col items-center">
        <img
          className="rounded-full w-14 h-14"
          src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
          alt="user"
        />
        <h1 className="font-medium text-base">{name}</h1>
        <h2 className="text-sm">{email}</h2>
      </div>
      <div className="">
        <button className="border-2 px-3 py-2" onClick={handleLogout}>
          Sign out
        </button>
      </div>
      <div className="flex gap-3 text-sm ">
        <h4>Privacy Policy</h4>
        <h4>Terms of Service</h4>
      </div>
    </div>
  );
};

export default Userpopup;
