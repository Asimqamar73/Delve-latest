import React from "react";

function ButtonComponent({ name, className }) {
  return (
    <div>
      <button className={`btn ${className} rounded capitalize`}>
        {name}
      </button>
    </div>
  );
}

export default ButtonComponent;
