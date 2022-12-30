import React from "react";
import loginImg from "../../assets/images/loginPageImg3.svg";
import Logo from "../../components/commonComponents/Logo";
import InputComponent from "../../components/commonComponents/InputComponent";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div className="">
      <div className="px-16 py-2">
        <div className="flex justify-between items-center">
          <Logo />
          <div>
            <p className="text-xs font-bold">
              Doesn't have an account?{" "}
              <Link to="/signup" className="text-white px-2 m-2 rounded-lg bg-[#02d670]">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-3 px-8 ">
        <div className="col-span-2 flex items-center justify-center">
          <img src={loginImg} alt="login Image" className="h-1/2" />
        </div>
        <div className="col-span-1 flex flex-col justify-center p-8 ">
          <div className="my-2">
            <InputComponent
              type="text"
              placeholder="Email"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="my-2">
            <InputComponent
              type="password"
              placeholder="Paaword"
              className="p-2 w-full rounded"
            />
          </div>
          <div className="flex items-center justify-between my-2">
            <div className="flex items-center">
              <InputComponent type="checkbox" />
              <label className="text-sm mx-2">Remember me.</label>
            </div>
            <div>
              <p>Forgot password?</p>
            </div>
          </div>
          <div className="my-2">
            <ButtonComponent
              className="w-full bg-[#02D670] text-white"
              name="Login"
            />
          </div>
          <div class="divider">or continue with</div>
          <div className="flex justify-center gap-2">
            <div>
              <button className="btn btn-ghost border-white border-[1px] rounded-md">
                <FcGoogle size={24} />
              </button>
            </div>
            <div>
              <button className="btn btn-ghost border-white border-[1px] rounded-md">
                <FaFacebook size={24} color={"lightblue"} />
              </button>
            </div>
            <div>
              <button className="btn btn-ghost border-white border-[1px] rounded-md">
                <FaLinkedinIn size={24} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
