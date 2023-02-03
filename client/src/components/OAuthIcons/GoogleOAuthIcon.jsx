import React from "react";
import { FcGoogle } from "react-icons/fc";

function GoogleOAuthIcon() {
  return (
    <div>
      <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md">
        <FcGoogle size={24} />
      </button>
    </div>
  );
}

export default GoogleOAuthIcon;
