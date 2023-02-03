import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import noCourse from "../../assets/images/no-course.svg"

function EnrolledCourses() {
  const user = useSelector((state) => state.user.user);
  return (
    <div>
      <div className="px-16 py-8 bg-current">
        <p className="font-bold text-3xl text-white">My learning</p>
      </div>
      {user.enrolledCourses.length > 0 ? (
        <div className="px-16 py-4">
          <div className="grid grid-cols-4 gap-4">
            {user.enrolledCourses.map((course, index) => (
              <Link to={`/course/learnCourse/${course.courseId._id}`}>
                <div key={index} className="hover:cursor-pointer">
                  <div className="my-2 group">
                    <img
                      src={course.courseId.courseThumbnail}
                      alt="course thumbnail"
                      className=" h-44 w-full object-cover hover:cursor-pointer group-hover:opacity-90 "
                    />
                  </div>
                  <div>
                    <p className="font-bold text-slate-700">
                      {course.courseId.courseTitle}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center mt-8">
          <img src={noCourse} alt="No course" className="h-96" />
          <div className="font-bold">No course enrolled yet</div>
        </div>
      )}
    </div>
  );
}

export default EnrolledCourses;
