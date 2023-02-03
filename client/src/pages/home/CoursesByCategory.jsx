import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Divider from "../../components/commonComponents/Divider";
import DropdownComponent from "../../components/commonComponents/DropdownComponent";
import { getCoursesbyCategory } from "../../services/store/courses/coursesSlice";
import CourseCard from "./components/CourseCard";
import CourseCardSkeleton from "./components/CourseCardSkeleton";
import CourseLanguageFilterComponent from "./components/CourseLanguageFilterComponent";
import CourseLevelFilterComponent from "./components/CourseLevelFilterComponent";
import RatingFilterComponent from "./components/RatingFilterComponent";

function CoursesByCategory() {
  const params = useParams();
  const dispatch = useDispatch();
  const sortBy = ["Newest", "Trending", "Highest rated"];
  const courses = useSelector((state) => state.courses.courses);
  const isLoading = useSelector((state) => state.courses.isLoading);
  const [filters, setFilters] = useState({
    // rating: "",
    language: [],
    level: [],
  });

  useEffect(() => {
    dispatch(getCoursesbyCategory(params.category));
  }, [params]);
  if (isLoading) {
    return (
      <div>
        <CourseCardSkeleton />
      </div>
    );
  }

  const onMutate = (event) => {
    if (filters[event.target.id].includes(event.target.value)) {
      const values = filters[event.target.id].filter((value, index) => {
        return value !== event.target.value;
      });
      console.log(values);
      setFilters((prevState) => ({
        ...prevState,
        [event.target.id]: values,
      }));
      return;
    }
    setFilters((prevState) => ({
      ...prevState,
      [event.target.id]: [...prevState[event.target.id], event.target.value],
    }));
  };

  return (
    <div className="mx-16 my-8">
      <p className="font-bold text-3xl my-2">All {params.category} courses</p>
      <div className="grid grid-cols-5 gap-8 ">
        <div className="col-span-1">
          <div>
            <p className="font-bold">Sort by</p>
            <DropdownComponent
              options={sortBy}
              value={sortBy}
              variant="p-2 w-full"
            />
          </div>
          <Divider />
          <div>
            <p className="font-bold text-2xl">Ratings</p>
            <RatingFilterComponent handleChange={onMutate} />
          </div>
          <Divider />
          <CourseLevelFilterComponent
            id="level"
            // value={filters.level}
            handleChange={onMutate}
          />
          <Divider />
          <CourseLanguageFilterComponent
            id="language"
            // value={filters.language}
            handleChange={onMutate}
          />
        </div>
        <div className="col-span-4">
          <p className="text-right font-bold text-lg">
            {courses?.length} result(s)
          </p>
          {courses?.map((course, index) => (
            <div
              className="flex gap-2 py-4 border-b border-b-slate-300 first-of-type:pt-0 last-of-type:border-b-0"
              key={index}
            >
              <img
                src={course.courseThumbnail}
                alt="course thumbnail"
                className="w-1/4 h-36 object-cover"
              />
              <div>
                <p className="font-bold text-lg">{course.courseTitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default CoursesByCategory;
