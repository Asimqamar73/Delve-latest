import React from "react";

function InputComponent({
  type,
  placeholder,
  id,
  className,
  handleChange,
  value,
  disabled
}) {
  return (
    <div>
      <input
        type={type}
        placeholder={placeholder}
        id={id}
        className={`bg-base-200 outline-none focus:outline-green-400 outline-[1px] p-2 rounded ${className}`}
        onChange={handleChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

export default InputComponent;
