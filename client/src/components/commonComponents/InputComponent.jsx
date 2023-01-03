import React from "react";

function InputComponent({ type, placeholder, id, className }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`outline-none p-2 rounded ${className}`}
      />
    </div>
  );
}

export default InputComponent;
