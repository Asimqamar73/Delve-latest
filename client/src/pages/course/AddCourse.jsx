import React from "react";
import { Link } from "react-router-dom";
import DropdownComponent from "../../components/commonComponents/DropdownComponent";
import InputComponent from "../../components/commonComponents/InputComponent";
import profileImg from "../../assets/images/profileImg.jpg";
import { IoMdArrowRoundBack } from "react-icons/io";
import { MdCameraEnhance } from "react-icons/md";
import { useState } from "react";

function AddCourse() {
  const categries = ["Development", "Business", "IT & Software", "Art"];
  const [courseInfo, setCourseInfo] = useState({
    title: "",
    courseCategory: "",
    description: "",
    thumbnail: "",
  });
  const onMutate = (event) => {
    if (event.target.files) {
      setCourseInfo((prevState) => ({
        ...prevState,
        thumbnail: event.target.files[0],
      }));
    }
    if (!event.target.files) {
      console.log(courseInfo);
      setCourseInfo((prevState) => ({
        ...prevState,
        [event.target.id]: event.target.value,
      }));
    }
  };
  return (
    <div>
      <div>
        <div className="flex justify-between items-center px-8 py-2 bg-base-200">
          <div>
            <Link to="/instructor/dashboard" className="font-bold text-lg">
              <div className="flex items-center gap-2">
                <IoMdArrowRoundBack size={24} />
                <p>Back to dashboard</p>
              </div>
            </Link>
          </div>
          <div>
            <div className="avatar">
              <div className="rounded w-12 h-12">
                <img src={profileImg} />
              </div>
            </div>
          </div>
        </div>
        <div className="mx-8">
          <div>
            <p className="font-bold text-3xl">Course Information</p>
          </div>
          <div className="my-4">
            <p className="font-bold">Course title</p>
            <InputComponent
              type="text"
              placeholder="eg. Javascript for beginner"
              id="title"
              value={courseInfo.title}
              handleChange={onMutate}
            />
          </div>
          <div className="my-4">
            <p className="font-bold">Course category</p>
            <DropdownComponent
              options={categries}
              name="courseCategory"
              id="courseCategory"
              variant="p-2"
              value={courseInfo.courseCategory}
              handleChange={onMutate}
            />
          </div>
          <div className="my-4 ">
            <p className="font-bold">Course brief description</p>
            <textarea
              className="bg-base-200 p-2 rounded outline-none  focus:outline-green-400 outline-[1px]"
              rows={8}
              cols={32}
              id="description"
              value={courseInfo.description}
              onChange={onMutate}
            />
          </div>
          <div className="my-4">
            <p className="font-bold">Course thumbnail</p>
            <label htmlFor="thumbnail">
              <div
                className="w-44 h-32 flex items-center justify-center border-green-400 border-[1px] rounded hover:bg-slate-200"
                htmlFor="thumbnail"
              >
                {courseInfo.thumbnail ? "" : <MdCameraEnhance size={24} />}
              </div>
            </label>
            <input
              type="file"
              name="thumbnail"
              id="thumbnail"
              hidden
              value={courseInfo.thumbnail}
              onChange={onMutate}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddCourse;
