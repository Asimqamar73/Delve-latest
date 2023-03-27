import React from "react";

function InputComponent({
  type,
  placeholder,
  id,
  className,
  handleChange,
  value,
  disabled,
  ref,
}) {
  return (
    // <div>
    <input
      type={type}
      placeholder={placeholder}
      id={id}
      className={`${
        !disabled ? "bg-base-200 " : "bg-slate-300 hover: cursor-not-allowed"
      } outline-none focus:outline-green-400 outline-[1px] p-2 rounded ${className}`}
      onChange={handleChange}
      value={value}
      disabled={disabled}
      ref={ref}
    />
    // </div>
  );
}

export default InputComponent;
