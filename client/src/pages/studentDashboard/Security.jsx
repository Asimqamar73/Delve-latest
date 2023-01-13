import React from "react";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import InputComponent from "../../components/commonComponents/InputComponent";

function Security() {
  return (
    <div className="m-4 grid grid-cols-2">
      <div className=" col-span-1">
        <div className="my-4">
          <p className="font-bold text-2xl">Security & password</p>
        </div>
        <form>
          <div className="my-4">
            <p className="font-bold text-sm">Current password</p>
            <InputComponent
              type="password"
              name="currentPassword"
              id="currentPassword"
              className="w-full"
              placeholder="Current password"
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
