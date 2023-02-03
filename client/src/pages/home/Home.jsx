import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/images/banner9.jpg";
import { fetchAllCourses } from "../../services/store/courses/coursesSlice";
import CourseCard from "./components/CourseCard";
import CourseCardSkeleton from "./components/CourseCardSkeleton";
import EnrolledCourseCard from "./components/EnrolledCourseCard";

function Home() {
  const courses = useSelector((state) => state.courses.courses);
  const isLoading = useSelector((state) => state.courses.isLoading);

  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllCourses());
  }, []);

  return (
    <div>
      <div className="relative">
        <div>
          <img src={banner} alt="" className="w-full  object-cover h-[480px]" />
        </div>
        <div className="absolute top-32 left-24 p-12 bg-base-100 rounded-md shadow-md shadow-slate-500">
          <p className="text-lg">
            There is always something more to learn, even for a master.
          </p>
        </div>
      </div>
      {isLoading ? (
        <div className="flex gap-4 my-4">
          <CourseCardSkeleton />
          <CourseCardSkeleton />
          <CourseCardSkeleton />
        </div>
      ) : (
        <div>
          {user?.enrolledCourses.length > 0 && user && (
            <div className="m-8">
              <div className="">
                <p className="text-2xl font-bold ">
                  Let's start learning, {user.name}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                {user.enrolledCourses.map((course, index) => (
                  <EnrolledCourseCard course={course} index={index} />
                ))}
              </div>
            </div>
          )}

          <div className="m-8">
            <div className="">
              <p className="text-2xl font-bold">Recently published courses</p>
            </div>
            <div className="grid grid-cols-5 gap-4">
              {courses &&
                courses.map((course, index) => (
                  <CourseCard course={course} index={index} />
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
