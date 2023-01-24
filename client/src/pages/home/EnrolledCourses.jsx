import React from "react";
import { useSelector } from "react-redux";

function EnrolledCourses() {
  const user = useSelector((state) => state.user.user);
  return (
    <div className="">
      <div className="px-16 py-4 bg-current">
        <p className="font-bold text-3xl text-white">My learning</p>
      </div>
      <div className="px-16 py-4">
        <div className="grid grid-cols-4">
          {user.enrolledCourses.map((course) => (
            <div className="col-span-1 bg-slate-300 ">
              <img
                src={course.courseId.courseThumbnail}
                alt="Course thumbnail"
                className="w-full h-full object-cover"
              />
              <p className="font-bold">{course.courseId.courseTitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnrolledCourses;
