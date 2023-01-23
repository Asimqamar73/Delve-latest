import React from "react";
import { useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchCourseDetails } from "../../services/store/courses/coursesSlice";

function CourseDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.course);
  useEffect(() => {
    dispatch(fetchCourseDetails(params.courseId));
  }, []);

  if (!course) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingIcons.Puff stroke="green" />
      </div>
    );
  }

  return <div></div>;
}

export default CourseDetails;
