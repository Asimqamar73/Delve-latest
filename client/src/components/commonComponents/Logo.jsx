import React from "react";
import {Link} from "react-router-dom"

function Logo() {
  return (
    <Link to="/">
      <div>
        <p className="text-green-400 xl:text-3xl lg:text-2xl md:text-2xl sm:text-2xl font-FredokaOne ">
          {" "}
          Delv<span className="text-red-500">e</span>.{/* D */}
          {/* <span className="text-red-500">e</span>lve. */}
          {/* Delve<span className="text-red-500">.</span> */}
        </p>
      </div>
    </Link>
  );
}

export default Logo;
