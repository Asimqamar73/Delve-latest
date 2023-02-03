import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ path, name }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive
          ? "bg-base-content transition-all ease-in-out rounded text-white"
          : ""
      }
    >
      <p className="p-2 font-bold">{name}</p>
    </NavLink>
  );
}

export default NavItem;
