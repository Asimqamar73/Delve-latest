import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import InputComponent from "../../components/commonComponents/InputComponent";
import { toast } from "react-toastify";
import { changePassword } from "../../services/store/auth/authSlice";
import { useEffect } from "react";
import { STATUSES } from "../../services/requestStatues";

function Security() {
  const dispatch = useDispatch();
  const { status, message } = useSelector((state) => state.auth);
  const [passwords, setPassowrds] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      toast.success("Password updated successfully.");
    }
    if (status === STATUSES.ERROR) {
      toast.error(message);
    }
  }, []);
  const onMutate = (event) => {
    setPassowrds((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      passwords.currentPassword === "" ||
      passwords.newPassword === "" ||
      passwords.confirmPassword === ""
    ) {
      toast.error("Please provide all values");
      return;
    }
    if (passwords.newPassword !== passwords.confirmPassword) {
      toast.error("New and confirm password must match.");
      return;
    }
    setPassowrds({ currentPassword: "", newPassword: "", confirmPassword: "" });
    dispatch(changePassword(passwords));
  };

  return (
    <div className="m-4 grid grid-cols-2">
      <div className=" col-span-1">
        <div className="my-4">
          <p className="font-bold text-2xl">Security & password</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="my-4">
            <p className="font-bold text-sm">Current password</p>
            <InputComponent
              type="password"
              name="currentPassword"
              id="currentPassword"
              className="w-full"
              placeholder="Current password"
              value={passwords.currentPassword}
              handleChange={onMutate}
            />
          </div>
          <div className="my-4">
            <p className="font-bold text-sm">New password</p>

            <InputComponent
              type="password"
              name="newPassword"
              id="newPassword"
              className="w-full"
              placeholder="New password"
              value={passwords.newPassword}
              handleChange={onMutate}
            />
          </div>
          <div className="my-4">
            <p className="font-bold text-sm">Confirm password</p>

            <InputComponent
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              className="w-full"
              placeholder="Confirm password"
              value={passwords.confirmPassword}
              handleChange={onMutate}
            />
          </div>
          <div className="my-4">
            <ButtonComponent
              name="Apply changes"
              className="w-full bg-green-500 border-none text-white hover:bg-green-600"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Security;
