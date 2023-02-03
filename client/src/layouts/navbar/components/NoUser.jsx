import React from "react";
import { Link } from "react-router-dom";
import ButtonComponent from "../../../components/commonComponents/ButtonComponent";

function NoUser() {
  return (
    <div>
      <div className="flex gap-x-2">
        <Link to="/login3">
          <ButtonComponent
            name="Login"
            className="bg-transparent border-green-500 border-[1px] btn-sm text-slate-700 hover:bg-base-100/40 hover:border-green-600"
          />
        </Link>
        <Link to="signup2">
          <ButtonComponent
            name="Sign up"
            className="bg-green-500 text-white btn-sm border-none hover:bg-green-600 "
          />
        </Link>
      </div>
    </div>
  );
  
}

export default NoUser;
