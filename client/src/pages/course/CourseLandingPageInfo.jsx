import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../../components/commonComponents/Divider";
import InputComponent from "../../components/commonComponents/InputComponent";
import DropdownComponent from "../../components/commonComponents/DropdownComponent";
import PageHeading from "../../components/commonComponents/PageHeading";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { modifyCourse } from "../../services/store/courseListing/courseListingSlice";
import { categories } from "../../services/store/courseListing/courseCategories";
import { languages } from "../../services/store/courseListing/courseLanguages";
import { levels } from "../../services/store/courseListing/courseLevels";
import { STATUSES } from "../../services/requestStatues";
import { toast } from "react-toastify";


function CourseLandingPageInfo() {
  const dispatch = useDispatch();
  const { course, status, message } = useSelector((state) => state.courseListing);
  const [value, setValue] = useState(course.courseDescription);
  const [courseInfo, setCourseInfo] = useState({
    courseTitle: course.courseTitle,
    courseDescription: course.courseDescription,
    courseCategory: course.courseCategory,
    courseThumbnail: course.courseThumbnail,
    courseLanguage: course.courseLanguage,
    courseLevel: course.courseLevel,
  });
  const onMutate = (event) => {
    setCourseInfo((prevState) => ({
      ...prevState,
      [event.target.id]: event.target.value,
    }));
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      toast.success("Course updated.")
    }
    if (status === STATUSES.ERROR) {
      toast.error(message)
    }
  }, [])
  const handleSubmit = (event) => {
    event.preventDefault();
    courseInfo.courseDescription = value;
    courseInfo.id = course._id;
    dispatch(modifyCourse(courseInfo));
  };
  return (
    <div>
      <PageHeading title="Course landing page" />
      <Divider />
      <div>
        <p className="text-justify">
          Your course landing page is crucial part of course creation. If it’s
          done right, it can also help you gain visibility in search engines.
          All the below information will be visable in the entire application.
          As you complete this section, think about creating a compelling Course
          Landing Page that demonstrates why someone would want to enroll in
          your course
        </p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className=" my-4">
          <p className="font-bold ">Course title</p>
          <InputComponent
            type="text"
            value={courseInfo.courseTitle}
            name="courseTitle"
            id="courseTitle"
            className="w-full p-4"
            handleChange={onMutate}
          />
        </div>
        <div className=" my-4">
          <p className="font-bold">Course Description</p>
          <ReactQuill
            theme="snow"
            name="courseDescription"
            id="courseDescription"
            value={value}
            onChange={setValue}
            className="bg-base-200 "
          />
        </div>
        <div className="grid grid-cols-3 gap-4 my-4">
          <div>
            <p className="font-bold">Language</p>
            <DropdownComponent
              options={languages}
              name="courseLanguage"
              id="courseLanguage"
              variant="p-4 bg-base-200 w-full border-2"
              value={courseInfo.courseLanguage}
              handleChange={onMutate}
            />
          </div>
          <div>
            <p className="font-bold">Level</p>
            <DropdownComponent
              options={levels}
              name="courseLevel"
              id="courseLevel"
              variant="p-4 bg-base-200 w-full border-2"
              value={courseInfo.courseLevel}
              handleChange={onMutate}
            />
          </div>
          <div>
            <p className="font-bold">Category</p>
            <DropdownComponent
              options={categories}
              name="courseCategory"
              id="courseCategory"
              variant="p-4 bg-base-200 w-full border-2"
              value={courseInfo.courseCategory}
              handleChange={onMutate}
            />
          </div>
        </div>
        <div className="my-4 float-right">
          <ButtonComponent
            name="Save"
            className="btn-wide bg-green-500 text-white border-none"
          />
        </div>
      </form>
    </div>
  );
}

export default CourseLandingPageInfo;
