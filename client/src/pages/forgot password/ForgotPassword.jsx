import React from "react";
import { FaPaperPlane, FaSlack, FaSlackHash } from "react-icons/fa";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import InputComponent from "../../components/commonComponents/InputComponent";
import Logo from "../../components/commonComponents/Logo";
import backgroundImg from "../../assets/images/forgot-password-img.svg";
import { Link } from "react-router-dom";
import { MdAlternateEmail } from "react-icons/md";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { forgotPassord } from "../../services/store/user/userSlice";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [verificationCode, setVerificationCode] = useState(0);
  const mailSent = false;
  const dispatch = useDispatch();
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(event.target.innerText);
    if (email.trim() !== "") {
      dispatch(forgotPassord(email));
    }
  };
  return (
    <div className="h-screen">
      <div className="fixed px-16 py-2">
        <Logo />
      </div>
      <div className="grid grid-cols-3 h-full">
        <div className="col-span-2  ">
          <div className="flex justify-center items-center bg-base-200 h-full">
            <img src={backgroundImg} alt="Login Page Image" className="h-1/2" />
          </div>
        </div>
        <div className="col-span-1 flex flex-col items-center justify-center m-2">
          <div>
            <div className="my-4 text-slate-700">
              <p className="font-bold text-2xl  font-sans">
                Reset your password
              </p>
              <p className="text-sm whitespace-pre-wrap">
                The verification email will be send to your{" "}
                <strong>mailbox</strong> please check it.
              </p>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="my-4 relative">
                <InputComponent
                  type="email"
                  placeholder="Email"
                  id="email"
                  className="w-full"
                  value={email}
                  handleChange={(event) => setEmail(event.target.value)}
                />
                <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                  <MdAlternateEmail className="text-white text-xl" />
                </div>
              </div>
              {mailSent && (
                <div className="my-4 relative">
                  <InputComponent
                    type="number"
                    placeholder="Verification code"
                    id="verificationCode"
                    className="w-full"
                    value={verificationCode}
                    handleChange={(event) =>
                      setVerificationCode(event.target.value)
                    }
                  />

                  <div className="absolute right-0 top-0 bg-green-400 h-full flex items-center w-10 justify-center rounded-md ">
                    <FaSlackHash className="text-white text-xl" />
                  </div>
                </div>
              )}

              <div className="my-4 flex justify-center">
                <ButtonComponent
                  name={mailSent ? "Verify" : "send"}
                  className="btn-wide bg-green-500 hover:bg-green-600 border-none text-white"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>

    // <div className="h-screen">
    //   <div className="fixed px-16 py-2 w-full">
    //     <Logo />
    //   </div>
    //   <div className=" flex justify-center items-center h-full">
    //     <div className="w-2/3">
    //       <div className="flex ">
    //         <div className="flex-1">
    //           <InputComponent
    //             type="email"
    //             placeholder="Put your email here."
    //             className="w-full rounded-tl-md rounded-bl-md rounded-br-none rounded-tr-none p-4 outline-none focus:outline-0 text-lg"
    //           />
    //         </div>
    //         <div>
    //           <button className="h-full rounded-tl-none rounded-bl-none rounded-br-md rounded-tr-md btn gap-2 bg-green-400 hover:bg-green-500 border-none text-white">
    //             <FaPaperPlane />
    //             Send
    //           </button>{" "}
    //         </div>

    //         {/* <ButtonComponent
    //           name="Send"
    //           className="h-full rounded-tl-none rounded-bl-none rounded-br-md rounded-tr-md"
    //         /> */}
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
}

export default ForgotPassword;
