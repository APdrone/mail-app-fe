import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Loginpage from "../pages/Loginpage";
import Registerpage from "../pages/Registerpage";
import Homepage from "../pages/Homepage";
import Startpage from "../pages/Startpage";
import { useSelector } from "react-redux";

const UserRoutes = () => {
  const isLogged = useSelector((state) => state.user.isLoggedIn);
  return (
    <Routes>
      <Route path="/" element={<Startpage />} />
      <Route path="/login" element={<Loginpage />} />
      <Route path="/register" element={<Registerpage />} />
      {isLogged && <Route path="/home" element={<Homepage />} />}
      <Route path="*" element={<Navigate replace to="/" />} />
      <Route path="/home" element={<Homepage />} />
    </Routes>
  );
};

export default UserRoutes;
