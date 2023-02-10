import React from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import UserProfileIcon from "../../components/commonComponents/UserProfileIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { manageCourse } from "../../services/store/courseListing/courseListingSlice";
import LoadingIcons from "react-loading-icons";
import NavItem from "./components/NavItem";
import { STATUSES } from "../../services/requestStatues";
import { toast } from "react-toastify";


function ManageCourse() {
  const { course, status } = useSelector((state) => state.courseListing);

  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(manageCourse(params.id));
  }, []);

  // if (status === STATUSES.LOADING && !course) {
  //   return (
  //     <div className="flex flex-col justify-center items-center h-screen">
  //       <LoadingIcons.Puff stroke="green" />
  //     </div>
  //   );
  // }
  return (
    <div className="flex flex-col h-screen">
      <div className="block">
        <div className="flex justify-between items-center px-8 py-2 bg-base-200 sticky top-0">
          <div className="flex items-center gap-4">
            <Link to="/instructor/dashboard" className="font-bold text-lg">
              <div className="flex  gap-2">
                <IoIosArrowBack size={24} />
                <p>Back to dashboard</p>
              </div>
            </Link>
          </div>
          <p className="font-bold text-xl text-green-500">
            {course?.courseTitle}
          </p>
          <UserProfileIcon />
        </div>
      </div>
      {course ? (
        <div className="grid grid-cols-6 h-full">
          <div className="col-span-1 flex flex-col p-2 bg-base-300 ">
            <NavItem
              path={`/instructor/dashboard/manage-course/${course?._id}/basics`}
              name="Landing page"
            />
            <NavItem
              path={`/instructor/dashboard/manage-course/${course?._id}/curriculum`}
              name="Course curriculum"
            />
            <NavItem
              path={`/instructor/dashboard/manage-course/${course?._id}/requirements-and-objectives`}
              name="Objectives & requirements"
            />
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
