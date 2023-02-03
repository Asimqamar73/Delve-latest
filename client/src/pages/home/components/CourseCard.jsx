import React from "react";
import { Link } from "react-router-dom";

function CourseCard({ course, index }) {
  return (
    <Link to={`/course-details/${course._id}`} index={index}>
      <div className="text-slate-700">
        <img
          src={course.courseThumbnail}
          alt="course thumbnail"
          className=" h-36 w-full object-cover "
        />
        <p className="font-bold ">{course.courseTitle}</p>
        <p className="text-sm">{course.courseInstructor.name}</p>
      </div>
    </Link>
  );
}

export default CourseCard;
