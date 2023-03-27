import React from "react";
import { useEffect } from "react";
import moment from "moment"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import parser from "html-react-parser";
import { ImFilePlay } from "react-icons/im";
import { FaAngleDown, FaStar } from "react-icons/fa";
import { fetchCourseDetails } from "../../services/store/courses/coursesSlice";
import CourseDetailSkeleton from "./components/CourseDetailSkeleton";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { enrollCourse } from "../../services/store/auth/authSlice";
import { BsCheck, BsDot, } from "react-icons/bs";
import { RxDotFilled } from "react-icons/rx"
import { fetchCourseReviews } from "../../services/store/courseReview/courseReviewSlice";
import Divider from "../../components/commonComponents/Divider";

function CourseDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { course, isLoading } = useSelector((state) => state.courses);
  const { reviews } = useSelector((state) => state.courseReview);

  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    Promise.all([dispatch(fetchCourseDetails(params.courseId)),
    dispatch(fetchCourseReviews(params.courseId))
    ])

  }, [params]);

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

          {
            course?.averageRating &&
            <p className="flex items-center gap-[4px]">
              <FaStar className="text-yellow-400" />
              <span className="font-bold text-yellow-400"> {course?.averageRating.toPrecision(2)}</span>
              <span>({reviews?.length} {reviews?.length > 1 ? "ratings" : "rating"})</span>
            </p>
          }

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
          <div className="border-[1px] border-slate-400 p-8">
            <p className="font-bold text-2xl">What you will learn.</p>
            <ul className="grid grid-cols-2 my-2 gap-4">
              {course?.courseObjectives.map((objective) => (
                <li className=" text-justify flex items-start gap-[4px]">
                  <span>
                    {" "}
                    <BsCheck size={24} />
                  </span>{" "}
                  {objective}
                </li>
                // </div>
              ))}
            </ul>
          </div>
          <div className="my-4">
            <p className="font-bold text-2xl">Course Content</p>
            <p>
              <span className="font-bold">
                {course?.courseCurriculum.length}{" "}
              </span>
              {course?.courseCurriculum.length > 1 ? "sections" : "section"}{" "}
              <span className="font-bold">{course?.totalVideos} </span>
              {course?.totalVideos > 1 ? "lectures" : "lecture"}{" "}
            </p>

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
                    <p className="flex items-center gap-2 pt-2">
                      <ImFilePlay /> {video.videoTitle}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="my-4">
            <p className="font-bold text-2xl">Course requirements</p>
            <ul className="list-inside list-disc">
              {course?.courseRequirements.map((requirement) => (
                <li>{requirement}</li>
              ))}
            </ul>
          </div>
          <div className="my-4">
            <p className="font-bold text-2xl">Course description</p>
            {course && (
              <div className="text-justify">
                {parser(course?.courseDescription)}
              </div>
            )}
          </div>

          <div className="my-4">
            <p className="font-bold text-2xl">Course instructor</p>
            <div>
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
          {reviews?.length > 0 &&
            <div>
              <div className="mt-4">
                <p className="text-2xl font-bold flex items-center">
                  <span className="flex items-center gap-[2px]">
                    <FaStar className="text-yellow-500" /> {course?.averageRating.toPrecision(2)} course rating
                  </span>
                  <RxDotFilled />
                  <span>
                    {reviews?.length} ratings
                  </span>
                </p>
              </div>
              <Divider />
              <div className="my-4">
                <div className="grid grid-cols-2 gap-8">
                  {
                    reviews &&
                    reviews.map((review) => (
                      <div className="col-span-1">
                        <div className="flex gap-4">
                          <div className="avatar placeholder">
                            <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                              <span className="text-2xl"> {
                                review.reviewerId.name[0]
                              }</span>
                            </div>
                          </div>
                          <div className="flex flex-col justify-center">
                            <p className="font-bold">
                              {review.reviewerId.name}
                            </p>
                            <div className="flex items-center gap-[4px]">
                              <span className="font-bold text-yellow-400"> {review?.rating.toPrecision(2)}</span>
                              <FaStar className="text-yellow-400" />
                              <span>{moment(review.createdAt).fromNow()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="my-2 text-justify">
                          {review.review}
                        </div>
                      </div>
                    ))
                  }
                </div>
              </div>
            </div>
          }
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
  if (!time) {
    return;
  }
  const newDate = new Date(time).toISOString().split("T")[0];
  return newDate;
};
const isEnrolled = (user, courseId) => {
  const course = user?.enrolledCourses.some((course) => {
    return course.courseId._id === courseId;
  });
  return course;
};

export default CourseDetails;
