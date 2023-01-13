import React from "react";
import { BsTrash } from "react-icons/bs";

function DeleteIcon({ handleDeleteInput }) {
  return (
    <div
      className="absolute top-0 right-0 flex items-center justify-center rounded-lg bg-red-400 text-slate-700 hover:bg-red-500 hover:cursor-pointer w-12 h-full"
      onClick={handleDeleteInput}
    >
      <BsTrash />
    </div>
  );
}

export default DeleteIcon;
