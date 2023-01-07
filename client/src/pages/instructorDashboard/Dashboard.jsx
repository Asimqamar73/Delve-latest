import React from "react";
import { useSelector } from "react-redux";
import Logo from "../../components/commonComponents/Logo";
import profileImg from "../../assets/images/profileImg.jpg";
import { NavLink, Outlet } from "react-router-dom";
import { MdOndemandVideo } from "react-icons/md";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";
import { TfiStatsUp } from "react-icons/tfi";

function Dashboard() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="">
      <div className="grid grid-cols-6 min-h-screen">
        <div className="col-span-1 py-2 px-8 bg-base-200 top-0 ">
          <div>
            <Logo />
          </div>
          <div className="my-8 gap-4">
            <ul className="font-bold flex flex-col gap-4">
              <li className="flex items-center gap-2">
                <MdOndemandVideo />
                <NavLink to="/instructor/dashboard/">Courses</NavLink>
              </li>
              <li className="flex items-center gap-2">
                <HiOutlineChatBubbleLeft />
                <NavLink to="/instructor/dashboard/communication">
                  Communication
                </NavLink>
              </li>
              <li className="flex items-center gap-2">
                <TfiStatsUp />
                <NavLink to="/instructor/dashboard/performance">
                  Performance
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-span-5">
          <div className="flex justify-end py-2 px-8">
            <div className="avatar">
              <div className="w-12 rounded">
                <img src={profileImg} alt="" />
              </div>
            </div>
          </div>
          <div className="mx-8 my-2 ">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
