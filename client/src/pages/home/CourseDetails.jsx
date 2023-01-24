import React from "react";
import { useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import parser from "html-react-parser";
import { ImFilePlay } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa";
import { fetchCourseDetails } from "../../services/store/courses/coursesSlice";
import CourseDetailSkeleton from "./component/CourseDetailSkeleton";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { enrollCourse } from "../../services/store/user/userSlice";

function CourseDetails() {
  const params = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.course);
  const isLoading = useSelector((state) => state.courses.isLoading);

  useEffect(() => {
    dispatch(fetchCourseDetails(params.courseId));
  }, []);

  // const handleCourseEnrollment = (courseId) => {
  //   console.log(courseId);
  // };

  if (isLoading) {
    return (
      <div>
        <CourseDetailSkeleton />
      </div>
    );
  }

  return (
    <div className="">
      <div className="bg-current grid grid-cols-4 gap-4 py-4 px-12">
        <div className="col-span-2 text-white">
          <p className="font-bold text-4xl">{course?.courseTitle}</p>
          <p>
            Created by:{" "}
            <span className="font-bold"> {course?.courseInstructor.name}</span>
          </p>
          <p>
            Course level:{" "}
            <span className="font-bold"> {course?.courseLevel}</span>
          </p>
          <p>
            Language:{" "}
            <span className="font-bold"> {course?.courseLanguage}</span>
          </p>
          <p>
            Last updated:{" "}
            <span className="font-bold">
              {" "}
              {dateExtractor(course?.updatedAt)}
            </span>
          </p>
        </div>
        <div>
          <img src={course?.courseThumbnail} alt="" />
        </div>
      </div>
      <div className="grid grid-cols-3 mx-12 my-4 gap-4">
        <div className="col-span-2 ">
          <div className="border-[1px] border-slate-400 rounded p-8">
            <p className="font-bold text-2xl">What you will learn.</p>
            <ul className="grid grid-cols-2 list-inside">
              {course?.courseObjectives.map((objective) => (
                <li className="px-2 py-[2px]"> {objective}</li>
              ))}
            </ul>
          </div>
          <div className="my-4">
            <p className="font-bold text-3xl">Course Content</p>
            <p>{course?.courseCurriculum.length} section(s)</p>
            <table className="table-auto border-collapse border-[1px] border-slate-500 w-full">
              <tbody>
                {course?.courseCurriculum.map((section, sectionIndex) => (
                  <div>
                    <tr className=" bg-base-200 border-collapse border-[1px] border-slate-500">
                      <td className="font-bold text-lg p-4 w-full">
                        <div className="flex items-center gap-2">
                          <FaAngleDown />
                          {section.sectionTitle}
                        </div>
                      </td>
                      <td className="flex gap-2 p-4">
                        <span className="font-bold">
                          {section.sectionVideos.length}{" "}
                        </span>
                        {section.sectionVideos.length > 1
                          ? "lectures"
                          : "lecture"}
                      </td>
                    </tr>
                    {section.sectionVideos.map((video) => (
                      <tr className="">
                        <td className=" flex items-center gap-2 p-2">
                          <ImFilePlay /> {video.videoTitle}
                        </td>
                      </tr>
                    ))}
                  </div>
                ))}
              </tbody>
            </table>
          </div>
          <div className="my-4">
            <p className="font-bold text-3xl">Course requirements</p>
            <ul className="list-inside list-disc">
              {course?.courseRequirements.map((requirement) => (
                <li>{requirement}</li>
              ))}
            </ul>
          </div>
          <div className="my-4">
            <p className="font-bold text-3xl">Course description</p>
            {course && (
              <div className="text-justify">
                {parser(course?.courseDescription)}
              </div>
            )}
          </div>
          <div className="my-4">
            <p className="font-bold text-3xl">Course instructor</p>
          </div>
          <div className="">
            <div className="w-36 h-36">
              <img
                src={course?.courseInstructor.avatar}
                className="rounded-2xl h-full w-full object-cover"
                alt=""
              />
            </div>
            <div>
              <p className="font-bold text-xl">
                {course?.courseInstructor.name}
              </p>
              <p>{course?.courseInstructor.email}</p>
            </div>
          </div>
        </div>
        <div>
          <div className="sticky top-20 ">
            <img
              src={course?.courseThumbnail}
              className="mb-2 rounded"
              alt=""
            />
            <ButtonComponent
              name="Enroll course"
              className="w-full bg-green-400 text-white border-none"
              click={()=>dispatch(enrollCourse(course._id))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const dateExtractor = (time) => {
  const newDate = new Date().toISOString().split("T")[0];

  return newDate;
};

export default CourseDetails;
