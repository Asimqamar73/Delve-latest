import React from "react";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import LoginPageImg from "../../assets/images/loginPageImg8.svg";
import Logo from "../../components/commonComponents/Logo";
import { Link } from "react-router-dom";
import { useState } from "react";

function Login2() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const handleLogin = (event) => {
    event.preventDefault();
    console.log(formData);
  };
  const onMutate = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };
  return (
    <div className="min-h-screen bg-base-300">
      <div className="px-16 flex justify-between items-center ">
        <Logo />
        <div className="xl:hidden lg:hidden md:flex items-center">
          <p className="text-sm mx-[2px] text-slate-500">
            Not a member yet?
          </p>
          <Link to="/signup">
            <button className="btn btn-xs bg-[#2c365a] text-white text-xs capitalize rounded">
              Sign up
            </button>
          </Link>
        </div>
      </div>
      <div className="grid md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-2  h-full ">
        <div className="flex flex-col justify-center items-center ">
          <div>
            <div className="flex flex-col justify-center items-center text-slate-600 my-4">
              <p className="text-3xl my-1 font-bold">Welcome back!</p>
              <p className="text-lg">We are happy have you back.</p>
            </div>
            <form onSubmit={handleLogin}>
              <div>
                <input
                  type="email"
                  name=""
                  id="email"
                  value={formData.email}
                  onChange={onMutate}
                  placeholder="Email"
                  className="p-2 rounded my-2 outline-none focus:outline-[1px] focus:outline-[#2c365a] "
                />
              </div>
              <div>
                <input
                  type="password"
                  name=""
                  id="password"
                  value={formData.password}
                  onChange={onMutate}
                  placeholder="Password"
                  className="p-2 rounded my-2 outline-none focus:outline-[1px] focus:outline-[#2c365a] "
                />
              </div>
              <div className="flex justify-end items-center my-2 text-xs text-[#2c365a]">
                <CiLock />
                <p>Forgot password?</p>
              </div>
              <div className="flex justify-center">
                <button className="btn btn-wide my-4 rounded bg-[#2c365a]">
                  Login
                </button>
              </div>
            </form>
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
        <div className="shadow-lg rounded-lg shadow-slate-700 my-16 mx-32 p-16 xl:flex lg:flex flex-col items-center md:hidden sm:hidden  ">
          <div className="flex justify-center">
            <img src={LoginPageImg} alt="" className=" h-48 " />
          </div>
          <div className="text-center my-8 text-slate-600">
            <p className="text-lg font-bold  ">Don't have an account?</p>
            <p className="text-sm">Get started by creating new account. </p>
          </div>
          <div>
            <Link to="/signup">
              <button
                className="btn btn-wide text-slate-700
             bg-transparent border-2 rounded border-slate-700"
              >
                Register
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login2;
