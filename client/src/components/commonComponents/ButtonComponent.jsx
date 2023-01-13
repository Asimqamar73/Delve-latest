import React from "react";

function ButtonComponent({ name, className, click }) {
  return (
    <div>
      <button className={`btn ${className} rounded capitalize`} onClick={click}>
        {name}
      </button>
    </div>
  );
}

export default ButtonComponent;
