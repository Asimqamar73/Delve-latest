import React from "react";
import { Link, useNavigate } from "react-router-dom";

function SearchedCourse({ course }) {
  const navigate = useNavigate();
  return (
    <div
      className="flex items-center gap-4 p-4 w-fit text-slate-300 hover:bg-base-100 hover:text-slate-700 hover:cursor-pointer transition-colors ease-in-out rounded-md  "
      onClick={() => navigate(`/course-details/${course._id}`)}
    >
      <div>
        <img
          src={course.courseThumbnail}
          alt="Course thumbnail"
          className="w-12 h-10 object-cover rounded"
        />
      </div>
      <div>
        <p className="text-lg">{course.courseTitle}</p>
        <p className="font-bold text-sm">
          course{" "}
          <span className="font-normal text-xs">
            {course.courseInstructor.name}
          </span>
        </p>
      </div>
    </div>
  );
}

export default SearchedCourse;
