import React from "react";
import { Link } from "react-router-dom";
import { VscTriangleDown } from "react-icons/vsc";
import {categories} from "../../../services/store/courseListing/courseCategories"

function CategoriesDropdown() {
  // const categories = ["Development", "Business", "IT & Software", "Art"];

  return (

    <div class="dropdown dropdown-hover">
      <label tabindex="0" class="btn bg-transparent border-none text-slate-700 hover:bg-transparent capitalize gap-[2px]">
        Categories <VscTriangleDown />
      </label>
      <ul tabindex="0" class="menu menu-normal dropdown-content p-2 bg-base-200 rounded w-52 whitespace-nowrap ">
        {categories.map((category) => (
          <li>
            <Link to={`/courses/category/${category}`}>{category}</Link>{" "}
          </li>
        ))}
      </ul>
    </div>

  );
}

export default CategoriesDropdown;
