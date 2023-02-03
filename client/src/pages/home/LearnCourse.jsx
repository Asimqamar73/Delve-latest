import React, { useEffect, useState } from "react";
import parser from "html-react-parser";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { learnCourse } from "../../services/store/user/userSlice";
import Logo from "../../components/commonComponents/Logo";
import UserProfileIcon from "../../components/commonComponents/UserProfileIcon";
import LoadingIcons from "react-loading-icons";
import { FaAngleDown, FaRegPlayCircle } from "react-icons/fa";
import { BsPlayBtn } from "react-icons/bs";
import Divider from "../../components/commonComponents/Divider";

function LearnCourse() {
  const params = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.user.course);
  const isLoading = useSelector((state) => state.user.isLoading);
  const [play, setPlay] = useState(null);

  useEffect(() => {
    dispatch(learnCourse(params.courseId));
  }, []);

  if (isLoading) {
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
                src={
                  play
                    ? play
                    : course?.courseCurriculum[0].sectionVideos[0].content
                }
                className="w-full h-[520px] bg-current"
                // autoPlay
                controls
              ></video>
            </div>
            <div className="p-8">
              <div>
                <p className="font-bold text-2xl">About this course</p>
                Course level: {course?.courseLevel}
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
                      {course?.courseObjectives.map((objective) => (
                        <li>{objective}</li>
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
              <div class="collapse border-collapse border-b-[1px] border-b-gray-400 ">
                <input type="checkbox" className="peer"   />
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
                  {section.sectionVideos.map((video) => (
                    <p
                      className="flex items-center gap-2 py-2 mt-2 mx-2 px-2 rounded-md hover:bg-base-200 hover:cursor-pointer "
                      onClick={() => setPlay(video.content)}
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
    </div>
  );
}

export default LearnCourse;
