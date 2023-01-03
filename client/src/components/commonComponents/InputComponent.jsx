import React from "react";

function InputComponent({ type, placeholder, id, className, handleChange }) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`outline-none p-2 rounded ${className}`}
        onChange={handleChange}
      />
    </div>
  );
}

export default InputComponent;
