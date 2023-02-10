import React, { useEffect } from "react";
import { CgClose } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import LoadingIcon from "react-loading-icons"
import { useSelector } from "react-redux";
import InputComponent from "../../../components/commonComponents/InputComponent";

function Searchbar({ value, handleChange, clickCloseIcon }) {
  const { isLoading } = useSelector((state) => state.courses);

  return (
    <div className="px-8 py-4 flex justify-center items-center bg-slate-800 gap-2 border-b border-slate-700">
      <div className="flex-1 relative">
        <InputComponent
          type="text"
          placeholder="Search course..."
          className=" w-full p-4 text-xl text-white bg-transparent outline-0 indent-6 font-bold "
          value={value}
          handleChange={handleChange}
        />
        {
          isLoading ? <LoadingIcon.TailSpin stroke="white" width={28} className="absolute top-0 h-full " /> :
            <CiSearch className="absolute top-0 h-full text-white" size={24} />
        }
      </div>
      <div onClick={clickCloseIcon}>
        <CgClose size={28} className=" hover:cursor-pointer text-red-400" />
      </div>
    </div>
  );
}

export default Searchbar;
