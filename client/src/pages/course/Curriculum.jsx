import React from "react";
import { useState } from "react";
import { FaVideo } from "react-icons/fa";
import { GrStatusGood } from "react-icons/gr";
import { TbNewSection } from "react-icons/tb";
import DeleteIcon from "./components/DeleteIcon";
import { useSelector, useDispatch } from "react-redux";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import Divider from "../../components/commonComponents/Divider";
import InputComponent from "../../components/commonComponents/InputComponent";
import PageHeading from "../../components/commonComponents/PageHeading";
import {
  manageCourseCurriculumContent,
  manageCourseCurriculumSection,
} from "../../services/store/courseListing/courseListingSlice";
import { useEffect } from "react";
import { STATUSES } from "../../services/requestStatues";
import { toast } from "react-toastify";

function Curriculum() {
  const dispatch = useDispatch();
  const { course, status, message } = useSelector((state) => state.courseListing);

  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      toast.success("Course updated successfully.")
    }
    if (status === STATUSES.ERROR) {
      toast.error(message)
    }
  })
  const [isEditSection, setIsEditSection] = useState({
    isEdit: false,
    index: null,
  });
  const [isEditContent, setIsEditContent] = useState({
    isEdit: false,
    index: null,
    sectionIndex: null,
  });
  const [sections, setSections] = useState(course.courseCurriculum);
  const handleSectionCreation = () => {
    setIsEditSection({ index: sections.length, isEdit: true });
    setSections((prevState) => [
      ...prevState,
      {
        sectionTitle: "",
        sectionVideos: [],
      },
    ]);
  };
  const cancelSectionCreation = (indexOfSection) => {
    const newSectionsList = sections.filter((section, index) => {
      return index !== indexOfSection;
    });
    setSections(newSectionsList);
    setIsEditSection({ isEdit: false, index: null });
  };

  const handleSectionTitleSubmition = (position) => {
    setIsEditSection({ isEdit: false, index: null });

    dispatch(
      manageCourseCurriculumSection({ ...sections[position], id: course._id })
    );
  };
  const onSectionMutate = (value, position) => {
    const values = [...sections];
    values[position].sectionTitle = value;
    setSections(values);
  };

  // * Functions belongs to videos inside sections
  const handleVideoAddition = (position) => {
    setIsEditContent({
      isEdit: true,
      index: sections[position].sectionVideos.length,
      sectionIndex: position,
    });
    const modifiedData = sections.map((section, index) => {
      // console.log(section);
      if (index === position) {
        return {
          ...section,
          sectionVideos: [
            ...section.sectionVideos,
            { videoTitle: "", content: null },
          ],
        };
      } else {
        return section;
      }
    });

    setSections(modifiedData);
    // console.log(sections);
  };
  const cancelVideoAddition = (sectionIndex, videoIndex) => {
    const allSections = [...sections];
    allSections[sectionIndex].sectionVideos.pop();
    setSections(allSections);
    setIsEditContent({ isEdit: false, index: null, sectionIndex: null });
  };
  const handleVideoSubmition = (
    sectionIndex,
    videoIndex,
    sectionMongodDbId,
    courseId
  ) => {
    setIsEditContent({
      isEdit: false,
      index: null,
      sectionIndex: null,
    });

    const videoData = new FormData();
    videoData.append(
      "videoTitle",
      sections[sectionIndex].sectionVideos[videoIndex].videoTitle
    );
    videoData.append(
      "content",
      sections[sectionIndex].sectionVideos[videoIndex].content
    );
    videoData.append("sectionId", sectionMongodDbId);
    videoData.append("courseId", courseId);
    dispatch(manageCourseCurriculumContent(videoData));
  };

  const onVideoMutate = (event, sectionIndex, videoIndex) => {
    if (event.target.files) {
      const allData = [...sections];
      allData[sectionIndex].sectionVideos[videoIndex].content =
        event.target.files[0];
      setSections(allData);
    }
    if (!event.target.files) {
      const allData = [...sections];
      allData[sectionIndex].sectionVideos[videoIndex].videoTitle =
        event.target.value;
      setSections(allData);
    }
  };

  return (
    <div>
      <PageHeading title="Curriculum" />
      <Divider />
      <div>
        <p>
          Start putting together your course by creating sections and lectures.
          Use your course outline to structure your content and label your
          sections and lectures clearly.{" "}
        </p>
      </div>

      <div>
        {sections.map((section, parentIndex) => (
          <div
            className="my-2 p-4 border-[2px] rounded border-slate-700"
            key={parentIndex}
          >
            {isEditSection.isEdit && isEditSection.index === parentIndex ? (
              <div>
                <p className="font-bold">Section title</p>
                <InputComponent
                  type="text"
                  placeholder="Section title here. Note: section must have a name."
                  className="p-4 w-full"
                  name={parentIndex}
                  id={parentIndex}
                  value={section.sectionTitle}
                  handleChange={(event) =>
                    onSectionMutate(event.target.value, parentIndex)
                  }
                />
                <div className="flex justify-end gap-2 mt-2 ">
                  <ButtonComponent
                    name={"cancel"}
                    className="btn-sm bg-transparent "
                    click={() => cancelSectionCreation(parentIndex)}
                  />

                  <ButtonComponent
                    name={"Add section"}
                    className="btn-sm"
                    click={() => handleSectionTitleSubmition(parentIndex)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <p>
                    Section {parentIndex + 1}:{" "}
                    <span className="font-bold text-lg text-slate-700">
                      {" "}
                      {section.sectionTitle}
                    </span>
                  </p>
                </div>
                {section.sectionVideos.length !== 0 && (
                  <div className="border-[1px] border-green-400 p-4">
                    <ul>
                      {section.sectionVideos.map((video, videoIndex) => (
                        <div key={videoIndex}>
                          {isEditContent.isEdit &&
                            isEditContent.index === videoIndex &&
                            isEditContent.sectionIndex == parentIndex ? (
                            <div className="border-[1px] border-green-400 bg-base-300 rounded p-4">
                              <div className="my-2">
                                <p className="font-bold">Lecture title</p>
                                <InputComponent
                                  type="text"
                                  className="w-full p-4 "
                                  placeholder="Lecture title here."
                                  name={videoIndex}
                                  id={videoIndex}
                                  value={video.videoTitle}
                                  handleChange={(event) =>
                                    onVideoMutate(
                                      event,
                                      parentIndex,
                                      videoIndex
                                    )
                                  }
                                />
                              </div>
                              <div className="my-2">
                                <input
                                  type="file"
                                  name=""
                                  id=""
                                  onChange={(event) =>
                                    onVideoMutate(
                                      event,
                                      parentIndex,
                                      videoIndex
                                    )
                                  }
                                />
                              </div>
                              <div className="flex justify-end gap-2">
                                <ButtonComponent
                                  name="cancel"
                                  className="btn-sm bg-transparent text-slate-700 hover:bg-base-200/50 hover:text-slate-700"
                                  click={() =>
                                    cancelVideoAddition(parentIndex, videoIndex)
                                  }
                                />
                                <ButtonComponent
                                  name="add lecture"
                                  className="btn-sm bg-green-400 text-slate-700 border-none"
                                  click={() =>
                                    handleVideoSubmition(
                                      parentIndex,
                                      videoIndex,
                                      section._id,
                                      course._id
                                    )
                                  }
                                />
                              </div>
                            </div>
                          ) : (
                            <div className="relative">
                              <li
                                className="flex items-center gap-2 p-4 border-[2px] rounded-lg border-green-300 my-2"
                                key={videoIndex}
                              >
                                <GrStatusGood /> {`Lecture ${videoIndex + 1}:`}{" "}
                                <span className="font-bold">
                                  {video.videoTitle}
                                </span>
                              </li>
                              <DeleteIcon />
                            </div>
                          )}
                        </div>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="my-2">
                  {!isEditContent.isEdit && (
                    <div>
                      <button
                        className="btn capitalize text-slate-700 border-[1px] border-green-400 bg-transparent hover:bg-green-400 hover:border-green-400"
                        onClick={() => handleVideoAddition(parentIndex)}
                      >
                        <FaVideo size={18} className="mr-[4px]" />
                        Add video lecture
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div>
        {!isEditSection.isEdit && (
          <button
            className="btn capitalize text-white text-lg border-[1px] border-slate-700"
            onClick={handleSectionCreation}
          >
            <TbNewSection size={24} className="mr-[4px]" />
            Add section
          </button>
        )}
      </div>
    </div>
  );
}

export default Curriculum;
