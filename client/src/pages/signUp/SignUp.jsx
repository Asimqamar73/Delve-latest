import InputComponent from "../../components/commonComponents/InputComponent";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import Logo from "../../components/commonComponents/Logo";
import loginPageImg from "../../assets/images/signupPageImg3.svg";
import { MdAlternateEmail } from "react-icons/md";
import {
  FacebookOAuthIcon,
  GoogleOAuthIcon,
  LinkinOAuthIcon,
} from "../../components/OAuthIcons";

import { IoLockClosedOutline } from "react-icons/io5";
import { BiUser } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { createAccount } from "../../services/store/auth/authSlice";
import { toast } from "react-toastify";
import { STATUSES } from "../../services/requestStatues";

function SignUp() {
  const navigate = useNavigate();
  const { user, message, status } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/");
    }
    if (status === STATUSES.ERROR) {
      toast.error(message);
    }
  }, [user, message]);
  const onMutate = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(createAccount(formData));
  };

  return (
    <div className="h-screen">
      <div className="fixed w-full px-16 py-4">
        <Logo />
      </div>
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 flex flex-col items-center justify-center ">
          <div>
            <div className="my-4 text-slate-700">
              <p className="font-bold text-3xl  font-sans">Sign up</p>
              <p className="text-sm">Get started by creating your account.</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="my-4 relative">
                <InputComponent
                  type="text"
                  placeholder="Name"
                  id="name"
                  value={formData.name}
                  handleChange={onMutate}
                  className="w-full"
                />
                <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                  <BiUser className="text-white text-xl" />
                </div>
              </div>
              <div className="my-4 relative">
                <InputComponent
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="w-full"
                  value={formData.email}
                  handleChange={onMutate}
                />
                <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                  <MdAlternateEmail className="text-white text-xl" />
                </div>
              </div>
              <div className="my-4 relative">
                <InputComponent
                  type="password"
                  placeholder="Password"
                  id="password"
                  className="w-full"
                  value={formData.password}
                  handleChange={onMutate}
                />
                <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                  <IoLockClosedOutline className=" text-white text-xl" />
                </div>
              </div>
              <div className="my-4 flex justify-center">
                <ButtonComponent
                  name="Sign up"
                  className="btn-wide bg-green-500 hover:bg-green-600 border-none text-white"
                />
              </div>
            </form>
            <div className="divider before:bg-base-300 before:h-[1px] after:bg-base-300 after:h-[1px] text-slate-600 text-sm  ">
              Or continue with
            </div>
            <div className="flex justify-center gap-2">
              <GoogleOAuthIcon />
              <FacebookOAuthIcon />
              <LinkinOAuthIcon />
            </div>
            <div className=" flex gap-2 my-4 text-sm ">
              <p>Already having an account?</p>
              <Link to="/login">
                <p className="text-green-500 font-bold">Login</p>
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

export default SignUp;
