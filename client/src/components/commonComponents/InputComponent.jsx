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
        className={`${!disabled? 'bg-base-200 ':'bg-slate-400 hover:cursor-block'} outline-none focus:outline-green-400 outline-[1px] p-2 rounded ${className}`}
        // className={`border-[1px] border-slate-700 p-2 rounded-lg ${className}`}

        onChange={handleChange}
        value={value}
        disabled={disabled}
      />
    </div>
  );
}

export default InputComponent;
