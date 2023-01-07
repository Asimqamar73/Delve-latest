import React from "react";
import { Link } from "react-router-dom";

function Courses() {
  return (
    <div>
      <div>
        <p className="text-2xl font-bold">Courses</p>
      </div>
      <div className="flex justify-between items-center border-[1px] border-green-400 p-4 my-2 rounded ">
        <p className="font-bold">Turn your skills into a course</p>
        <Link to="/instructor/create-course">
          <button className="btn bg-green-500 border-none text-white hover:bg-green-600">
            Start course creation
          </button>
        </Link>
      </div>
      <div>
        <div>
          <p className="font-bold text-lg">Courses list</p>
        </div>
        <div>
          <p>No course created yet.</p>
        </div>
      </div>
    </div>
  );
}

export default Courses;
