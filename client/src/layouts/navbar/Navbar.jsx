import React from "react";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../components/commonComponents/Logo";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { BsCart4 } from "react-icons/bs";

function Navbar() {
  return (
    <header>
      <nav className="fixed w-full top-0 flex items-center px-8 py-2 bg-base-300  ">
        <div>
          <Logo />
        </div>

        <div className="flex flex-1 justify-end items-center gap-x-4 ">
          <div className="relative flex h-full py-2 items-center ">
            <NavLink to="/nothing" className="font-bold text-sm">
              Teach on Delve.
            </NavLink>
          </div>
          <div className="relative flex h-full py-2 items-center group">
            <BsCart4 size={24} />
            <div className="group-hover:block hidden absolute whitespace-nowrap  rounded-md p-4  top-full right-0">
              <p>Your cart is empty</p>
            </div>
          </div>
          <div className="flex gap-x-2">
            <Link to="/login2">
              <ButtonComponent
                name="Login"
                className="bg-transparent border-white border-[1px] btn-sm text-slate-700"
              />
            </Link>

            <Link to="signup">
              <ButtonComponent
                name="Sign up"
                className="bg-white text-slate-700 btn-sm border-none "
              />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
