import React from "react";

function InputComponent({ type, placeholder, id, className }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`outline-none ${className}`}
      />
    </div>
  );
}

export default InputComponent;
