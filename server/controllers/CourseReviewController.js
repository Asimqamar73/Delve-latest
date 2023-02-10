import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import mongoose from "mongoose";
import CourseReview from "../models/CourseReviewModel.js";

const postFeedback = async (req, res) => {
  // console.log(req.body);

  req.body.reviewerId = req.user.userID;
  console.log(req.body);
  const review = await CourseReview.create(req.body);
  res.status(StatusCodes.CREATED).json(review);
};
const fetchCourseReviews = async (req, res) => {
  const { courseId } = req.params
  console.log(courseId)
  const reviews = await CourseReview.find({ courseId: courseId }).populate({ path: "reviewerId", select: "_id, name" })
  // const reviews = await CourseReview.aggregate([{
  //   $match: { courseId: new mongoose.Types.ObjectId(courseId) }
  // },
  // // {
  // //   $lookup: {
  // //     from: "courses",
  // //     foreignField: "_id",
  // //     localField: "courseId",
  // //     as: "course"
  // //   }
  // // },
  // {
  //   $addFields: {
  //     averageRating: {
  //       $avg: "$rating"
  //     }
  //   }

  // }

  // ])
  res.status(StatusCodes.OK).json(reviews);

}

export { postFeedback, fetchCourseReviews };
