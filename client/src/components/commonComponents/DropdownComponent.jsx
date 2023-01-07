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
      className={`${variant} rounded`}
    >
      {options.map((option) => (
        <option value={option}>{option}</option>
      ))}
    </select>
  );
};

export default DropdownComponent;
