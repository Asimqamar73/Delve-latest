import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

function AppLayout() {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
}

export default AppLayout;
