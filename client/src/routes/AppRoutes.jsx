import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppLayout from "../layouts/AppLayout";
import Home from "../pages/home/Home";
import Login from "../pages/login/Login";
import Login2 from "../pages/login/Login2";
import SignUp from "../pages/signUp/SignUp";
import Login3 from "../pages/login/Login3";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/login2" element={<Login2 />} />
        <Route path="/login3" element={<Login3 />} />

        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
