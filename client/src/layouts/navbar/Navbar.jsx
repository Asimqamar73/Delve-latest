import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../components/commonComponents/Logo";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { BsCart4, BsSearch } from "react-icons/bs";
import { GrClose } from "react-icons/gr";

import { AiOutlineSetting, AiOutlineLogout } from "react-icons/ai";
import profileImg from "../../assets/images/profileImg.jpg";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../../services/store/user/userSlice";
import { useState } from "react";
import InputComponent from "../../components/commonComponents/InputComponent";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const [isVisableSearchBar, setIsVisableSearchBar] = useState(false);
  const dispatch = useDispatch();
  return (
    <header>
      <nav className="fixed w-full top-0 flex items-center px-8 py-2 bg-base-300  ">
        <div>
          <Logo />
        </div>

        <div className="flex flex-1 justify-end items-center gap-x-4 ">
          <div className="flex h-full py-2 items-center hover:cursor-pointer">
            <BsSearch
              size={24}
              onClick={() => setIsVisableSearchBar(!isVisableSearchBar)}
            />
            <div>
              <div
                className={` ${
                  isVisableSearchBar ? "absolute" : "hidden"
                }  bg-green-500 whitespace-nowrap p-4 w-screen left-0 top-full
                `}
              >
                <div className="flex flex-1 ">
                  <div className="w-full mx-2">
                    <InputComponent
                      type="search"
                      placeholder="Search here..."
                      className="w-full"
                    />
                  </div>
                  <div
                    className="flex justify-center items-center"
                    onClick={() => setIsVisableSearchBar(!isVisableSearchBar)}
                  >
                    <GrClose className="text-2xl" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="relative flex h-full py-2 items-center ">
            <NavLink to="/instructor/dashboard" className="font-bold text-sm">
              Teach on Delve.
            </NavLink>
          </div>
          <div className="relative flex h-full py-2 items-center group">
            <BsCart4 size={24} />
          </div>
          {user ? (
            <div>
              <div className="relative flex h-full rounded items-center group">
                <div class="avatar">
                  <div class="w-12 rounded">
                    <img src={profileImg} />
                  </div>
                </div>
                <div className="group-hover:block hidden bg-base-300 absolute whitespace-nowrap rounded-md p-4 top-full right-0">
                  <div className="flex items-center hover:cursor-pointer hover:text-slate-600 ">
                    <div className="rounded-md w-12 mr-2">
                      <img src={profileImg} className="rounded" />
                    </div>
                    <div className="text-sm ">
                      <p className="font-bold">{user.name}</p>
                      <p>{user.email}</p>
                    </div>
                  </div>
                  <div className="divider m-0 p-0 before:m-0 after:m-0 before:p-0 after:p-0" />
                  <div className="flex items-center hover:cursor-pointer hover:text-gray-500">
                    <AiOutlineSetting />
                    <p className="p-[2px] ml-1">Settings</p>
                  </div>
                  <div
                    className="flex items-center hover:cursor-pointer  hover:text-gray-500"
                    onClick={() => dispatch(logout())}
                  >
                    <AiOutlineLogout />
                    <p className="p-[2px] ml-1">Logout</p>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex gap-x-2">
                <Link to="/login3">
                  <ButtonComponent
                    name="Login"
                    className="bg-transparent border-green-500 border-[1px] btn-sm text-slate-700 hover:bg-base-100/40 hover:border-green-600"
                  />
                </Link>
                <Link to="signup2">
                  <ButtonComponent
                    name="Sign up"
                    className="bg-green-500 text-white btn-sm border-none hover:bg-green-600 "
                  />
                </Link>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
