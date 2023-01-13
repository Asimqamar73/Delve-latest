import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "./footer/Footer";
import Navbar from "./navbar/Navbar";

function AppLayout() {
  return (
    <div className="">
      <Navbar />
      <div className="">
        <Outlet />
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default AppLayout;
