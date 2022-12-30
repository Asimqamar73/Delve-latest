import React from "react";
import { NavLink } from "react-router-dom";
import Logo from "../../components/commonComponents/Logo";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { BsCart4 } from "react-icons/bs";

function Navbar() {
  return (
    <header>
      <nav className="sticky top-0 flex items-center p-2 bg-base-300 ">
        <div>
          <Logo />
        </div>

        <div className="flex flex-1 justify-end items-center gap-x-4 ">
          <div className="relative flex h-full py-2 items-center bg-white">
            <NavLink to="/nothing" className="font-bold text-sm">
              Teach on Delve.
            </NavLink>
          </div>
          <div className="relative flex h-full py-2 items-center group">
            <BsCart4 size={24} />
            <div className="group-hover:block hidden absolute whitespace-nowrap bg-slate-300 rounded-md p-4  top-full right-0">
              <p>Your cart is empty</p>
            </div>
          </div>
          <div className="flex gap-x-2">
            <ButtonComponent
              name="Login"
              className="bg-transparent border-white border-[1px]"
            />
            <ButtonComponent
              name="Sign up"
              className="bg-white text-slate-700 "
            />
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
