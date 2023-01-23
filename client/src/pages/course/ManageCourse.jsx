import React from "react";
import { Link, NavLink, Outlet, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import UserProfileIcon from "../../components/commonComponents/UserProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { manageCourse } from "../../services/store/instructor/instructorDashboardSlice";
import LoadingIcons from "react-loading-icons";
import Logo from "../../components/commonComponents/Logo"

function ManageCourse() {
  const course = useSelector((state) => state.instructor.course);
  const isLoading = useSelector((state) => state.instructor.isLoading);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(manageCourse(params.id));
  }, []);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <LoadingIcons.Puff stroke="green"/>
        {/* <Logo /> */}
      </div>
    );
    // <div>Loading...</div>;
  }
  return (
    <div className="flex flex-col h-screen">
      <div className="block">
        <div className="flex justify-between items-center px-8 py-2 bg-base-200 sticky top-0">
          <div>
            <div className="flex items-center gap-4">
              <Link to="/instructor/dashboard" className="font-bold text-lg">
                <div className="flex items-center gap-2">
                  <IoMdArrowRoundBack size={24} />
                  <p>Back to dashboard</p>
                </div>
              </Link>
            </div>
          </div>
          <div>
            <p className="font-bold text-xl text-green-500">
              {course?.courseTitle}
            </p>
          </div>
          <div>
            <UserProfileIcon />
          </div>
        </div>
      </div>

      {course ? (
        <div className="grid grid-cols-6 h-full">
          <div className="col-span-1 bg-base-300 p-4">
            <ul className="flex flex-col gap-4 font-bold text-lg">
              <li>
                <NavLink
                  to={`/instructor/dashboard/manage-course/${course?._id}/audience`}
                >
                  Intended audiance
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/instructor/dashboard/manage-course/${course?._id}/curriculum`}
                >
                  Course curriculum
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={`/instructor/dashboard/manage-course/${course?._id}/basics`}
                >
                  Landing page
                </NavLink>
              </li>
            </ul>
          </div>
          <div className="col-span-5 m-8">
            <Outlet context={course} />
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default ManageCourse;
