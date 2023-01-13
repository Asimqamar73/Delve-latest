import React from "react";
import { BiUser } from "react-icons/bi";
import { RiLockPasswordLine } from "react-icons/ri";

import { NavLink, Outlet } from "react-router-dom";

function StudentDashboard() {
  return (
    <div className="flex flex-col h-screen">
      <div className="grid grid-cols-6 flex-1 ">
        <div className="col-span-1 bg-base-300 ">
          {/* <p className="font-bold text-xl from-slate-700">Student dashboard</p>
          <ul className="font-bold flex flex-col gap-2 my-4 ">
            <li>
              <NavLink to="/student/dashboard">
                <div className="flex items-center gap-[2px]">
                  <BiUser />
                  <p>Profile</p>
                </div>
              </NavLink>
            </li>
            <li>
              <NavLink to="/student/dashboard/security">
                <div className="flex items-center gap-[2px]">
                  <RiLockPasswordLine />
                  <p>Security & password</p>
                </div>
              </NavLink>
            </li>
          </ul> */}
          <div className="gap-4">
            <ul className="font-bold flex flex-col">
              <NavLink
                to="/student/dashboard/"
                className={({ isActive }) =>
                  isActive ? "bg-base-content text-white" : ""
                }
              >
                <li className="flex items-center gap-2 p-4 ">
                  <BiUser />
                  Profile
                </li>
              </NavLink>
              <NavLink
                to="/student/dashboard/security"
                className={({ isActive }) =>
                  isActive ? "bg-base-content text-white" : ""
                }
              >
                <li className="flex items-center gap-2 p-4 ">
                  <RiLockPasswordLine />
                  Security & password
                </li>
              </NavLink>
              {/* <li className="flex items-center gap-2">
                <TfiStatsUp />
                <NavLink to="/instructor/dashboard/performance">
                  Performance
                </NavLink>
              </li> */}
            </ul>
          </div>
        </div>
        <div className="col-span-5">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default StudentDashboard;
