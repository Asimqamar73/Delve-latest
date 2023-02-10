import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import profileImg from "../../../assets/images/profileImg.jpg";
import UserProfileIcon from "../../../components/commonComponents/UserProfileIcon";
import { logout } from "../../../services/store/auth/authSlice";
import { BsCollectionPlay } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import { FaChalkboardTeacher } from "react-icons/fa";
// import ButtonComponent from "../../../components/commonComponents/ButtonComponent";

function LoggedInUser() {
  const dispatch = useDispatch();
  const {user} = useSelector((state) => state.auth);

  return (
    <div className="dropdown dropdown-end">
      <label tabIndex={0} className="hover:cursor-pointer">
        <UserProfileIcon />
      </label>
      <ul
        tabIndex={0}
        className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-200 rounded-box "
      >
        <li>
          <Link to="/student/dashboard/" className="justify-between">
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
          <Link onClick={() => dispatch(logout())}>
            <FiLogOut />
            Logout
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default LoggedInUser;
