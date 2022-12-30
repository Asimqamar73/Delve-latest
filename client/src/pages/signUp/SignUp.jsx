import React from "react";
import { Link } from "react-router-dom";
import SignUpPageImg from "../../assets/images/signupPageImg.svg";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import Logo from "../../components/commonComponents/Logo";

// import LoginPageImg from "../../assets/images/loginPageImg8.svg";

function SignUp() {
  return (
    <div className="xl:h-screen md:min-h-screen  bg-base-300">
      <div className="py-4 px-16 xl:fixed">
        <Logo />
      </div>
      <div className="grid xl:grid-cols-2 md:grid-cols-1 h-full">
        <div className="shadow-lg rounded-lg shadow-slate-700 my-16 mx-32 p-16 xl:flex flex-col items-center  md:hidden">
          <div className="flex justify-center">
            <img src={SignUpPageImg} alt="" className=" w-2/3 " />
          </div>
          <div className="text-center my-8 text-slate-600">
            <p className="text-lg font-bold  ">Already having an account?</p>
            <p className="text-sm">We are happy have you back. </p>
          </div>
          <div>
            <Link to="/login2">
              <button
                className="btn btn-wide text-slate-700
             bg-transparent border-2 rounded border-slate-700"
              >
                Login
              </button>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center items-center ">
          <div>
            <div className="flex flex-col justify-center items-center text-slate-600 my-4">
              <p className="text-3xl font-bold">Sign Up</p>
              <p>Get started by creating your account.</p>
            </div>
            <div>
              <input
                type="text"
                name=""
                id=""
                placeholder="Username"
                className="p-2 rounded my-2 outline-none focus:outline-[1px] focus:outline-[#2c365a] "
              />
            </div>
            <div>
              <input
                type="email"
                name=""
                id=""
                placeholder="Email"
                className="p-2 rounded my-2 outline-none focus:outline-[1px] focus:outline-[#2c365a] "
              />
            </div>
            <div>
              <input
                type="password"
                name=""
                id=""
                placeholder="Password"
                className="p-2 rounded my-2 outline-none focus:outline-[1px] focus:outline-[#2c365a] "
              />
            </div>
            <div>
              <input
                type="password"
                name=""
                id=""
                placeholder="Confirm password"
                className="p-2 rounded my-2 outline-none focus:outline-[1px] focus:outline-[#2c365a] "
              />
            </div>
            <div>
              <button className="btn capitalize w-full  my-4 rounded bg-[#2c365a]">
                Sign up
              </button>
            </div>
            <div className="divider before:bg-slate-500 after:bg-slate-500 after:h-[1px] before:h-[1px] ">
              or continue with
            </div>

            <div className="flex justify-center gap-2">
              <div>
                <button className="btn btn-ghost border-white border-[1px] rounded-md">
                  <FaFacebook size={24} color="#3b5999" />
                </button>
              </div>
              <div>
                <button className="btn btn-ghost border-white border-[1px] rounded-md">
                  <FcGoogle size={24} />
                </button>
              </div>

              <div>
                <button className="btn btn-ghost border-white border-[1px] rounded-md">
                  <FaLinkedinIn size={24} color="#0072b1" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignUp;
