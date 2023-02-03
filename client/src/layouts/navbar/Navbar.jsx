import React from "react";
import { BsCart4, BsSearch } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Logo from "../../components/commonComponents/Logo";

import { useState } from "react";
import { useRef } from "react";
import { useEffect } from "react";
import {
  clearSearchCourses,
  searchCourse,
} from "../../services/store/courses/coursesSlice";
import SearchedCourse from "./components/SearchedCourse";
import Searchbar from "./components/Searchbar";
import LoggedInUser from "./components/LoggedInUser";
import NoUser from "./components/NoUser";
import CategoriesDropdown from "./components/CategoriesDropdown";

function Navbar() {
  const dispatch = useDispatch();
  const refOne = useRef(null);
  const refTwo = useRef(null);

  const searchResult = useSelector((state) => state.courses.searchResult);
  const user = useSelector((state) => state.user.user);
  const [showSerachbar, setShowSerchbar] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    document.addEventListener("click", handleClick, true);
  }, []);
  const handleClick = (event) => {
    if (
      !refOne.current.contains(event.target) &&
      !refTwo.current.contains(event.target)
    ) {
      dispatch(clearSearchCourses());
      setSearch("");
      setShowSerchbar(false);
    }
  };

  const handleSearchbar = () => {
    setShowSerchbar(true);
  };
  const handleCloseIconAction = () => {
    setShowSerchbar(false);
    dispatch(clearSearchCourses());
    setSearch("");
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
    if (event.target.value.trim().length > 3) {
      dispatch(searchCourse(event.target.value));
    } else {
      dispatch(clearSearchCourses());
    }
  };

  return (
    <div className="navbar bg-base-200 px-16 py-2 sticky top-0 z-10">
      <div className="flex-1 gap-8">
        <Logo />
        <CategoriesDropdown />
      </div>
      <div className="flex-none">
        <div>
          <label
            ref={refTwo}
            tabIndex={0}
            className="btn btn-ghost relative"
            onClick={handleSearchbar}
          >
            <div>
              <BsSearch size={24} />
            </div>
          </label>
          <div
            tabIndex={0}
            className={`mt-3 rounded-none absolute left-0 w-full bg-slate-900 ${
              showSerachbar ? "block" : "hidden"
            }`}
            ref={refOne}
          >
            <Searchbar
              value={search}
              handleChange={handleSearch}
              clickCloseIcon={handleCloseIconAction}
            />
            {searchResult && (
              <div className=" px-8 py-2">
                <p className="font-bold text-2xl text-white">Search result</p>
                {searchResult.map((searchItem) => (
                  <SearchedCourse course={searchItem} />
                ))}
              </div>
            )}
          </div>
        </div>
        <Link to="/instructor/dashboard" className="btn btn-ghost capitalize">
          <div className="indicator">
            {user ? <p> Instructor</p> : <p>Teach on Delve.</p>}
          </div>
        </Link>
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <div className="indicator">
              {/* // use to no# of items (span tag) */}
              {/* <span className="badge badge-sm indicator-item">8</span> */}
              <BsCart4 size={24} />
            </div>
          </label>
          {/* <div
            tabIndex={0}
            className="mt-3 card card-compact dropdown-content w-52 bg-base-300 shadow"
          >
            <div className="card-body">
              <span className="font-bold text-lg">8 Items</span>
              <span className="text-info">Subtotal: $999</span>
              <div className="card-actions">
                <button className="btn btn-primary btn-block">View cart</button>
              </div>
            </div>
          </div> */}
        </div>
        {user ? <LoggedInUser user={user} /> : <NoUser />}
      </div>
    </div>
  );
}

export default Navbar;
