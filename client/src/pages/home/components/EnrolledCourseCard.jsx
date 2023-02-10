import React from "react";
import { Link } from "react-router-dom";
import { BsPlayBtnFill } from "react-icons/bs";

function EnrolledCourseCard({ course, index }) {
  return (
    <Link to={`/course/watchCourse/${course.courseId._id}`} index={index}>
      <div className="flex gap-2 border border-gray-200 bg-base-200 rounded">
        <div className="relative group">
          {" "}
          <img
            src={course.courseId.courseThumbnail}
            alt="course thumbnail"
            className="w-60 h-48 object-cover opacity-80 "
          />
          <div className="absolute top-0 w-full h-full flex justify-center items-center ">
            <BsPlayBtnFill className=" text-6xl text-green-600 group-hover:text-white " />
          </div>
        </div>
        <div>
          <p className="font-bold">{course.courseId.courseTitle}</p>
        </div>
      </div>
    </Link>
  );
}

export default EnrolledCourseCard;
