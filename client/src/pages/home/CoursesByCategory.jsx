import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Divider from "../../components/commonComponents/Divider";
import DropdownComponent from "../../components/commonComponents/DropdownComponent";
import { getCoursesbyCategory } from "../../services/store/courses/coursesSlice";
import CourseLanguageFilterComponent from "./components/CourseLanguageFilterComponent";
import CourseLevelFilterComponent from "./components/CourseLevelFilterComponent";
import RatingFilterComponent from "./components/RatingFilterComponent";
import LoadingIcon from "react-loading-icons";
import { HiStar } from "react-icons/hi";

function CoursesByCategory() {
  const params = useParams();
  const dispatch = useDispatch();
  const sortBy = ["Newest", "Trending", "Highest rated"];
  const courses = useSelector((state) => state.courses.courses);
  const totalCourses = useSelector((state) => state.courses.totalCourses);
  const totalPages = useSelector((state) => state.courses.noOfPages);
  const isLoading = useSelector((state) => state.courses.isLoading);
  const [sort, setSort] = useState("Newest")
  const [filters, setFilters] = useState({
    rating: null,
    language: [],
    level: [],
  });

  useEffect(() => {
    dispatch(getCoursesbyCategory(params.category, filters, sort));
  }, [params, filters, sort]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <LoadingIcon.Puff
          stroke="green"
          width={60}
          strokeWidth={1}
          height={60}
        />
      </div>
    );
  }

  const onMutate = (event) => {
    if (event.target.id === "rating") {
      setFilters((prevState) => ({
        ...prevState,
        rating: event.target.value,
      }));
    }
    else {
      if (filters[event.target.id].includes(event.target.value)) {
        const values = filters[event.target.id].filter((value, index) => {
          return value !== event.target.value;
        });
        console.log(values);
        setFilters((prevState) => ({
          ...prevState,
          [event.target.id]: values,
        }));
      } else {
        setFilters((prevState) => ({
          ...prevState,
          [event.target.id]: [...prevState[event.target.id], event.target.value],
        }));
      }

    }
  };
  const handleSorting = (event) => {
    // console.log(event.target.value)
    setSort(event.target.value)
  }

  return (
    <div className="mx-16 my-8">
      <p className="font-bold text-3xl my-2">All {params.category} courses</p>
      <div className="grid grid-cols-5 gap-8 ">
        <div className="col-span-1">
          <div>
            <p className="font-bold">Sort by</p>
            <DropdownComponent
              options={sortBy}
              value={sort}
              handleChange={handleSorting}
              variant="p-2 w-full"
            />
          </div>
          <Divider />
          <div>
            <p className="font-bold text-2xl">Ratings</p>
            <RatingFilterComponent handleChange={onMutate} value={filters.rating} />
          </div>
          <Divider />
          <CourseLevelFilterComponent
            id="level"
            handleChange={onMutate}
            selected={filters.level}
          />
          <Divider />
          <CourseLanguageFilterComponent
            id="language"
            handleChange={onMutate}
            selected={filters.language}
          />
        </div>
        <div className="col-span-4">
          <p className="text-right font-bold text-lg">
            {totalCourses} result(s)
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
                <p className="text-sm">{course.courseInstructor.name}</p>
                {
                  course.averageRating ? <div className="flex items-center gap-[2px]">
                    <span className="text-yellow-400"> <HiStar />
                    </span>
                    <p className="text-yellow-400 font-bold">{course.averageRating}
                    </p>
                    <span className=" text-xs mx-[4px] "> ({course.reviews.length})</span>
                  </div> : <p className="text-sm">Not rated yet.</p>
                }
                <p className="text-sm">
                  <span>
                    {course.courseCurriculum.length}{" "}
                    {course.courseCurriculum.length > 1
                      ? "sections"
                      : "section"}{" "}
                  </span>
                  {/* <span>
                    {course.totalVideos}{" "}
                    {course.totalVideos > 1 ? "lectures" : "lecture"}{" "}
                  </span> */}
                </p>
                <p className="text-sm">{course.courseLevel}</p>
              </div>
            </div>
          ))}
          <div class="btn-group flex justify-center my-8">

            <button class="btn btn-md">1</button>
            <button class="btn btn-md btn-active">2</button>
            <button class="btn btn-md">3</button>
            <button class="btn btn-md">4</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoursesByCategory;
