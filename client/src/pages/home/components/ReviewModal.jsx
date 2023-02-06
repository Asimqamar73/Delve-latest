import React, { useEffect } from "react";
import { BiPaperPlane } from "react-icons/bi";
import { FaStar } from "react-icons/fa";
import LoadingIcons from "react-loading-icons";
import { useSelector } from "react-redux";
import RatingStars from "./RatingStars";

function ReviewModal({ handleChange, submitFeedback }) {
  const isLoading = useSelector((state) => state.courses.isLoading);
  useEffect(() => {
    console.log(isLoading);
  }, []);
  return (
    <div>
      <label
        htmlFor="my-modal-3"
        className="flex items-center gap-[2px] font-bold hover:cursor-pointer"
      >
        <FaStar className="text-yellow-400" /> <span>Leave a rating</span>
      </label>

      {/* Put this part before </body> tag */}
      <input type="checkbox" id="my-modal-3" className="modal-toggle" />
      <div className="modal ">
        <div className="modal-box relative bg-base-100">
          <label
            htmlFor="my-modal-3"
            className="btn btn-sm btn-circle absolute right-2 top-2"
          >
            ✕
          </label>
          <div className="text-center">
            <h3 className="text-lg font-bold">How do you rate this course?</h3>
            <p className="py-2">Select rating</p>
            <RatingStars handleChange={handleChange} />
            <h3 className="text-lg font-bold">Give your review.</h3>
            <p className="py-4">{isLoading}</p>
            <textarea
              placeholder="Write review..."
              rows={8}
              id="review"
              className="border border-slate-600 w-full p-2 rounded"
              onChange={handleChange}
            />
          </div>
          <div>
            <button
              className="btn bg-green-400 hover:bg-green-500 border-none float-right text-slate-700 rounded gap-[2px] capitalize"
              onClick={submitFeedback}
            >
              {isLoading ? <LoadingIcons.Puff /> : "submit feedback"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ReviewModal;
