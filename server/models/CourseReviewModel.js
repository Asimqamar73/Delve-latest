import mongoose, { Schema } from "mongoose";

const CourseReviewSchema = new mongoose.Schema({
  review: {
    type: String,
    trim: true,
    required: [true, "Please provide review."],
  },
  rating: {
    type: Number,
    min: 0,
    max: 5,
    required: [true, "Please provide rating."],
  },
  reviewerId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
    required: [true, "Please provide reviewer id"],
  },
  courseId: {
    type: Schema.Types.ObjectId,
    ref: "Course",
    required: [true, "Please provide course id"],
  },
});

const CourseReview = mongoose.model("Course-Review", CourseReviewSchema);
export default CourseReview;
