import React from "react";
import { Link, useNavigate } from "react-router-dom";
import DropdownComponent from "../../components/commonComponents/DropdownComponent";
import InputComponent from "../../components/commonComponents/InputComponent";
import addCourseImg from "../../assets/images/add-course-img (2).svg";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCameraEnhance } from "react-icons/md";
import { useState } from "react";
import UserProfileIcon from "../../components/commonComponents/UserProfileIcon";
import { useSelector, useDispatch } from "react-redux";
import { publishCourse } from "../../services/store/instructor/instructorDashboardSlice";
import { useEffect } from "react";
import { toast } from "react-toastify";

function AddCourse() {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const status = useSelector((state) => state.instructor.status);

  const categories = ["Development", "Business", "IT & Software", "Art"];
  const [courseInfo, setCourseInfo] = useState({
    courseTitle: "",
    courseCategory: "",
    courseDescription: "",
    courseThumbnail: null,
  });

  useEffect(()=>{
    console.log(status)
    if(status==="success"){
      toast.success("Course created successfully")
      navigate("/instructor/dashboard")
    }
    if(status==="failed"){
      toast.error("Something went wrong please try again.")
    }
  },[status])
  const onMutate = (event) => {
    if (event.target.files) {
      setCourseInfo((prevState) => ({
        ...prevState,
        courseThumbnail: event.target.files[0],
      }));
    }
    if (!event.target.files) {
      setCourseInfo((prevState) => ({
        ...prevState,
        [event.target.id]: event.target.value,
      }));
    }
  };
  const handleCourseSubmition = (event) => {
    event.preventDefault();
    const courseData = new FormData();
    courseData.append("courseTitle", courseInfo.courseTitle);
    courseData.append("courseCategory", courseInfo.courseCategory);
    courseData.append("courseDescription", courseInfo.courseDescription);
    courseData.append("courseThumbnail", courseInfo.courseThumbnail);
    dispatch(publishCourse(courseData));
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-8 py-2 bg-base-200 shadow shadow-slate-100 sticky top-0">
          <div>
            <Link to="/instructor/dashboard" className="font-bold text-lg">
              <div className="flex items-center gap-2">
                <IoMdArrowRoundBack size={24} />
                <p>Back to dashboard</p>
              </div>
            </Link>
          </div>
          <div>
            <UserProfileIcon />
          </div>
        </div>
        <div className="grid grid-cols-3">
          <div className="col-span-1 p-8 bg-base-300">
            <div>
              <p className="font-bold text-3xl">Course Information</p>
            </div>
            <form onSubmit={handleCourseSubmition}>
              <div className="my-4">
                <p className="font-bold">Course title</p>
                <InputComponent
                  type="text"
                  placeholder="Eg. Javascript for beginner"
                  id="courseTitle"
                  className="w-full p-4 bg-base-100"
                  value={courseInfo.courseTitle}
                  handleChange={onMutate}
                />
              </div>
              <div className="my-4">
                <p className="font-bold">Course category</p>
                <DropdownComponent
                  options={categories}
                  name="courseCategory"
                  id="courseCategory"
                  variant="p-2 bg-base-100"
                  value={courseInfo.courseCategory}
                  handleChange={onMutate}
                />
              </div>
              <div className="my-4 ">
                <p className="font-bold">Course brief description</p>
                <textarea
                  className="bg-base-100 p-2 rounded outline-none focus:outline-green-400 outline-[1px] w-full"
                  rows={8}
                  
                  id="courseDescription"
                  value={courseInfo.courseDescription}
                  onChange={onMutate}
                />
              </div>
              <div className="my-4">
                <p className="font-bold">Course thumbnail</p>
                <label htmlFor="courseThumbnail">
                  <div className="h-52 w-2/3 flex items-center justify-center border-green-400 border-[1px] rounded bg-base-100 hover:bg-base-100/80 hover:cursor-pointer">
                    {courseInfo.courseThumbnail ? (
                      <img
                        src={URL.createObjectURL(courseInfo.courseThumbnail)}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <MdCameraEnhance size={36} />
                    )}
                  </div>
                </label>
                <input
                  type="file"
                  name="courseThumbnail"
                  id="courseThumbnail"
                  hidden
                  onChange={onMutate}
                />
              </div>
              <div className="my-4">
                <ButtonComponent
                  name="Continue"
                  className="btn-wide bg-green-500 hover:bg-green-600 text-white "
                />
              </div>
            </form>
          </div>
          <div className="col-span-2">  
          <div className="flex justify-center items-center h-full bg-base-100">
            <img src={addCourseImg} alt="" className="w-3/5 "  />
          </div>


          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
