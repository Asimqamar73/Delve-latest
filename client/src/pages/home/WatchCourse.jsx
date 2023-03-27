import React, { useEffect, useState } from "react";
import parser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { learnCourse } from "../../services/store/courseLearnig/courseLearningSlice";
import Logo from "../../components/commonComponents/Logo";
import UserProfileIcon from "../../components/commonComponents/UserProfileIcon";
import LoadingIcons from "react-loading-icons";
import { FaAngleDown } from "react-icons/fa";
import { BsPlayBtn } from "react-icons/bs";
import Divider from "../../components/commonComponents/Divider";
import ReviewModal from "./components/ReviewModal";
import { STATUSES } from "../../services/requestStatues";
import { fetchCourseReviews, reviewCourse } from "../../services/store/courseReview/courseReviewSlice";
import { toast } from "react-toastify"


function WatchCourse() {
  const params = useParams();
  const dispatch = useDispatch();
  const [play, setPlay] = useState(null);
  const { user } = useSelector((state) => state.auth)
  const { course, status } = useSelector((state) => state.courseLearning);
  const { reviews, status: reviewStatus } = useSelector((state) => state.courseReview);

  const [feedback, setFeedback] = useState({
    rating: 5,
    review: "",
  });

  const onMutate = (event) => {
    setFeedback((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };
  const handleFeedbackSubmition = () => {
    feedback.courseId = course._id;
    dispatch(reviewCourse(feedback));
  };


  useEffect(() => {
    Promise.all([dispatch(learnCourse(params.courseId)),
    dispatch(fetchCourseReviews(params.courseId))
    ])

  }, []);

  if (status === STATUSES.LOADING) {
    return (
      <div className="h-screen flex items-center justify-center">
        <LoadingIcons.Puff stroke="green" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex justify-between items-center p-2 px-16 bg-base-200 sticky top-0 z-10">
        <Logo />
        <p className="font-bold text-lg">{course?.courseTitle}</p>
        <UserProfileIcon />
      </div>
      <div>
        <div className="grid grid-cols-4">
          <div className="col-span-3">
            <div>
              <video
                autoPlay
                src={
                  play
                    ? play
                    : course?.courseCurriculum[0].sectionVideos[0].content
                }
                className="w-full h-[520px] bg-current"
                controls
                controlsList="nodownload"
              ></video>
            </div>
            <div className="p-8">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-bold text-2xl">About this course</p>
                  <p>Course level: {course?.courseLevel}</p>
                </div>
                {
                  reviewStatus === STATUSES.IDLE && reviews && < div >
                    {
                      !isReviewed(reviews, user._id) && <div>
                        <ReviewModal
                          handleChange={onMutate}
                          submitFeedback={handleFeedbackSubmition}
                        />
                      </div>
                    }
                  </div>
                }
                {/* <ReviewModal
                  handleChange={onMutate}
                  submitFeedback={handleFeedbackSubmition}
                /> */}

              </div>
              <Divider />
              <div className="grid grid-cols-3">
                <div className="col-span-1 font-bold">
                  <p>Description</p>
                </div>

                <div className="col-span-2">
                  {course && (
                    <div className="text-justify ">
                      {parser(course?.courseDescription)}
                    </div>
                  )}

                  <div className="my-4">
                    <p className="font-bold text-lg">What you will learn?</p>
                    <ul className="list-inside list-disc">
                      {course?.courseObjectives.map((objective, index) => (
                        <li key={index}>{objective}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
              <Divider />
              <div className="grid grid-cols-3">
                <div className="col-span-1 font-bold">
                  <p>Instructor</p>
                </div>
                <div className="col-span-2">
                  <div className="flex items-center">
                    <div className="w-24 h-24 ">
                      <img
                        src={course?.courseInstructor.avatar}
                        alt="Instructor avatar"
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <div>
                      <p className="font-bold">
                        {course?.courseInstructor.name}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-1 bg-base-200 overflow-y-auto h-screen sticky top-0 border-l border-l-gray-300 ">
            {course?.courseCurriculum.map((section, sectionIndex) => (
              <div class="collapse border-collapse border-b-[1px] border-b-gray-400 " key={sectionIndex}>
                <input type="checkbox" className="peer" />
                <div className="collapse-title bg-base-300 text-primary-content  peer-checked:bg-base-300 peer-checked:text-secondary-content ">
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
                <div className="collapse-content bg-base-300 text-primary-content peer-checked:bg-base-100 peer-checked:text-secondary-content p-0 m-0">
                  {section.sectionVideos.map((video, videoIndex) => (
                    <p
                      className="flex items-center gap-2 py-2 mt-2 mx-2 px-2 rounded-md hover:bg-base-200 hover:cursor-pointer "
                      onClick={() => setPlay(video.content)}
                      key={videoIndex}
                    >
                      <BsPlayBtn /> {video.videoTitle}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div >
  );
}

const isReviewed = (array, value) => {
  // console.log(array, value)
  return array.some((el) => (
    el.reviewerId._id === value
  ))
}

export default WatchCourse;
