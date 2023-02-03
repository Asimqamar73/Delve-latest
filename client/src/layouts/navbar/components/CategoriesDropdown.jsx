import React from "react";
import { Link } from "react-router-dom";

function CategoriesDropdown() {
  const categories = ["Development", "Business", "IT & Software", "Art"];

  return (
    <div class="dropdown">
      <button tabindex="0" class=" text-sm capitalize">
        Categories
      </button>
      <ul
        tabindex="0"
        class="dropdown-content menu p-2 shadow bg-base-200 rounded-md w-52"
      >
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
