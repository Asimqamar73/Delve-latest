import React from "react";
import {Link} from "react-router-dom"
import underline from "../../assets/images/underline1.svg"

function Logo() {
  return (
    <Link to="/">
      <div>
        <p className="text-green-500 xl:text-2xl lg:text-2xl md:text-2xl sm:text-2xl font-FredokaOne ">
          {" "}
          Delv<span className="text-[#ffb700]">e</span>.{/* D */}
          {/* <span className="text-red-500">e</span>lve. */}
          {/* Delve<span className="text-red-500">.</span> */}
        </p>
        <img src={underline} alt="" className="text-white" />
      </div>
    </Link>
  );
}

export default Logo;
