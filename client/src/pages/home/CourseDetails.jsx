import React from "react";
import { useEffect } from "react";
import LoadingIcons from "react-loading-icons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import parser from "html-react-parser";
import { ImFilePlay } from "react-icons/im";
import { FaAngleDown } from "react-icons/fa";
import { fetchCourseDetails } from "../../services/store/courses/coursesSlice";
import CourseDetailSkeleton from "./component/CourseDetailSkeleton";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { enrollCourse } from "../../services/store/user/userSlice";

function CourseDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courses.course);
  const user = useSelector((state) => state.user.user);
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
      <div className="grid grid-cols-3 mx-12 my-4 gap-8">
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
            {course?.courseCurriculum.map((section, sectionIndex) => (
              <div class="collapse border-collapse border-[1px] border-gray-400 ">
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-base-100 text-primary-content peer-checked:bg-gray-100 peer-checked:text-secondary-content ">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-bold">
                        Section {sectionIndex + 1}: {section.sectionTitle}
                      </p>
                      <p className="text-xs font-normal">
                        {section.sectionVideos.length}{" "}
                        {section.sectionVideos.length > 1
                          ? "lectures"
                          : "lecture"}
                      </p>
                    </div>
                    <FaAngleDown />
                  </div>
                </div>
                <div className="collapse-content bg-base-100 text-primary-content peer-checked:bg-base-100 peer-checked:text-secondary-content">
                  {section.sectionVideos.map((video) => (
                    <p className="flex items-center gap-2 p-[2px]">
                      <ImFilePlay /> {video.videoTitle}
                    </p>
                  ))}
                </div>
              </div>
            ))}
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
          <div className="card  bg-base-200 rounded-lg shadow-lg sticky top-20 ">
            <figure>
              <img src={course?.courseThumbnail} alt="Course thumbnail" />
            </figure>
            <div className="card-body">
              <div className="card-actions justify-center ">
                {!isEnrolled(user, course?._id) ? (
                  <ButtonComponent
                    name="Enroll course"
                    className="btn-wide bg-green-400 text-white border-none"
                    click={() => dispatch(enrollCourse(course._id))}
                  />
                ) : (
                  <ButtonComponent
                    name="Enrolled"
                    className="btn-wide bg-slate-900 text-red-600 border-none"
                    click={() => navigate("/course/enrolledCourses")}
                  />
                )}
              </div>
            </div>
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
const isEnrolled = (user, courseId) => {
  const course = user?.enrolledCourses.some((course) => {
    return course.courseId._id === courseId;
  });
  return course;
};

export default CourseDetails;
