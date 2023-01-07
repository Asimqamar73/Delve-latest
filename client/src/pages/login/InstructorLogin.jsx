import InputComponent from "../../components/commonComponents/InputComponent";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import Logo from "../../components/commonComponents/Logo";
import instructorLoginImg from "../../assets/images/instructorLoginImg.svg";
import { MdAlternateEmail } from "react-icons/md";
import { FcGoogle } from "react-icons/fc";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { IoLockClosedOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { logout, loginUser } from "../../services/store/user/userSlice";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

function InstructorLogin() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const error = useSelector((state) => state.user.error);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  useEffect(() => {
    if (user) {
      navigate("/instructor/dashboard");
    }
    if (error != "") {
      toast.error(error);
    }
  }, [user, error]);
  const onMutate = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(loginUser(formData));
  };

  return (
    <div className="h-screen">
      <div className="fixed w-full px-16 py-4">
        <Logo />
      </div>
      <div>
        {user && (
          <div>
            <button className="btn" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-1 flex flex-col items-center justify-center order-1">
          <div>
            <div className="my-4 text-slate-700">
              <p className="font-bold text-3xl  font-sans">Login</p>
              <p className="text-sm">Login into your account</p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="my-4 relative">
                <InputComponent
                  type="email"
                  placeholder="Email"
                  id="email"
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
                  value={formData.password}
                  handleChange={onMutate}
                />
                <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                  <IoLockClosedOutline className=" text-white text-xl" />
                </div>
              </div>
              <div className="flex justify-end text-xs">
                <p>Forgot password?</p>
              </div>
              <div className="my-4 flex justify-center">
                <ButtonComponent
                  name="Login"
                  className="btn-wide bg-green-500 hover:bg-green-600 border-none text-white"
                />
              </div>
            </form>
            <div className="divider before:bg-base-300 before:h-[1px] after:bg-base-300 after:h-[1px] text-slate-600 text-sm  ">
              Or continue with
            </div>
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
              <Link to="/instructor-signup">
                <p className="text-green-500 font-bold">Sign up</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="col-span-2  ">
          <div className="flex justify-center items-center bg-base-300 h-full">
            <img
              src={instructorLoginImg}
              alt="Login Page Image"
              className="h-1/2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default InstructorLogin;
