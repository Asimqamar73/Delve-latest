import React from "react";
import { FaFacebook } from "react-icons/fa";

function FacebookOAuthIcon() {
  return (
    <div>
      <button className="btn btn-ghost border-slate-400 border-[1px] rounded-md">
        <FaFacebook size={24} color="#3b5999" />
      </button>
    </div>
  );
}

export default FacebookOAuthIcon;
