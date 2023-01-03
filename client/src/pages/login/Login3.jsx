import React from "react";
import InputComponent from "../../components/commonComponents/InputComponent";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import Logo from "../../components/commonComponents/Logo";
import loginPageImg from "../../assets/images/loginPageImg.svg";
import { TfiEmail } from "react-icons/tfi";
import { MdMail, MdAlternateEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { BsLock } from "react-icons/bs";
import { IoLockClosedOutline } from "react-icons/io5";
import { HiOutlineLockClosed } from "react-icons/hi";
import { Link } from "react-router-dom";

function Login3() {
  return (
    <div className="h-screen">
      <div className="fixed w-full px-16 py-4">
        <Logo />
      </div>
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 flex flex-col items-center justify-center ">
          <div>
            <div className="my-4 text-slate-700">
              <p className="font-bold text-3xl  font-sans">Login</p>
              <p className="text-sm">Login into your account</p>
            </div>
            {/* <div className="flex justify-center gap-2"> */}
            {/* <div> */}
            {/* <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md"> */}
            {/* <FaFacebook size={24} color="#3b5999" /> */}
            {/* </button> */}
            {/* </div> */}
            {/* <div> */}
            {/* <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md"> */}
            {/* <FcGoogle size={24} /> */}
            {/* </button> */}
            {/* </div> */}
            {/*  */}
            {/* <div> */}
            {/* <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md"> */}
            {/* <FaLinkedinIn size={24} color="#0072b1" /> */}
            {/* </button> */}
            {/* </div> */}
            {/* </div> */}
            {/* <div className="divider before:bg-base-300 before:h-[1px] after:bg-base-300 after:h-[1px] text-slate-600 text-sm  "> */}
            {/* Or continue with */}
            {/* </div> */}
            <div className="my-4 relative">
              <InputComponent
                type="email"
                placeholder="Email"
                className="bg-base-200"
              />
              <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                <MdAlternateEmail className="text-white text-xl" />
              </div>
            </div>
            <div className="my-4 relative">
              <InputComponent
                type="password"
                placeholder="Password"
                className="bg-base-200"
              />
              <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                <IoLockClosedOutline className=" text-white text-xl" />
              </div>
            </div>
            <div className="flex justify-end text-xs">
              <p>Forgot password?</p>
            </div>
            <div className="my-4">
              <ButtonComponent
                name="Login"
                className="btn-wide bg-green-500 hover:bg-green-600 border-none text-white"
              />
            </div>
            <div className="divider before:bg-base-300 before:h-[1px] after:bg-base-300 after:h-[1px] text-slate-600 text-sm  ">
              Or continue with
            </div>
            {/* <div className="my-4">
              <ButtonComponent
                name="Sign up"
                className="btn-wide bg-transparent border-green-500 text-green-500 border-[1px] transition-colors ease-in-out hover:bg-green-100/70 hover:border-green-500"
              />
            </div> */}
            <div className="flex justify-center gap-2">
              <div>
                <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md">
                  <FaFacebook size={24} color="#3b5999" />
                </button>
              </div>
              <div>
                <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md">
                  <FcGoogle size={24} />
                </button>
              </div>

              <div>
                <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md">
                  <FaLinkedinIn size={24} color="#0072b1" />
                </button>
              </div>
            </div>
            <div className=" flex gap-2 my-4 text-sm ">
              <p>Not a member yet?</p>
              <Link to="/signup">
                <p className="text-green-500 font-bold">Sign up</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-2  ">
          <div className="flex justify-center items-center bg-base-200 h-full">
            <img src={loginPageImg} alt="Login Page Image" className="h-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login3;