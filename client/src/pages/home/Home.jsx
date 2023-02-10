import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import banner from "../../assets/images/banner9.jpg";
import { fetchAllCourses } from "../../services/store/courses/coursesSlice";
import CourseCard from "./components/CourseCard";
import CourseCardSkeleton from "./components/CourseCardSkeleton";
import EnrolledCourseCard from "./components/EnrolledCourseCard";
import StatComponent from "./components/StatComponent";
import instructorImg from "../../assets/images/instructorImg11 (2).jpg"
import ButtonComponent from "../../components/commonComponents/ButtonComponent";

function Home() {
  const { courses, isLoading } = useSelector((state) => state.courses);
  const { user } = useSelector((state) => state.auth);
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
        <div className="m-8">
          {user?.enrolledCourses.length > 0 && user && (
            <div>
              <p className="text-2xl font-bold ">
                Let's start learning, {user.name}
              </p>
              <div className="grid grid-cols-3 gap-4">
                {user.enrolledCourses.map((course, index) => (
                  <EnrolledCourseCard course={course} index={index} />
                ))}
              </div>
            </div>
          )}

          <div className="my-8">
            <p className="text-2xl font-bold">Recently published courses</p>
            <div className="grid grid-cols-5 gap-4">
              {courses &&
                courses.map((course, index) => (
                  <CourseCard course={course} index={index} />
                ))}
            </div>
          </div>


        </div>
      )}
      <div>
        <StatComponent />
      </div>
      <div className="grid grid-cols-2 m-8">
        <div className="flex justify-center items-center">
          <div className="w-3/4 gap-8">
            <p className=" font-bold text-4xl my-2">Become an instructor</p>
            <p className="my-2">Instructors from around the world teach millions of students. We provide the tools and skills to teach what you love.</p>
            <ButtonComponent name="Start teaching" className="bg-green-400 text-slate-700 border-none my-2" />
          </div>

        </div>
        <div><img src={instructorImg} alt="" className="w-1/2" /></div>

      </div>
    </div>
  );
}

export default Home;
