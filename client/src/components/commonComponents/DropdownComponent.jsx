import React from "react";

const DropdownComponent = ({
  options,
  name,
  id,
  variant,
  value,
  handleChange,
}) => {
  return (
    <select
      name={name}
      id={id}
      value={value}
      onChange={handleChange}
      className={`${variant} rounded bg-base-200`}
    >
      {options.map((option,index) => (
        <option value={option} key={index}>{option}</option>
      ))}
    </select>
  );
};

export default DropdownComponent;
