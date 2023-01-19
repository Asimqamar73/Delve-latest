import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/images/banner9.jpg";
import { fetchAllCourses } from "../../services/store/courses/coursesSlice";

function Home() {
  const courses = useSelector((state) => state.courses.courses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  if (!courses) {
    return (
      <div>
        <p>Loading.....</p>
      </div>
    );
  }
  return (
    <div>
      <div className="relative">
        <div>
          <img src={banner} alt="" className="w-full  object-cover h-[480px]" />
        </div>
        <div className="absolute top-32 left-24 p-12 bg-base-100 rounded-md shadow-md shadow-slate-400">
          {/* <div className="absolute top-32 left-24 p-8 bg-base-100 rounded-md shadow-md shadow-slate-700"> */}
          {/* 3 */}

          {/* <div className="absolute top-36 right-16 p-8 bg-base-100 rounded-md shadow-md shadow-slate-300">  */}
          {/* // 001 */}
          {/* <div className="absolute top-40 right-24 p-12 bg-base-100 rounded-md shadow-md shadow-slate-800"> */}

          <p className="text-4xl font-bold my-[2px]">Dream Big</p>
          <p>Find a course to help you reach where you want to go. </p>
        </div>
      </div>
      <div className="m-8">
        <div className="my-2">
          <p className="text-2xl font-bold">Recently published courses</p>
        </div>
        <div className="grid grid-cols-5 gap-4">
          {courses &&
            courses.map((course, index) => (
              <div key={index} className="text-slate-700">
                <div className="my-2">
                  <img
                    src={course.courseThumbnail}
                    alt="course thumbnail"
                    className=" h-36 w-full object-cover "
                  />
                </div>
                <div>
                  <p className="font-bold ">{course.courseTitle}</p>
                </div>
                <div>
                  <p className="text-sm">{course.courseInstructor.name}</p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Home;
