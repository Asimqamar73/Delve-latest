import React from "react";
import { CgClose } from "react-icons/cg";
import { CiSearch } from "react-icons/ci";
import InputComponent from "../../../components/commonComponents/InputComponent";

function Searchbar({ value, handleChange, clickCloseIcon }) {
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
        <CiSearch className="absolute top-0 h-full text-white" size={24} />
      </div>
      <div onClick={clickCloseIcon}>
        <CgClose size={28} className=" hover:cursor-pointer text-red-400" />
      </div>
    </div>
  );
}

export default Searchbar;
