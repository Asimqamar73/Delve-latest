import "express-async-errors";
import { StatusCodes } from "http-status-codes";
import CourseReview from "../models/CourseReviewModel.js";

const postFeedback = async (req, res) => {
  // console.log(req.body);

  req.body.reviewerId = req.user.userID;
  console.log(req.body);
  const review = await CourseReview.create(req.body);
  res.send(review);
};

export { postFeedback };
