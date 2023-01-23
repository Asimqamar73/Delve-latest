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
    console.log(course);
  }, []);

  if (!course) {
    return (
      <div className="h-full flex justify-center items-center">
        <LoadingIcons.Puff stroke="green" />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-current grid grid-cols-4 py-4 px-12">
        <div className="col-span-2 text-white">
          <p className="font-bold text-4xl">{course.courseTitle}</p>
          <p>
            Created by:{" "}
            <span className="font-bold"> {course.courseInstructor.name}</span>
          </p>
        </div>
        <div>
          <img src={course.courseThumbnail} alt="" />
        </div>
      </div>
      <div className="grid grid-cols-3">
        <div className="col-span-2 mx-12 my-4">
          <div className="border-[1px] border-slate-400 rounded p-8">
            <p className="font-bold text-2xl">What you will learn.</p>
            <ul className="grid grid-cols-2 list-inside">
              {course.courseObjectives.map((objective) => (
                <li className="px-2 py-[2px]"> {objective}</li>
              ))}
            </ul>
          </div>
          <div className="my-4">
            <p className="font-bold text-3xl">Course Content</p>
            <p>{course.courseCurriculum.length} section(s)</p>
            {/* <table className="w-full">
              <tbody>
                {course.courseCurriculum.map((section, sectionIndex) => (
                  <tr className="border-[1px] border-slate-500">
                    <td className="font-bold text-lg p-4">
                      {section.sectionTitle}
                    </td>
                    <td className="text-end p-4">
                      {section.sectionVideos.length} lecture(s)
                    </td>
                  </tr>
                ))}
              </tbody>
            </table> */}
            <ol>
            {
              course.courseCurriculum.map((section)=>(
                <li></li>
              ))
            }
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CourseDetails;
