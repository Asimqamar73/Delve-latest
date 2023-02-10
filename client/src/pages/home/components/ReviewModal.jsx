import { MdClose } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import LoadingIcons from "react-loading-icons";
import { useSelector } from "react-redux";
import RatingStars from "./RatingStars";
import { useState } from "react";

function ReviewModal({ handleChange, submitFeedback }) {
  const isLoading = useSelector((state) => state.courses.isLoading);
  const [isModalVisable, setIsModalVisable] = useState(false)

  const handleModalVisablilty = () => {
    setIsModalVisable(!isModalVisable)
  }
  return (
    <div>
      <label
        className="flex items-center gap-[2px] font-bold hover:cursor-pointer"
        onClick={handleModalVisablilty}
      >
        <FaStar className="text-yellow-400" /> <span>Leave a rating</span>
      </label>
      <div className={`h-screen w-full bg-gray-400/30 ${isModalVisable ? "fixed" : "hidden"} top-0 left-0 z-10`}>
        <div className={`flex justify-center items-center h-screen `}>
          <div className=" relative bg-base-100 w-1/3 px-8 py-4 rounded-md ">
            <div className="btn btn-sm btn-square bg-red-500 border-none text-white absolute right-2 top-2"
              onClick={handleModalVisablilty}>
              <MdClose size={24} />
            </div>
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
    </div>
  );
}

export default ReviewModal;
