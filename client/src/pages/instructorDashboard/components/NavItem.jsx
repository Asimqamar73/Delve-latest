import React from "react";
import { NavLink } from "react-router-dom";

function NavItem({ path, name, children }) {
  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        isActive ? "bg-base-content text-white" : ""
      }
    >
      <li className="flex items-center gap-2 p-2">
        {children}
        {name}
      </li>
    </NavLink>
  );
}

export default NavItem;
