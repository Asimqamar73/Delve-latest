import React from "react";
import { BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
function RatingFilterComponent({ value, handleChange }) {
  return (
    <div>
      <div className="flex items-center gap-2 my-[4px]">
        <input type="radio" name="rating" className="radio radio-sm" id="rating" value={">=4.5"} onChange={handleChange} checked={value === ">=4.5" ? true : false} />
        <div className="flex items-center gap-[2px]">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <p>4.5 & up.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 my-[4px]">
        <input type="radio" name="rating" className="radio radio-sm" id="rating" value={">=4"} onChange={handleChange} checked={value === ">=4" ? true : false} />
        <div className="flex items-center gap-[2px]">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStar />
          <p>4.0 & up.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 my-[4px]">
        <input type="radio" name="rating" className="radio radio-sm" id="rating" value={">=3.5"} onChange={handleChange} checked={value === ">=3.5" ? true : false} />
        <div className="flex items-center gap-[2px]">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStarHalf />
          <BsStar />
          <p>3.5 & up.</p>
        </div>
      </div>
      <div className="flex items-center gap-2 my-[4px]">
        <input type="radio" name="rating" className="radio radio-sm" id="rating" value={">=3.0"} onChange={handleChange} checked={value === ">=3" ? true : false} />
        <div className="flex items-center gap-[2px]">
          <BsStarFill />
          <BsStarFill />
          <BsStarFill />
          <BsStar />
          <BsStar />
          <p>3.0 & up.</p>
        </div>
      </div>
    </div>
  );
}

export default RatingFilterComponent;
