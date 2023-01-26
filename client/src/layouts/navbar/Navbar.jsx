import React from "react";
import { BsCart4, BsCollectionPlay, BsSearch } from "react-icons/bs";
import { FiLogOut, FiSettings } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import Logo from "../../components/commonComponents/Logo";
import profileImg from "../../assets/images/profileImg.jpg";
import UserProfileIcon from "../../components/commonComponents/UserProfileIcon";
import { logout } from "../../services/store/user/userSlice";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";

function Navbar() {
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  return (
    <div className="navbar bg-base-200 px-16 py-2 sticky top-0 z-10 ">
      <div className="flex-1">
        {/* <a className="btn btn-ghost normal-case text-xl">daisyUI</a> */}
        <Logo />
      </div>
      <div className="flex-none">
        <div className="">
          {/* <Link to="/instructor/dashboard"> */}
          <Link to="/instructor/dashboard" className="btn btn-ghost capitalize">
            <div className="indicator">
              {user ? <p> Instructor</p> : <p>Teach on Delve.</p>}
            </div>
          </Link>
          {/* </Link> */}
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
        <div className="dropdown dropdown-end">
          <label tabIndex={0} className="btn btn-ghost">
            <div className="indicator">
              {/* // use to no# of items (span tag) */}
              {/* <span className="badge badge-sm indicator-item">8</span> */}
              <BsCart4 size={24} />
            </div>
          </label>
          <div
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
          </div>
        </div>

        {user ? <LoggedInUser user={user} /> : <NoLoggedUser />}
      </div>
    </div>
  );
}

const LoggedInUser = ({ user }) => {
  const dispatch = useDispatch();
  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="hover:cursor-pointer">
        {/* <div className="w-12 ">
    <img src={user.avatar} className="rounded" />
  </div> */}
        {/* <div>
    <p className="mx-1">{user.name}</p>
  </div> */}
        <UserProfileIcon />
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-300 rounded-box "
      >
        <li>
          <Link to="/student/dashboard" className="justify-between">
            <div className="flex items-center hover:cursor-pointer hover:text-slate-600">
              <div className="rounded-md w-16 mr-2">
                <img
                  src={user.avatar ? user.avatar : profileImg}
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="text-sm ">
                <p className="font-bold">{user.name}</p>
                <p>{user.email}</p>
              </div>
            </div>
            {/* <span className="badge">New</span> */}
          </Link>
        </li>
        <div className="divider m-0 p-0" />
        <li>
          <Link to="/course/enrolledCourses">
            <BsCollectionPlay />
            Enrolled courses
          </Link>
        </li>
        <li>
          <Link to="/instructor/dashboard">
            <FaChalkboardTeacher />
            Instructor
          </Link>
        </li>

        <li>
          <Link>
            <FiSettings />
            Settings
          </Link>
        </li>
        <li>
          <Link onClick={() => dispatch(logout())}>
            <FiLogOut />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
};

const NoLoggedUser = () => {
  return (
    <div>
      <div className="flex gap-x-2">
        <Link to="/login3">
          <ButtonComponent
            name="Login"
            className="bg-transparent border-green-500 border-[1px] btn-sm text-slate-700 hover:bg-base-100/40 hover:border-green-600"
          />
        </Link>
        <Link to="signup2">
          <ButtonComponent
            name="Sign up"
            className="bg-green-500 text-white btn-sm border-none hover:bg-green-600 "
          />
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
